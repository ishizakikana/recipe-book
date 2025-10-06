import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { getRequestParams, handleApi } from '@/lib/server/api';
import { recipeRepository } from '@/lib/server/repositories/recipeRepository';
import { RecipeDetail } from '@/types/viewModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const { json } = await getRequestParams(req, { requiredParams: ['data'] });
        const { data } = json as { data: RecipeFormInput };

        const result: RecipeDetail = await recipeRepository.update(data);
        return NextResponse.json(result, { status: 200 });
    })
}