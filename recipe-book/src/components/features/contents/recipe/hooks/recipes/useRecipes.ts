import { RecipeFormInput } from '../../types/edit';
import { useRecipesActions } from './useRecipesActions';
import { useRecipesState } from './useRecipesState';

/**
 * レシピ状態管理とDB操作の統合カスタムフック
 * 
 * ローカル状態とDBの同期処理を一括で行います。
 * 
 * @returns 
 *  createRecipe（レシピ新規登録関数）
 *  updateRecipe（レシピ更新関数）
 *  deleteRecipe（レシピ削除関数）
 */
export function useRecipes() {
    const { createData, updateData, deleteData } = useRecipesActions();
    const { createState, updateState, deleteState } = useRecipesState();

    /**
     * レシピ新規登録
     * 
     * @param data 新規登録するレシピ
     * @returns 新規登録したレシピ
     */
    const createRecipe = async (data: RecipeFormInput) => {
        const result = await createData(data);
        createState(result);
        return result;
    }

    /**
     * レシピ更新
     * 
     * @param data 更新するレシピ
     */
    const updateRecipe = async (data: RecipeFormInput) => {
        const result = await updateData(data);
        updateState(result);
    }

    /**
     * レシピ削除
     * 
     * @param id 削除するレシピID
     */
    const deleteRecipe = async (id: number) => {
        await deleteData(id);
        deleteState(id);
    }

    return {
        createRecipe,
        updateRecipe,
        deleteRecipe
    }
}