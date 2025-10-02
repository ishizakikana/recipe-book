import { apiPost } from '@/lib/client/fetch';
import { ListItem } from '@prisma/client';
import { ItemFormInput } from '../../types/itemFormInput';

/**
 * リストアイテムDB操作カスタムフック
 * 
 * DBへリストアイテムの作成・更新・削除を行います。
 * 
 * @returns 
 *  createData（リストアイテム追加関数）
 *  updateData（リストアイテム更新関数）
 *  updateAllData（リストアイテム一括変更関数）
 *  deleteAllData（リストアイテム一括削除関数）
 */
export function useItemListActions() {

    /**
     * リストアイテム新規作成
     * 
     * @param data 作成するリストアイテム
     * @return {Promise<ListItem>} 作成したリストアイテム
     */
    const createData = async (data: ItemFormInput): Promise<ListItem> => {

        // カテゴリが未選択のとき、その他（6）として登録
        if (!data.categoryId || data.categoryId == 0) {
            data.categoryId = 6;
        }

        return await apiPost('/list-item/create', { data: data });
    }

    /**
     * リストアイテム完了状態更新
     * 
     * @param id 更新対象のリストアイテムID
     * @param isDone true 完了済み, false 未完了
     * @returns {void}
     */
    const updateData = async (id: number, isDone: boolean) => {
        await apiPost('/list-item/update', { id, data: { isDone } });
    }

    /**
     * リストアイテム完了状態一括更新
     * 
     * @param ids 更新対象のリストアイテムIDリスト
     * @param isDone true 完了済み, false 未完了
     * @returns {void}
     */
    const updateAllData = async (ids: number[], isDone: boolean) => {
        await Promise.all(
            ids.map(id => apiPost('/list-item/update', { id, data: { isDone } }))
        )
    }

    /**
     * 完了済みリストアイテム全削除
     * 
     * @param ids 削除対象のリストアイテムIDリスト
     * @returns {void}
     */
    const deleteAllData = async (ids: number[]) => {
        await apiPost('/list-item/delete', { ids });
    }

    return { createData, updateData, updateAllData, deleteAllData }
}