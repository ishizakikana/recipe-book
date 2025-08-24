'use client'
import { RecipeCategory } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';
import { RecipeDetail, RecipeSummary } from '../../../../../types/entity';
import { RecipeContextType } from '../types/context';

export const RecipeContext = createContext<RecipeContextType>({
    recipeCategories: [],
    recipes: [],
    recipe: null,
    setRecipes: () => { },
    setRecipe: () => { }
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
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

    const data = {
        recipeCategories,
        recipes,
        recipe,
        setRecipes,
        setRecipe
    }

    return (
        <RecipeContext.Provider value={data}>
            {children}
        </RecipeContext.Provider>
    )
}