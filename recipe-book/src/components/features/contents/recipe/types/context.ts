import { RecipeDetail, RecipeSummary } from '@/types/viewModel'
import { RecipeCategory } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

export type RecipeContextType = {
    recipeCategories: RecipeCategory[]
    recipeSummaries: RecipeSummary[]
    setRecipeSummaries: Dispatch<SetStateAction<RecipeSummary[]>>
    recipeDetail: RecipeDetail | null
    setRecipeDetail: Dispatch<SetStateAction<RecipeDetail | null>>
}