import { Recipe, RecipeCategory, RecipeIngredient, RecipeSeasoning, RecipeStep } from '@prisma/client'

//
// response
//

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
    steps: RecipeStepSummaryResponse[]
}

export type RecipeStepSummaryResponse = {
    id: number
    recipeId: number
    stepNumber: number
    text: string
    seasonings: RecipeSeasoning[]
}

//
// request
//

export type RecipeUpdateRequest = {
    id: number
    recipe: Recipe
    ingredients: RecipeIngredient[]
    steps: RecipeStep[],
    seasonings: { stepId: number, items: RecipeSeasoning[] | undefined }
}