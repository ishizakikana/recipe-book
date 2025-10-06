import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { RecipeDetailResponse, RecipeSummaryResponse, RecipeUpdateRequest } from '@/types/entity';
import { RecipeDetail, RecipeIngredient, RecipeStepSummary, RecipeSummary } from '@/types/viewModel';

/**
 * レシピ概要変換
 * 
 * DBから取得したレシピデータをレシピ概要へ変換します。
 * 
 * @param recipe レシピ
 * @param visible 表示状態
 * @returns レシピ概要
 */
export function toRecipeSummary(
    recipe: RecipeSummaryResponse,
    visible: boolean
): RecipeSummary {
    return {
        id: recipe.id,
        name: recipe.name,
        imageUrl: getFullImageUrl(recipe.imageUrl),
        category: recipe.category,
        calories: recipe.calories ?? undefined,
        shelfLife: recipe.shelfLife ?? undefined,
        keywords: [recipe.name, ...recipe.ingredients?.map(i => i.name) ?? []],
        visible
    }
}

/**
 * レシピ詳細変更
 * 
 * DBから取得したレシピデータをレシピ詳細へ変換します。
 * 
 * @param recipe レシピ
 * @returns レシピ詳細
 */
export function toRecipeDetail(
    recipe: RecipeDetailResponse
): RecipeDetail {
    return {
        id: recipe.id,
        name: recipe.name,
        category: recipe.category,
        imageUrl: getFullImageUrl(recipe.imageUrl),
        calories: recipe.calories ?? undefined,
        shelfLife: recipe.shelfLife ?? undefined,
        ingredients: formatIngredients(recipe),
        steps: formatSteps(recipe)
    }
}

export function toRecipeRequest(
    recipe: RecipeFormInput
): RecipeUpdateRequest {

    const ingredients = recipe.ingredients.split('\n').map((i, idx) => ({
        id: `${String(recipe.id).padStart(4, '0')}${String(idx).padStart(2, '0')}`,      // ex) 000101 レシピID + インデックス
        recipeId: recipe.id,
        name: i.split(' ')[0],
        volume: i.split(' ')[1]
    }))

    const steps = recipe.steps.map((s, idx) => ({
        id: s.id,
        stepNumber: idx + 1,
        text: s.text,
        seasonings: s.seasonings?.split('\n').map((se, sidx) => ({
            id: `${String(recipe.id).padStart(4, '0')}${String(idx + 1).padStart(2, '0')}${String(sidx).padStart(2, '0')}`,      // ex) 00010101 レシピID + 作業手順ID + インデックス
            name: se.split(' ')[0],
            volume: se.split(' ')[1]
        }))
    }))

    return {
        id: recipe.id,
        recipe: {
            id: recipe.id,
            name: recipe.name,
            categoryId: parseInt(recipe.categoryId),
            imageUrl: stripFullImageUrl(recipe.imageUrl),
            calories: recipe.calories ?? null,
            shelfLife: recipe.shelfLife ?? null,
        },
        ingredients,
        steps
    }
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
 * 画像のURLを取得
 * 
 * 画像のフルURLから、画像のURLを取得します。
 * 
 * @param imgUrl 画像のURL
 * @returns 画像のURL
 */
function stripFullImageUrl(imgUrl: string | undefined): string | null {
    const BASE_URL = 'https://res.cloudinary.com/drf6p5cyv/image/upload/';

    if (!imgUrl) {
        return null;
    }

    return imgUrl.startsWith(BASE_URL) ? imgUrl.slice(BASE_URL.length) : imgUrl;
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
function formatSteps(recipe: RecipeDetailResponse): RecipeStepSummary[] {
    return recipe.steps
        .sort((a, b) => a.stepNumber - b.stepNumber)
        .map(step => {

            const seasonings = step.seasonings?.sort((a, b) => {
                const orderA = Number(a.id.slice(-2));
                const orderB = Number(b.id.slice(-2));
                return orderA - orderB;
            }).map(s => ({
                id: s.id,
                name: s.name,
                volume: s.volume ?? undefined
            }))

            return {
                id: step.id,
                stepNumber: step.stepNumber,
                text: step.text,
                seasonings
            }
        });
}