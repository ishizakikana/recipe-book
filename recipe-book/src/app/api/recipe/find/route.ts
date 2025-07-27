import { getRequestParams, handleApi } from '@/lib/api';
import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { recipeRepository } from '@/lib/repositories/recipeRepository';
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
            requiredAnyParams: ['id', 'conditions']
        });

        const id = searchParams.get('id');
        if (id) {
            const recipe = await recipeRepository.findRecipeDetail(Number(id));

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
        const recipes = await recipeRepository.findAllRecipeSummariesByConditions(conditions);

        return NextResponse.json(recipes, { status: 200 });
    })
}