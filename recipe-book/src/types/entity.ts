export type RecipeSummary = {
    id: number;
    name: string;
    imageUrl: string;
    shelfLife: string | null;
    calories: number | null;
    category: {
        id: number;
        name: string;
        icon: string;
        color: string;
    },
    visible: boolean;
}

export type RecipeDetail = {
    id: number;
    name: string;
    imageUrl: string;
    shelfLife: string | null;
    calories: number | null;
    category: RecipeCategorySummary,
    ingredients: {
        id: number;
        name: string;
        volume: string | null;
    }[],
    steps: StepSummary[]
}

export type RecipeCategorySummary = {
    id: number;
    name: string;
    icon: string;
    color: string;
}

export type StepSummary = {
    id: number;
    stepNumber: number;
    text: string;
    seasonings: {
        id: number;
        name: string;
        volume: string | null;
    }[] | null;
}