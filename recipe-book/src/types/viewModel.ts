
export type RecipeSummary = {
    id: number
    name: string
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
    imageUrl: string
    calories: number | undefined
    shelfLife: string | undefined
    category: RecipeCategory
    ingredients: RecipeIngredient[],
    steps: RecipeStepSummary[]
}

export type RecipeStepSummary = {
    id: number
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
    name: string
    volume: string | undefined
}

export type RecipeSeasoning = {
    id: string
    name: string
    volume: string | undefined
}