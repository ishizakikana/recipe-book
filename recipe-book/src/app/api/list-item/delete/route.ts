import { handleApi } from '@/lib/api';
import { listItemRepository } from '@/lib/repositories/listItemRepository';
import { NextRequest, NextResponse } from 'next/server';

/**
 * リストアイテム削除 (/api/list-item/delete)
 * 
 * 単体削除: { id: リストアイテムID }
 * 
 * 複数削除: { ids: リストアイテムIDリスト }
 * 
 * @param req リクエスト
 * @returns レスポンス
 */
export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const body = await req.json();

        // 複数削除
        if ('ids' in body) {
            const ids: number[] = body.ids;
            const deletedListItems = await listItemRepository.deleteAll(ids);
            return NextResponse.json(deletedListItems, { status: 200 });
        }

        // 単体削除
        const { id } = body;
        const deletedListItem = await listItemRepository.delete(id);
        return NextResponse.json(deletedListItem, { status: 200 });
    })
}