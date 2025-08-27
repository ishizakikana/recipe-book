import { RecipeCategory, RecipeIngredient } from '@prisma/client'
import { StepSummary } from './viewModel'

export type RecipeSummaryResponse = {
    id: number
    name: string
    categoryId: number
    imageUrl: string | null
    calories: number | null
    shelfLife: string | null
    category: RecipeCategory
    ingredients: RecipeIngredient[]
}

export type RecipeDetailResponse = {
    id: number
    name: string
    categoryId: number
    imageUrl: string | null
    calories: number | null
    shelfLife: string | null
    category: RecipeCategory
    ingredients: RecipeIngredient[]
    steps: StepSummary[]
}

export type RecipeUpdateResponse = {
    id: number
    name: string
    categoryId: number
    imageUrl: string | null
    calories: number | null
    shelfLife: string | null
    category: RecipeCategory
}