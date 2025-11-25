import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { toRecipeDetail, toRecipeRequest, toRecipeSummary } from "@/lib/server/converter/recipeConverter";
import { prisma } from '@/lib/server/db/prisma';
import { createRepository } from "@/lib/server/repositories/baseRepository";
import { RecipeDetailResponse, RecipeStepSummaryResponse, RecipeSummaryResponse } from "@/types/entity";
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { Recipe, RecipeIngredient } from "@prisma/client";

const base = createRepository<Recipe>('recipe', '/recipe');

/**
 * すべてのレシピの概要リスト取得
 * 
 * @returns レシピ概要リスト
 */
const findAllRecipeSummariesByConditions = async (conditions?: Partial<Recipe>): Promise<RecipeSummary[]> => {
    const result: RecipeSummaryResponse[] = await prisma.recipe.findMany({
        where: conditions,
        include: {
            category: true,
            ingredients: true
        }
    });

    return result.map(r => toRecipeSummary(r, true));
}

/**
 * レシピの詳細取得
 * 
 * @returns レシピ詳細 | null
 */
const findRecipeDetailById = async (id: number): Promise<RecipeDetail | null> => {
    const result: RecipeDetailResponse | null = await prisma.recipe.findUnique({
        where: {
            id
        },
        include: {
            category: true,
            ingredients: true,
            steps: {
                include: {
                    seasonings: true
                }
            }
        }
    });

    if (!result) {
        return null;
    }

    return toRecipeDetail(result);
}

/**
 * レシピ新規登録
 * 
 * レシピ、レシピ材料、作業手順、調味料を新規登録します。
 * 
 * @param form レシピ編集フォーム
 * @returns 登録したレシピ概要
 */
const create = async (form: RecipeFormInput): Promise<RecipeDetail> => {
    const { recipe, ingredients, steps } = toRecipeRequest(form);

    // トランザクション開始
    const result = await prisma.$transaction(async tx => {

        // レシピ登録
        const insertedRecipe = await prisma.recipe.create({
            data: {
                ...recipe,
                id: undefined
            },
            include: {
                category: true
            }
        })

        // レシピ材料登録
        const insertedIngredients: RecipeIngredient[] = await Promise.all(
            ingredients.map((i, idx) => prisma.recipeIngredient.create({
                data: {
                    ...i,
                    recipeId: insertedRecipe.id,
                    id: `${String(insertedRecipe.id).padStart(4, '0')}${String(idx).padStart(2, '0')}`
                }
            }))
        )

        // 作業手順・調味料登録
        const updatedSteps = await Promise.all(steps.map(async step => {
            let newStep: RecipeStepSummaryResponse = {} as RecipeStepSummaryResponse;

            // 作業手順登録
            newStep = {
                ...await prisma.recipeStep.create({
                    data: {
                        recipeId: insertedRecipe.id,
                        stepNumber: step.stepNumber,
                        text: step.text
                    }
                }),
                seasonings: []
            }

            // 調味料追加
            if (step.seasonings) {
                newStep = {
                    ...newStep,
                    seasonings: await Promise.all(step.seasonings.map((s, idx) =>
                        prisma.recipeSeasoning.create({
                            data: {
                                id: `${String(insertedRecipe.id).padStart(4, '0')}${String(newStep!.id).padStart(2, '0')}${String(idx).padStart(2, '0')}`,      // ex) 00010101 レシピID + 作業手順ID + インデックス
                                stepId: newStep!.id,
                                name: s.name,
                                volume: s.volume
                            }
                        })
                    ))
                }
            }

            return newStep;
        }))

        return {
            ...insertedRecipe,
            ingredients: insertedIngredients,
            steps: updatedSteps
        }
    })

    return toRecipeDetail(result);
}

/**
 * レシピ更新
 * 
 * レシピ、レシピ材料、作業手順、調味料を更新します。
 * 
 * @param form レシピ編集フォーム
 * @returns 更新後のレシピ概要
 */
const update = async (form: RecipeFormInput): Promise<RecipeDetail> => {
    const { id, recipe, ingredients, steps } = toRecipeRequest(form);

    // トランザクション開始
    const result = await prisma.$transaction(async tx => {
        // レシピ更新
        const updatedRecipe = await prisma.recipe.update({
            where: { id },
            data: recipe,
            include: {
                category: true
            }
        })

        // レシピ材料更新
        await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });      // 既存のレシピ材料を削除
        const updatedIngredients: RecipeIngredient[] = await Promise.all(
            ingredients.map(i => prisma.recipeIngredient.create({
                data: i
            }))
        )

        // 作業手順・調味料更新
        const updatedSteps = await Promise.all(steps.map(async step => {
            let newStep: RecipeStepSummaryResponse = {} as RecipeStepSummaryResponse;

            if (step.id && step.id > 0) {
                newStep = {
                    ...await prisma.recipeStep.update({      // 更新
                        where: { id: step.id },
                        data: {
                            id: step.id,
                            recipeId: id,
                            stepNumber: step.stepNumber,
                            text: step.text
                        }
                    }),
                    seasonings: []
                }

                await prisma.recipeSeasoning.deleteMany({ where: { stepId: step.id } });          // 既存の調味料をすべて削除
            } else {
                newStep = {
                    ...await prisma.recipeStep.create({     // 新規登録
                        data: {
                            recipeId: id,
                            stepNumber: step.stepNumber,
                            text: step.text
                        }
                    }),
                    seasonings: []
                }
            }

            // 調味料追加
            if (step.seasonings) {
                newStep = {
                    ...newStep,
                    seasonings: await Promise.all(step.seasonings.map((s, idx) =>
                        prisma.recipeSeasoning.create({
                            data: {
                                id: `${String(id).padStart(4, '0')}${String(newStep!.id).padStart(2, '0')}${String(idx).padStart(2, '0')}`,      // ex) 00010101 レシピID + 作業手順ID + インデックス
                                stepId: newStep!.id,
                                name: s.name,
                                volume: s.volume
                            }
                        })
                    ))
                }
            }

            return newStep;
        }))

        return {
            ...updatedRecipe,
            ingredients: updatedIngredients,
            steps: updatedSteps
        }
    })

    return toRecipeDetail(result);
}

export const recipeRepository = {
    ...base,
    findAllRecipeSummariesByConditions,
    findRecipeDetailById,
    create,
    update,

    findAll: undefined,
    findAllByConditions: undefined,
    findById: undefined,
    deleteAll: undefined,
}   