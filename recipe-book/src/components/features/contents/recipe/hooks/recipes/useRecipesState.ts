import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { useRecipeContext } from '../useRecipeContext';

export function useRecipesState() {

    const { setRecipeSummaries, setRecipeDetail } = useRecipeContext();
    const updateState = (recipe: RecipeDetail) => {
        const recipeSummary: RecipeSummary = {
            ...recipe,
            keywords: [
                recipe.name,
                ...recipe.ingredients.length > 0 ? recipe.ingredients.map(i => i.name) : []],
            visible: true
        }

        setRecipeDetail(recipe);
        setRecipeSummaries(prev => prev.map(r => r.id === recipe.id ? { ...r, ...recipeSummary } : r));
    }

    return {
        updateState
    }
}