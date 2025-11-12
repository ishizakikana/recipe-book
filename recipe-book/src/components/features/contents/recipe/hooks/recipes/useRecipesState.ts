import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { useRecipeContext } from '../useRecipeContext';

export function useRecipesState() {

    const { setRecipeSummaries, setRecipeDetail } = useRecipeContext();

    /**
     * レシピ表示データ更新
     * 
     * @param recipe 更新するレシピ
     */
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

    /**
     * レシピ表示データ削除
     * 
     * @param id 削除するレシピID
     */
    const deleteState = (id: number) => {
        setRecipeSummaries(prev => prev.filter(r => r.id !== id));
        setRecipeDetail(null);
    }

    return {
        updateState,
        deleteState
    }
}