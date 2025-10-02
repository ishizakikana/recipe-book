import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { ItemFormInput } from '../../types/itemFormInput';
import { getDoneIds, getUndoneIds } from '../../utils/itemStatus';
import { useListContext } from '../useListContext';
import { useItemListActions } from './useItemListActions';
import { useItemListState } from "./useItemListState";

/**
 * リストアイテムの状態管理とDB操作の統合カスタムフック
 * 
 * カテゴリ別にリストアイテムを分類し、ローカル状態とDBの同期処理を一括で行います。
 * 
 * @returns 
 *  categorizedItems（カテゴリごとに分類されたリストアイテム）
 *  error（エラーメッセージ）
 *  create（リストアイテム追加関数）
 *  update（リストアイテム更新関数）
 *  updateAll（全リストアイテム更新関数）
 *  deleteAll（全リストアイテム削除関数）
 *  setError（エラー設定関数）
 */
export function useItemList() {
    const { categorizedItems, setError } = useListContext();
    const { createState, updateAllState, deleteAllState } = useItemListState();
    const { createData, updateData, updateAllData, deleteAllData } = useItemListActions();

    /**
     * リストアイテム新規作成
     * 
     * @param data 作成するリストアイテム
     * @returns {Promise<void>}
     */
    const create = async (data: ItemFormInput) => {
        const result = await createData(data);
        createState(result);
    }

    /**
     * リストアイテム更新
     * 
     * @param id ID
     * @param isDone true: 完了済み, false: 未完了
     * @param onFinally 更新後の処理
     * @return {Promise<void>} 
     */
    const update = async (id: number, isDone: boolean, onFinally: () => void) => {
        try {
            await updateData(id, isDone);
            updateAllState([id], isDone);
        } catch (e) {
            console.error(e);
            const msg = formatMessage(ERROR_MESSAGES.UPDATE_FAILED, 'リストアイテム');
            setError(msg);
        } finally {
            onFinally();
        }
    }

    /**
     * リストアイテム全更新
     *
     * @param isDone true: 完了済み, false: 未完了
     * @param onFinally 完了後の処理
     * @returns {Promise<void>}
     */
    const updateAll = async (isDone: boolean, onFinally: () => void) => {
        try {

            // 対象となるリストアイテム
            const ids = isDone ? getUndoneIds(categorizedItems) : getDoneIds(categorizedItems);

            // すでにすべての項目が未完了または完了済みの時
            if (ids.length === 0) return;

            await updateAllData(ids, isDone);
            updateAllState(ids, isDone);
        } catch (e) {
            console.error(e);
            const msg = formatMessage(ERROR_MESSAGES.UPDATE_FAILED, 'リストアイテム');
            setError(msg);
        } finally {
            onFinally();
        }
    }

    /**
     * リストアイテム全削除
     * 
     * 完了状態が true のリストアイテムをすべて削除します。
     * 
     * @param onFinally 完了後の処理
     * @returns {Promise<void>}
     */
    const deleteAll = async (onFinally: () => void) => {
        try {

            // 対象となるリストアイテム
            const ids = getDoneIds(categorizedItems);

            // 完了済みのアイテムが0件のとき
            if (ids.length === 0) return;

            await deleteAllData(ids);
            deleteAllState(ids);
        } catch (e) {
            console.error(e);
            const msg = formatMessage(ERROR_MESSAGES.DELETE_FAILED, 'リストアイテム');
            setError(msg);
        } finally {
            onFinally();
        }
    }

    return {
        create,
        update,
        updateAll,
        deleteAll
    };
}