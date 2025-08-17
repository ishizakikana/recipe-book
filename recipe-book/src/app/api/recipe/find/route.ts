import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { getRequestParams, handleApi } from '@/lib/server/api';
import { recipeRepository } from '@/lib/server/repositories/recipeRepository';
import { NextResponse } from 'next/server';

/**
 * レシピ取得 (/api/recipe/find)
 * 
 * { id: ID }
 * { conditions: 条件 }
 * 
 * @param req リクエスト
 * @returns レスポンス
 */
export async function GET(req: Request) {
    return handleApi(req, async () => {
        const { searchParams } = await getRequestParams(req, {
            requiredAnyParams: ['id', 'conditions', 'all']
        });

        const id = searchParams.get('id');
        if (id) {
            const recipe = await recipeRepository.findRecipeDetailById(Number(id));

            if (!recipe) {
                return NextResponse.json(
                    { message: formatMessage(ERROR_MESSAGES.NOT_FOUND, 'レシピ') },
                    { status: 404 }
                );
            } else {
                return NextResponse.json(recipe, { status: 200 });
            }
        }

        const conditions = JSON.parse(searchParams.get('conditions')!);
        if (conditions) {
            const recipes = await recipeRepository.findAllRecipeSummariesByConditions(conditions);
            return NextResponse.json(recipes, { status: 200 });
        }

        const recipes = await recipeRepository.findAllRecipeSummariesByConditions();
        return NextResponse.json(recipes, { status: 200 });
    })
}