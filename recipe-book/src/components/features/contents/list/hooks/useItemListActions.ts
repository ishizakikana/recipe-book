import { apiPost } from '@/lib/client/fetch';
import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { ListItem } from '@prisma/client';
import { CategorizedItem } from '../types/categorizedItem';
import { ItemFormInput } from '../types/itemFormInput';
import { getDoneIds, getUndoneIds } from '../utils/itemStatus';

/**
 * リストアイテムDB操作カスタムフック
 * 
 * DBへリストアイテムの作成・更新・削除を行い、ローカル状態との同期を行います。
 * 
 * @param categorizedItems カテゴリごとに分類されたリストアイテム
 * @param stateActions リストアイテムに対する状態更新関数群（追加・一括変更・一括削除）
 * @param setError エラー設定関数
 * @returns 
 *  create（リストアイテム追加関数）
 *  update（リストアイテム更新関数）
 *  updateAll（リストアイテム一括変更関数）
 *  deleteAll（リストアイテム一括削除関数）
 */
export function useItemListActions(
    categorizedItems: CategorizedItem[],
    stateActions: {
        add: (item: ListItem) => void
        modifyAll: (ids: number[], isDone: boolean) => void
        removeAll: (ids: number[]) => void
    },
    setError: (msg: string) => void
) {

    /**
     * リストアイテム新規作成
     * 
     * DB に新しいリストアイテムを作成し、ローカル状態に追加します。
     * 
     * @param data 作成するリストアイテム
     * @return {void}
     * @throws {Error}
     */
    const create = async (data: ItemFormInput) => {
        try {

            // カテゴリが未選択のとき、その他（6）として登録
            if (!data.categoryId || data.categoryId == 0) {
                data.categoryId = 6;
            }

            const item: ListItem = await apiPost('/list-item/create', { data: data });
            stateActions.add(item);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * リストアイテム完了状態更新
     * 
     * 指定したリストアイテムの完了状態（isDone）を変更し、ローカル状態に反映します。
     * 
     * @param id 更新対象のリストアイテムID
     * @param isDone true 完了済み, false 未完了
     * @param onFinally 処理後に呼び出す関数
     * @returns {void}
     */
    const update = async (id: number, isDone: boolean, onFinally: () => void) => {
        try {

            // リストアイテム完了状態更新
            await apiPost('/list-item/update', { id, data: { isDone } });
            stateActions.modifyAll([id], isDone);
        } catch (e) {
            console.error(e);

            const msg = formatMessage(ERROR_MESSAGES.UPDATE_FAILED, 'リストアイテム');
            setError(msg);
        } finally {
            onFinally();
        }
    }

    /**
     * リストアイテム完了状態一括更新
     * 
     * リスト内のアイテムの完了状態（isDone）を一括で変更し、ローカル状態に反映します。
     * 
     * @param isDone true 完了済み, false 未完了
     * @param onFinally 処理後に呼び出す関数
     * @returns {void}
     */
    const updateAll = async (isDone: boolean, onFinally: () => void) => {
        try {

            // 対象となるリストアイテム取得
            const ids = isDone ? getUndoneIds(categorizedItems) : getDoneIds(categorizedItems);

            // すでにすべての項目が未完了または完了済みの時
            if (ids.length === 0) return;

            // すべてのアイテムの完了状態を更新
            await Promise.all(ids.map(id => apiPost('/list-item/update', { id, data: { isDone } })));
            stateActions.modifyAll(ids, isDone);

        } catch (e) {
            console.error(e);

            const msg = formatMessage(ERROR_MESSAGES.UPDATE_FAILED, 'リストアイテム');
            setError(msg);
        } finally {
            onFinally();
        }
    }

    /**
     * 完了済みリストアイテム全削除
     * 
     * DB からリスト内の完了済みアイテムをすべて削除し、ローカル状態からも削除します。
     * 
     * @param onFinally 処理後に呼び出す関数
     * @returns {void}
     */
    const deleteAll = async (onFinally: () => void) => {
        try {

            // 対象となるリストアイテム取得
            const ids = getDoneIds(categorizedItems);

            // 完了済みのアイテムが0件のとき
            if (ids.length === 0) return;

            // 完了済みのアイテムを削除
            await apiPost('/list-item/delete', { ids });
            stateActions.removeAll(ids);

        } catch (e) {
            console.error(e);

            const msg = formatMessage(ERROR_MESSAGES.DELETE_FAILED, 'リストアイテム');
            setError(msg);
        } finally {
            onFinally();
        }
    }

    return { create, update, updateAll, deleteAll }
}