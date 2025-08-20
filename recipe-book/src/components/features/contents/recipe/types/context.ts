import { RecipeCategory } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'
import { RecipeSummary } from '../../../../../types/entity'

export type RecipeContextType = {
    recipeCategories: RecipeCategory[],
    recipes: RecipeSummary[],
    setRecipes: Dispatch<SetStateAction<RecipeSummary[]>>
}