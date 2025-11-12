import { RecipeFormInput } from '../../types/edit';
import { useRecipesActions } from './useRecipesActions';
import { useRecipesState } from './useRecipesState';

/**
 * レシピ状態管理とDB操作の統合カスタムフック
 * 
 * ローカル状態とDBの同期処理を一括で行います。
 * 
 * @returns 
 *  update（レシピ更新関数）
 *  delete（レシピ削除関数）
 */
export function useRecipes() {
    const { updateData, deleteData } = useRecipesActions();
    const { updateState, deleteState } = useRecipesState();

    /**
     * レシピ更新
     * 
     * @param data 更新するレシピ
     */
    const update = async (data: RecipeFormInput) => {
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
        update,
        delete: deleteRecipe
    }
}