'use client'
import { RecipeCategory } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';
import { RecipeSummary } from '../../../../../types/entity';
import { RecipeContextType } from '../types/context';

export const RecipeContext = createContext<RecipeContextType>({
    recipeCategories: [],
    recipes: [],
    setRecipes: () => { }
});

/**
 * レシピコンテキストプロバイダ
 */
export default function RecipeContextProvider({
    children,
    recipeCategories,
    initialRecipes
}: {
    children: ReactNode
    recipeCategories: RecipeCategory[],
    initialRecipes: RecipeSummary[]
}) {

    const [recipes, setRecipes] = useState(initialRecipes);

    const data = {
        recipeCategories,
        recipes,
        setRecipes
    }

    return (
        <RecipeContext.Provider value={data}>
            {children}
        </RecipeContext.Provider>
    )
}