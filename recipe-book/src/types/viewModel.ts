
export type RecipeSummary = {
    id: number
    name: string
    categoryId: number
    imageUrl: string
    calories: number | undefined
    shelfLife: string | undefined
    category: RecipeCategory
    keywords: string[]
    visible: boolean
}

export type RecipeDetail = {
    id: number
    name: string
    categoryId: number
    imageUrl: string
    calories: number | undefined
    shelfLife: string | undefined
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

export type RecipeCategory = {
    id: number
    name: string
    icon: string
    color: string
}

export type RecipeIngredient = {
    id: string
    recipeId: number
    name: string
    volume: string | undefined
}

export type RecipeSeasoning = {
    id: string
    stepId?: number
    recipeId?: number
    name: string
    volume: string | undefined
}