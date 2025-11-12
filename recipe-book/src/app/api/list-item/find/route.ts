import { getRequestParams, handleApi } from '@/lib/server/api';
import { listItemRepository } from '@/lib/server/repositories/listItemRepository';
import { NextResponse } from 'next/server';

/**
 * リストアイテム検索 (/api/list-item/find)
 * 
 * { all: 全件取得フラグ }
 * 
 * @param req リクエスト
 * @returns レスポンス
 */
export async function GET(req: Request) {
    return handleApi(req, async () => {
        await getRequestParams(req, { requiredParams: ['all'] })

        const items = await listItemRepository.findAll();
        return NextResponse.json(items, { status: 200 })
    })
}