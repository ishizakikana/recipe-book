import { getRequestParams, handleApi } from "@/lib/server/api";
import { recipeRepository } from "@/lib/server/repositories/recipeRepository";
import { NextRequest, NextResponse } from "next/server";

/**
 * レシピ削除 (/api/recipe/delete)
 * 
 * レシピ情報を削除する
 * { id: number }
 * 
 * @param req リクエスト
 * @returns レスポンス
 */
export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const { json } = await getRequestParams(req, { requiredParams: ['id'] });
        const { id } = json as { id: number };

        await recipeRepository.delete(id);

        return NextResponse.json(null, { status: 204 });
    })
}