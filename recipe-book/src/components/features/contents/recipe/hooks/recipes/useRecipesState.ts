import { RecipeDetail, RecipeSummary } from '@/types/entity';
import { useContext } from 'react';
import { RecipeContext } from '../../providers/RecipeContextProvider';

export function useRecipesState() {

    const { setRecipes, setRecipe } = useContext(RecipeContext);

    const updateState = (recipe: RecipeDetail) => {
        const recipeSummary: RecipeSummary = {
            ...recipe,
            keywords: [recipe.name, ...recipe.ingredients?.map(i => i.name) ?? []],
            visible: true
        }

        setRecipe(null);
        setRecipes(prev => prev.map(r => r.id === recipe.id ? { ...r, ...recipeSummary } : r));
    }

    return {
        updateState
    }
}