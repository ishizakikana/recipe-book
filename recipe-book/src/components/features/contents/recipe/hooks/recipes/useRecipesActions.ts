import { apiPost } from '@/lib/client/fetch';
import { RecipeDetail } from '@/types/viewModel';
import { RecipeFormInput } from '../../types/edit';

/**
 * レシピDB操作カスタムフック
 * 
 * DBへレシピの新規登録・更新・削除を行います。
 * 
 * @returns 
 *  createData（レシピ新規登録関数）
 *  updateData（レシピ更新関数）
 *  deleteData（レシピ削除関数）
 */
export function useRecipesActions() {

    /**
     * レシピ新規登録
     * 
     * @param data 新規登録するレシピ
     * @returns {Promise<RecipeDetail>} 新規登録したレシピ
     */
    const createData = async (data: RecipeFormInput): Promise<RecipeDetail> => {
        return await apiPost('/recipe/create', { data });
    }

    /**
     * レシピ更新
     * 
     * @param data 更新するレシピ
     * @returns {Promise<RecipeDetail>} 更新したレシピ
     */
    const updateData = async (data: RecipeFormInput): Promise<RecipeDetail> => {
        return await apiPost('/recipe/update', { data });
    }

    /**
     * レシピ削除
     * 
     * @param id 削除するレシピID
     * @return {Promise<void>}
     */
    const deleteData = async (id: number): Promise<void> => {
        await apiPost('/recipe/delete', { id });
    }

    return {
        createData,
        updateData,
        deleteData
    }
}