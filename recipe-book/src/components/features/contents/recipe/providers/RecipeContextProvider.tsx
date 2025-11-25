'use client'
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { RecipeCategory } from '@prisma/client';
import { ReactNode, useEffect, useState } from 'react';
import { RecipeContext } from '../hooks/useRecipeContext';

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

    const [recipeSummaries, setRecipeSummaries] = useState(initialRecipes);
    const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);

    const data = {
        recipeCategories,
        recipeSummaries,
        recipeDetail,
        setRecipeSummaries,
        setRecipeDetail
    }

    useEffect(() => {
        console.log('setRecipeDetail', recipeDetail);
    }, [recipeDetail])

    return (
        <RecipeContext.Provider value={data}>
            {children}
        </RecipeContext.Provider>
    )
}