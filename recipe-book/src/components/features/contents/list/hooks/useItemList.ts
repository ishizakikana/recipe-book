import { ListCategory, ListItem } from "@prisma/client";
import { useState } from "react";
import { useCategorizedItems } from "./useCategorizedItems";
import { useItemListActions } from "./useItemListActions";
import { useListItemsState } from "./useListItemsState";

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