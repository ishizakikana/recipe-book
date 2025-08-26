import { RecipeCategory, RecipeIngredient, RecipeSeasoning } from '@prisma/client';

export type RecipeSummary = {
    id: number
    name: string
    categoryId: number
    imageUrl: string
    calories: number | null
    shelfLife: string | null
    category: RecipeCategory
    keywords: string[]
    visible: boolean
}

export type RecipeDetail = {
    id: number
    name: string
    categoryId: number
    imageUrl: string
    calories: number | null
    shelfLife: string | null
    category: RecipeCategory
    ingredients: RecipeIngredient[],
    steps: StepSummary[]
}

export type StepSummary = {
    id: number
    recipeId: number
    stepNumber: number
    text: string
    seasonings: RecipeSeasoning[];
}