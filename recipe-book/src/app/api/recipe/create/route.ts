import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { getRequestParams, handleApi } from '@/lib/server/api';
import { recipeRepository } from '@/lib/server/repositories/recipeRepository';
import { RecipeDetail } from '@/types/viewModel';
import { NextRequest, NextResponse } from 'next/server';

/**
 * レシピ新規登録 (/api/recipe/create)
 * 
 * レシピ情報を新規登録する
 * { data: RecipeFormInput }
 * 
 * @param req リクエスト
 * @returns  レスポンス
 */
export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const { json } = await getRequestParams(req, { requiredParams: ['data'] });
        const { data } = json as { data: RecipeFormInput };

        const result: RecipeDetail = await recipeRepository.create(data);
        return NextResponse.json(result, { status: 200 });
    })
}