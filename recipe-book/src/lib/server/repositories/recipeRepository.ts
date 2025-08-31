import { RecipeDetailResponse, RecipeSummaryResponse, RecipeUpdateResponse } from "@/types/entity";
import { RecipeDetail, RecipeSummary, StepSummary } from '@/types/viewModel';
import { Recipe, RecipeIngredient, RecipeStep } from "@prisma/client";
import { toRecipeDetail, toRecipeSummary } from "../converter/recipeConverter";
import { prisma } from "../db/prisma";
import { createRepository } from "./baseRepository";

const base = createRepository<Recipe>('recipe', '/recipe');

export const recipeRepository = {
    ...base,

    findAll: undefined,
    findAllByConditions: undefined,
    findById: undefined,
    create: undefined,
    deleteAll: undefined,

    /**
     * すべてのレシピの概要リスト取得
     * 
     * @returns レシピ概要リスト
     */
    findAllRecipeSummariesByConditions: async (conditions?: Partial<Recipe>): Promise<RecipeSummary[]> => {
        const result: RecipeSummaryResponse[] = await prisma.recipe.findMany({
            where: conditions,
            include: {
                category: true,
                ingredients: true
            }
        });

        return result.map(r => toRecipeSummary(r, true));
    },
    /**
     * レシピの詳細取得
     * 
     * @returns レシピ詳細 | null
     */
    findRecipeDetailById: async (id: number): Promise<RecipeDetail | null> => {
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
    },
    updateRecipe: async (id: number, data: Recipe): Promise<RecipeUpdateResponse> => ({
        ...await prisma.recipe.update({
            where: { id },
            data: data,
            include: {
                category: true
            }
        })
    }),
    updateIngredients: async (id: number, data: RecipeIngredient[]): Promise<RecipeIngredient[]> => {

        // 既存のレシピ材料を削除
        await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });

        // 再度追加
        return await Promise.all(
            data.map(i => prisma.recipeIngredient.create({
                data: i
            }))
        )
    },
    updateSteps: async (id: number, data: StepSummary[]): Promise<StepSummary[]> => {
        return Promise.all(
            data.map(async (step, idx) => {
                const updateStep = await prisma.$transaction(async tx => {
                    let newStep: RecipeStep | null = null;

                    if (step.id > 0) {

                        // 作業手順更新
                        newStep = await tx.recipeStep.update({
                            where: { id: step.id },
                            data: {
                                id: step.id,
                                recipeId: step.recipeId,
                                stepNumber: step.stepNumber,
                                text: step.text
                            }
                        })

                        // 既存の調味料をすべて削除
                        await tx.recipeSeasoning.deleteMany({ where: { stepId: step.id } });
                    } else {

                        // 作業手順追加
                        newStep = {
                            ...await tx.recipeStep.create({
                                data: {
                                    recipeId: step.recipeId,
                                    stepNumber: step.stepNumber,
                                    text: step.text
                                }
                            })
                        }
                    }

                    // 再度追加
                    const updatedSeasonings = await Promise.all(
                        step.seasonings.map((s, idx) => tx.recipeSeasoning.create({
                            data: {
                                id: `${String(id).padStart(4, '0')}${String(newStep.id).padStart(2, '0')}${String(idx).padStart(2, '0')}`,      // ex) 000101 レシピID + 作業手順ID + インデックス
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

                return updateStep;
            })
        )
    }
}   