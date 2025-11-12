import { getRequestParams, handleApi } from '@/lib/server/api';
import { recipeCategoryRepository } from '@/lib/server/repositories/recipeCategoryRepository';
import { NextResponse } from 'next/server';

/**
 * レシピカテゴリー取得 (/api/recipe-category/find)
 * 
 * いずれかのパラメータを指定する
 * { all: 全件取得フラグ } -> 全件取得
 * 
 * @param req リクエスト
 * @returns レスポンス
 */
export async function GET(req: Request) {
    return handleApi(req, async () => {
        await getRequestParams(req, { requiredParams: ['all'] });

        const categories = await recipeCategoryRepository.findAll();
        return NextResponse.json(categories, { status: 200 })
    })
}