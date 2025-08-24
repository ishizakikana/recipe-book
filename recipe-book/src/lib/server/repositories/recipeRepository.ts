import { RecipeDetail, RecipeSummary } from "@/types/entity";
import { Recipe, RecipeIngredient } from "@prisma/client";
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
    delete: undefined,
    deleteAll: undefined,

    /**
     * すべてのレシピの概要リスト取得
     * 
     * @returns レシピ概要リスト
     */
    findAllRecipeSummariesByConditions: async (conditions?: Partial<Recipe>): Promise<RecipeSummary[]> => {
        const result = await prisma.recipe.findMany({
            where: conditions,
            select: {
                id: true,
                name: true,
                imageUrl: true,
                shelfLife: true,
                calories: true,
                categoryId: true,
                category: {
                    select: {
                        name: true,
                        icon: true,
                        color: true
                    }
                },
                ingredients: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return result.map(r => toRecipeSummary(r, r.category, r.ingredients, true));
    },
    /**
     * レシピの詳細取得
     * 
     * @returns レシピ詳細 | null
     */
    findRecipeDetailById: async (id: number): Promise<RecipeDetail | null> => {
        const result = await prisma.recipe.findUnique({
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

        return toRecipeDetail(result, result.category, result.ingredients, result.steps);
    },
    update: async (id: number, data: Recipe): Promise<Recipe> => ({
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
    }
}