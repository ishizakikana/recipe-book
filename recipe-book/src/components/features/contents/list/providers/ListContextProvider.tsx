'use client'
import { ListCategory, ListItem } from '@prisma/client';
import { Dispatch, ReactNode, useState } from 'react';
import { useCategorizedItems } from '../hooks/useCategorizedItems';
import { ListContext } from '../hooks/useListContext';

/**
 * リストコンテキストプロバイダ
 */
export default function ListContextProvider({
    children,
    listCategories,
    initialListItems,
    mockError,
    mockSetError
}: {
    children: ReactNode
    listCategories: ListCategory[],
    initialListItems: ListItem[],
    mockError?: string | null,
    mockSetError?: Dispatch<React.SetStateAction<string | null>>
}) {

    const [listItems, setListItems] = useState<ListItem[]>(initialListItems);
    const [error, setError] = useState<string | null>(null);

    const categorizedItems = useCategorizedItems(listCategories, listItems);

    const data = {
        listCategories,
        categorizedItems,
        listItems,
        error: mockError !== undefined ? mockError : error,
        setListItems,
        setError: mockSetError ? mockSetError : setError
    };

    return (
        <ListContext.Provider value={data}>
            {children}
        </ListContext.Provider>
    )
}