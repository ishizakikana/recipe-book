import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { RecipeDetailResponse, RecipeStepSummaryResponse, RecipeSummaryResponse } from "@/types/entity";
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { Recipe, RecipeIngredient, RecipeSeasoning, RecipeStep } from "@prisma/client";
import { toRecipeDetail, toRecipeSummary } from "../converter/recipeConverter";
import { prisma } from "../db/prisma";
import { createRepository } from "./baseRepository";

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

const update = async (input: RecipeFormInput) => {
    const { id, recipe } = data;

    // レシピ更新
    const updatedRecipe: Recipe = await prisma.recipe.update({
        where: { id },
        data: recipe,
        include: {
            category: true
        }
    })

    // レシピ材料更新
    await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });      // 既存のレシピ材料を削除
    const ingredients: RecipeIngredient[] = await Promise.all(
        data.ingredients.map(i => prisma.recipeIngredient.create({
            data: i
        }))
    )

    const steps: RecipeStepSummaryResponse[] = await Promise.all(
        data.steps.map(async (step, idx) => {
            let newStep: RecipeStep | null = null;

            if (step.id > 0) {

                // 作業手順更新
                newStep = await prisma.recipeStep.update({
                    where: { id: step.id },
                    data: {
                        id: step.id,
                        recipeId: step.recipeId,
                        stepNumber: step.stepNumber,
                        text: step.text
                    }
                })

                // 既存の調味料をすべて削除
                await prisma.recipeSeasoning.deleteMany({ where: { stepId: step.id } });
            } else {

                // 作業手順追加
                newStep = {
                    ...await prisma.recipeStep.create({
                        data: {
                            recipeId: step.recipeId,
                            stepNumber: step.stepNumber,
                            text: step.text
                        }
                    })
                }
            }


            // 調味料追加
            const updatedSeasonings = await Promise.all(
                step.seasonings.map((s: RecipeSeasoning, idx: number) => prisma.recipeSeasoning.create({
                    data: {
                        id: `${String(id).padStart(4, '0')}${String(newStep.id).padStart(2, '0')}${String(idx).padStart(2, '0')}`,      // ex) 00010101 レシピID + 作業手順ID + インデックス
                        stepId: newStep.id,
                        name: s.name,
                        volume: s.volume
                    }
                }))
            )

            return {
                ...newStep,
                seasonings: updatedSeasonings
            }
        })
    )

    return
}

export const recipeRepository = {
    ...base,
    findAllRecipeSummariesByConditions,
    findRecipeDetailById,
    update,

    findAll: undefined,
    findAllByConditions: undefined,
    findById: undefined,
    create: undefined,
    delete: undefined,
    deleteAll: undefined,
}   