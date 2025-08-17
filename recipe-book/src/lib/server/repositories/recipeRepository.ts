import { RecipeDetail, RecipeSummary } from "@/types/entity";
import { Recipe } from "@prisma/client";
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
                category: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                        color: true
                    }
                }
            }
        });

        return result.map(r => ({
            ...r,
            imageUrl: getFullImageUrl(r.imageUrl),
            visible: true
        }));
    },
    /**
     * レシピの詳細取得
     * 
     * @returns レシピ詳細 | null
     */
    findRecipeDetailById: async (id: number): Promise<RecipeDetail | null> => {
        const recipe = await prisma.recipe.findUnique({
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

        if (!recipe) {
            return null;
        }

        // レシピ材料を order の順に並び替え
        const ingredients = recipe.ingredients.sort((a, b) => {
            const orderA = a.order ?? 99;
            const orderB = b.order ?? 99;
            return orderA - orderB;
        });

        // レシピ工程と調味料を order の順に並び替え
        const steps = recipe.steps
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map(step => ({
                ...step,
                seasonings: step.seasonings?.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
            }));

        return {
            id: recipe.id,
            name: recipe.name,
            imageUrl: getFullImageUrl(recipe.imageUrl),     // 画像URLをフルパスに変換
            shelfLife: recipe.shelfLife,
            calories: recipe.calories,
            category: {
                id: recipe.category.id,
                name: recipe.category.name,
                icon: recipe.category.icon,
                color: recipe.category.color
            },
            ingredients,
            steps
        }
    },
    update: async (id: number, data: Recipe): Promise<Recipe> => {
        const result = await prisma.recipe.update({
            where: { id },
            data: {
                ...data,
                imageUrl: stripFullImageUrl(data.imageUrl)
            }
        });
        return result;
    }
}

//
// private
//
/**
 * 画像のフルURL取得
 * 
 * 引数が NULL のとき、no_image.png の URL を返します。
 * 
 * @param imgUrl 画像のURL
 * @returns 画像のフルURL
 */
function getFullImageUrl(imgUrl: string | null): string {
    const BASE_URL = "https://res.cloudinary.com/drf6p5cyv/image/upload/";
    const NO_IMG_URL = "no_image.png";

    if (imgUrl) {
        return `${BASE_URL}${imgUrl}`
    } else {
        return `${BASE_URL}${NO_IMG_URL}`
    }
}

function stripFullImageUrl(imgUrl: string | null): string | null {
    const BASE_URL = "https://res.cloudinary.com/drf6p5cyv/image/upload/";

    if (!imgUrl) {
        return null;
    }

    return imgUrl.startsWith(BASE_URL) ? imgUrl.slice(BASE_URL.length) : imgUrl;
}