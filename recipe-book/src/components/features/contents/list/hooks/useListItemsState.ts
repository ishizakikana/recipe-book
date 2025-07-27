import { ListItem } from '@prisma/client';
import { useState } from 'react';

export function useListItemsState(initialListItems: ListItem[]) {

    // リストアイテム管理
    const [listItems, setListItems] = useState<ListItem[]>(initialListItems);

    /**
     * リストアイテム追加
     * 
     * @param item 追加するアイテム
     */
    const add = (item: ListItem) => {
        setListItems((prev) => [...prev, item]);
    };

    /**
    * リストアイテム全チェック状態変更
    * 
    * @param ids チェック状態を変更するアイテムのIDリスト
    * @param isDone チェック状態
    */
    const modifyAll = (ids: number[], isDone: boolean) => {
        setListItems((prev) =>
            prev.map((item) => (ids.includes(item.id) ? { ...item, isDone } : item))
        );
    };

    /**
     * リストアイテム全削除
     * 
     * @param ids 削除するアイテムのIDリスト
     */
    const removeAll = (ids: number[]) => {
        setListItems((prev) => prev.filter((item) => !ids.includes(item.id)));
    };

    return { listItems, add, modifyAll, removeAll };
}