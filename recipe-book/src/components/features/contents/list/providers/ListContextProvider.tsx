'use client'
import { ListCategory, ListItem } from '@prisma/client';
import { ReactNode, useState } from 'react';
import { useCategorizedItems } from '../hooks/useCategorizedItems';
import { ListContext } from '../hooks/useListContext';

/**
 * リストコンテキストプロバイダ
 */
export default function ListContextProvider({
    children,
    listCategories,
    initialListItems
}: {
    children: ReactNode
    listCategories: ListCategory[],
    initialListItems: ListItem[]
}) {

    const [listItems, setListItems] = useState<ListItem[]>(initialListItems);
    const [error, setError] = useState<string | null>(null);

    const categorizedItems = useCategorizedItems(listCategories, listItems);

    const data = {
        listCategories,
        categorizedItems,
        listItems,
        error,
        setListItems,
        setError
    };

    return (
        <ListContext.Provider value={data}>
            {children}
        </ListContext.Provider>
    )
}