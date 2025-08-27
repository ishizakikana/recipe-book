import { useSafeContext } from '@/hooks/useSafeContext';
import { createContext } from 'react';
import { RecipeContextType } from '../types/context';

export const RecipeContext = createContext<RecipeContextType | null>(null);

/**
 * レシピコンテキストカスタムフック
 * 
 * @returns レシピコンテキストの値
 */
export function useRecipeContext(): RecipeContextType {
    return useSafeContext(RecipeContext, 'RecipeContext');
}