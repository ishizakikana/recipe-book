import { ListCategory, ListItem } from "@prisma/client";
import { useState } from "react";
import { useCategorizedItems } from "./useCategorizedItems";
import { useItemListActions } from "./useItemListActions";
import { useListItemsState } from "./useListItemsState";

/**
 * リストアイテムの状態管理とDB操作を統合したカスタムフック
 * 
 * カテゴリ別にリストアイテムを分類し、ローカル状態とDBの同期処理を一括で扱えるようにします。
 * 
 * @param listCategories リストカテゴリ一覧
 * @param initialListItems 初期リストアイテム一覧
 * @returns 
 *  categorizedItems（カテゴリごとに分類されたリストアイテム）
 *  error（エラーメッセージ）
 *  create（リストアイテム追加関数）
 *  update（リストアイテム更新関数）
 *  updateAll（全リストアイテム更新関数）
 *  deleteAll（全リストアイテム削除関数）
 *  setError（エラー設定関数）
 */
export function useItemList(
    listCategories: ListCategory[],
    initialListItems: ListItem[]
) {

    // エラー管理
    const [error, setError] = useState<string | null>(null);

    const { listItems, add, modifyAll, removeAll } = useListItemsState(initialListItems);
    const categorizedItems = useCategorizedItems(listCategories, listItems);
    const { create, update, updateAll, deleteAll } = useItemListActions(categorizedItems, { add, modifyAll, removeAll }, setError);

    return {
        categorizedItems,
        error,
        create,
        update,
        updateAll,
        deleteAll,
        setError,
    };
}