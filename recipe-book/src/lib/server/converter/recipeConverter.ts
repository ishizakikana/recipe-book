import { RecipeDetailResponse, RecipeSummaryResponse } from '@/types/entity';
import { RecipeDetail, RecipeIngredient, RecipeSummary, StepSummary } from '@/types/viewModel';

export function toRecipeSummary(
    recipe: RecipeSummaryResponse,
    visible: boolean
): RecipeSummary {

    return {
        ...recipe,
        imageUrl: getFullImageUrl(recipe.imageUrl),
        category: recipe.category,
        calories: recipe.calories ?? undefined,
        shelfLife: recipe.shelfLife ?? undefined,
        keywords: [
            recipe.name, ...recipe.ingredients?.map(i => i.name) ?? []
        ],
        visible
    }
}

export function toRecipeDetail(
    recipe: RecipeDetailResponse
): RecipeDetail {

    return {
        ...recipe,
        imageUrl: getFullImageUrl(recipe.imageUrl),
        calories: recipe.calories ?? undefined,
        shelfLife: recipe.shelfLife ?? undefined,
        ingredients: formatIngredients(recipe),
        steps: formatSteps(recipe)
    }
}

/**
 * 画像のURLを取得
 * 
 * 画像のフルURLから、画像のURLを取得します。
 * 
 * @param imgUrl 画像のURL
 * @returns 画像のURL
 */
export function stripFullImageUrl(imgUrl: string | undefined): string | undefined {
    const BASE_URL = 'https://res.cloudinary.com/drf6p5cyv/image/upload/';

    if (!imgUrl) {
        return undefined;
    }

    return imgUrl.startsWith(BASE_URL) ? imgUrl.slice(BASE_URL.length) : imgUrl;
}


//
// private
// 

/**
 * 画像のフルURL取得
 * 
 * 引数が undefined のとき、no_image.png の URL を返します。
 * 
 * @param imgUrl 画像のURL
 * @returns 画像のフルURL
 */
function getFullImageUrl(imgUrl: string | undefined | null): string {
    const BASE_URL = 'https://res.cloudinary.com/drf6p5cyv/image/upload/';
    const NO_IMG_URL = 'no_image.png';

    if (imgUrl) {
        return `${BASE_URL}${imgUrl}`
    } else {
        return `${BASE_URL}${NO_IMG_URL}`
    }
}

/**
 * レシピ材料のフォーマット
 * 
 * idをもとにした並び替えと、null の値を undefined に変更します。
 * 
 * @param recipe レシピ
 */
function formatIngredients(recipe: RecipeDetailResponse): RecipeIngredient[] {
    return recipe.ingredients.sort((a, b) => {
        const orderA = Number(a.id.slice(-2));
        const orderB = Number(b.id.slice(-2));
        return orderA - orderB;
    }).map(i => ({
        ...i,
        volume: i.volume ?? undefined
    }))
}

/**
 * レシピ手順リストのフォーマット
 * 
 * レシピ手順リスト・調味料リストの並び替えを行います。
 * レシピ手順リストは stepNumber をもとに、調味料リストは id をもとに並び替えを行います。
 * 
 * @param recipe レシピ
 */
function formatSteps(recipe: RecipeDetailResponse): StepSummary[] {
    return recipe.steps
        .sort((a, b) => a.stepNumber - b.stepNumber)
        .map(step => ({
            ...step,
            seasonings: step.seasonings?.sort((a, b) => {
                const orderA = Number(a.id.slice(-2));
                const orderB = Number(b.id.slice(-2));
                return orderA - orderB;
            })
        }));
}