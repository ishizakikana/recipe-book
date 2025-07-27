import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { apiPost } from '@/lib/fetch';
import { ListItem } from '@prisma/client';
import { categorizedItem, CreateFormInput } from '../type';
import { getDoneIds, getUndoneIds } from '../utils';

export function useItemListActions(
    categorizedItems: categorizedItem[],
    stateActions: {
        add: (item: ListItem) => void
        modifyAll: (ids: number[], isDone: boolean) => void
        removeAll: (ids: number[]) => void
    },
    setError: (msg: string) => void
) {

    const create = async (data: CreateFormInput) => {
        try {

            // リストアイテム追加
            const item: ListItem = await apiPost('/list-item/create', { data: data });
            stateActions.add(item);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    const update = async (id: number, isDone: boolean, onFinally: () => void) => {
        try {

            // リストアイテム完了状態更新
            await apiPost('/list-item/update', { id, data: { isDone } });
            stateActions.modifyAll([id], isDone);
        } catch (e) {
            console.error(e);
            setError(ERROR_MESSAGES.UPDATE_FAILED);
        } finally {
            onFinally();
        }
    }

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
            setError(ERROR_MESSAGES.UPDATE_FAILED);
        } finally {
            onFinally();
        }
    }

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
            setError(ERROR_MESSAGES.DELETE_FAILED);
        } finally {
            onFinally();
        }
    }

    return { create, update, updateAll, deleteAll }
}