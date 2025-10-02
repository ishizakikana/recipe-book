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
 */
export function useRecipes() {
    const { updateData } = useRecipesActions();
    const { updateState } = useRecipesState();

    /**
     * レシピ更新
     * 
     * @param data 更新するレシピ
     */
    const update = async (data: RecipeFormInput) => {
        const result = await updateData(data);
        updateState(result);
    }

    return {
        update: async (data: RecipeFormInput) => {
            const result = await updateData(data);
            updateState(result);
        },
        delete: async (id: number) => {
            await deleteData(id);
            deleteState(id);
        }
    }
}