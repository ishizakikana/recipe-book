import { RecipeCategory } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'
import { RecipeDetail, RecipeSummary } from '../../../../../types/entity'

export type RecipeContextType = {
    recipeCategories: RecipeCategory[],
    recipes: RecipeSummary[],
    recipe: RecipeDetail | null,
    setRecipes: Dispatch<SetStateAction<RecipeSummary[]>>
    setRecipe: Dispatch<SetStateAction<RecipeDetail | null>>
}