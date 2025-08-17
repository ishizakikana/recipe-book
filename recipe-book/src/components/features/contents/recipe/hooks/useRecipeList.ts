import { RecipeSummary } from "@/types/entity";
import { useRecipeListState } from "./useRecipeListState";

export function useRecipeList(
    initialRecipes: RecipeSummary[]
) {

    const { recipes, search } = useRecipeListState(initialRecipes);


    return {
        recipes,
        search,
    }
}