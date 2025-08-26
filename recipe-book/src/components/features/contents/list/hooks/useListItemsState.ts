import { ListItem } from '@prisma/client';
import { useListContext } from './useListContext';

/**
 * リストアイテム配列の状態管理カスタムフック
 * 
 * 初期データをもとに、アイテムの追加・一括変更・一括削除などの機能を提供します。
 * 
 * @returns 
 *  listItems（現在のアイテム配列）、
 *  add（リストアイテム追加関数）、
 *  modifyAll（リストアイテム一括変更関数）、
 *  removeAll（リストアイテム一括削除関数）
 */
export function useListItemsState() {

    const { setListItems } = useListContext();

    /**
     * リストアイテム追加
     * 
     * listItems の末尾にアイテムを追加します。
     * 
     * @param item 追加するアイテム
     */
    const createState = (item: ListItem) => {
        setListItems((prev) => [...prev, item]);
    };

    /**
    * リストアイテム全チェック状態変更
    * 
    * listItems 内の指定されたすべてのアイテムの完了状態（isDone）を変更します。
    * 
    * @param ids チェック状態を変更するアイテムのIDリスト
    * @param isDone チェック状態
    */
    const updateAllState = (ids: number[], isDone: boolean) => {
        setListItems((prev) =>
            prev.map((item) => (ids.includes(item.id) ? { ...item, isDone } : item))
        );
    };

    /**
     * リストアイテム全削除
     * 
     * listItems 内の指定されたすべてのアイテムを削除します。
     * 
     * @param ids 削除するアイテムのIDリスト
     */
    const deleteAllState = (ids: number[]) => {
        setListItems((prev) => prev.filter((item) => !ids.includes(item.id)));
    };

    return { createState, updateAllState, deleteAllState };
}