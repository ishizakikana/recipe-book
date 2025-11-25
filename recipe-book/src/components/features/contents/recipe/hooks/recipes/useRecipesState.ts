import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { useRecipeContext } from '../useRecipeContext';

/**
 * レシピ表示データ操作カスタムフック
 * 
 * Stateへレシピの新規登録・更新・削除を行います。
 * 
 * @returns 
 *  createState（レシピ新規登録関数）
 *  updateState（レシピ更新関数）
 *  deleteState（レシピ削除関数）
 */
export function useRecipesState() {

    const { setRecipeSummaries, setRecipeDetail } = useRecipeContext();

    /**
     * レシピ表示データ新規登録
     * 
     * @param recipe 新規登録するレシピ
     */
    const createState = (recipe: RecipeDetail) => {
        const recipeSummary: RecipeSummary = {
            ...recipe,
            keywords: [
                recipe.name,
                ...recipe.ingredients.length > 0 ? recipe.ingredients.map(i => i.name) : []],
            visible: true
        }

        setRecipeDetail(recipe);
        setRecipeSummaries(prev => [...prev, recipeSummary]);
    }

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
        setRecipeDetail(null);
        setRecipeSummaries(prev => prev.filter(r => r.id !== id));
    }

    return {
        createState,
        updateState,
        deleteState
    }
}