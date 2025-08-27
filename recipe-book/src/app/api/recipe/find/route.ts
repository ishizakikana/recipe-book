import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { getRequestParams, handleApi } from '@/lib/server/api';
import { recipeRepository } from '@/lib/server/repositories/recipeRepository';
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { NextResponse } from 'next/server';

/**
 * レシピ取得 (/api/recipe/find)
 * 
 * いずれかのパラメータを指定する
 * { id: ID } -> 単体取得（RecipeDetail）
 * { conditions: 条件 } -> 複数取得（RecipeSummary）
 * { all: 全件取得フラグ } -> 複数取得（RecipeSummary）
 * 
 * @param req リクエスト
 * @returns レスポンス
 */
export async function GET(req: Request) {
    return handleApi(req, async () => {
        const { searchParams } = await getRequestParams(req, {
            requiredAnyParams: ['id', 'conditions', 'all']
        });

        // 単体取得
        const id = searchParams.get('id');
        if (id) {
            const recipe: RecipeDetail | null = await recipeRepository.findRecipeDetailById(Number(id));

            if (!recipe) {
                return NextResponse.json(
                    { message: formatMessage(ERROR_MESSAGES.NOT_FOUND, 'レシピ') },
                    { status: 404 }
                );
            } else {
                return NextResponse.json(recipe, { status: 200 });
            }
        }

        // 複数取得 (条件あり)
        const conditions = JSON.parse(searchParams.get('conditions')!);
        if (conditions) {
            const recipes: RecipeSummary[] = await recipeRepository.findAllRecipeSummariesByConditions(conditions);
            return NextResponse.json(recipes, { status: 200 });
        }

        // 複数取得 (全件)
        const recipes: RecipeSummary[] = await recipeRepository.findAllRecipeSummariesByConditions();
        return NextResponse.json(recipes, { status: 200 });
    })
}