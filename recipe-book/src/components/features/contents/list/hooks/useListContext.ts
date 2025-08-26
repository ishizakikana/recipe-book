import { useSafeContext } from '@/hooks/useSafeContext';
import { createContext } from 'react';
import { ListContextType } from '../types/context';

export const ListContext = createContext<ListContextType | null>(null);

/**
 * リストコンテキストカスタムフック
 * 
 * @returns リストコンテキストの値
 */
export function useListContext(): ListContextType {
    return useSafeContext(ListContext, 'ListContext');
}