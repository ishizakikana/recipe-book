import { RecipeDetailResponse, RecipeSummaryResponse } from '@/types/entity';
import { RecipeDetail, RecipeSummary, StepSummary } from '@/types/viewModel';
import { RecipeIngredient } from '@prisma/client';

export function toRecipeSummary(
    recipe: RecipeSummaryResponse,
    visible: boolean
): RecipeSummary {

    return {
        ...recipe,
        imageUrl: getFullImageUrl(recipe.imageUrl),
        category: recipe.category,
        keywords: [
            recipe.name, ...recipe.ingredients?.map(i => i.name) ?? []
        ],
        visible
    }
}

export function toRecipeDetail(
    recipe: RecipeDetailResponse
): RecipeDetail {

    // 並び替え
    sortIngredients(recipe.ingredients);
    sortSteps(recipe.steps);

    return {
        ...recipe,
        imageUrl: getFullImageUrl(recipe.imageUrl)
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
export function stripFullImageUrl(imgUrl: string | null): string | null {
    const BASE_URL = 'https://res.cloudinary.com/drf6p5cyv/image/upload/';

    if (!imgUrl) {
        return null;
    }

    return imgUrl.startsWith(BASE_URL) ? imgUrl.slice(BASE_URL.length) : imgUrl;
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
    const BASE_URL = 'https://res.cloudinary.com/drf6p5cyv/image/upload/';
    const NO_IMG_URL = 'no_image.png';

    if (imgUrl) {
        return `${BASE_URL}${imgUrl}`
    } else {
        return `${BASE_URL}${NO_IMG_URL}`
    }
}

function sortIngredients(ingredients: RecipeIngredient[]) {
    ingredients.sort((a, b) => {
        const orderA = Number(a.id.slice(-2));
        const orderB = Number(b.id.slice(-2));
        return orderA - orderB;
    })
}

function sortSteps(steps: StepSummary[]) {
    steps
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