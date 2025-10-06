import { apiPost } from '@/lib/client/fetch';
import { RecipeDetail } from '@/types/viewModel';
import { RecipeFormInput } from '../../types/edit';

/**
 * レシピDB操作カスタムフック
 * 
 * DBへレシピの更新を行います。
 * 
 * @returns 
 *  updateData（レシピ更新関数）
 */
export function useRecipesActions() {

    /**
     * レシピ更新
     * 
     * @param data 更新するレシピ
     * @returns {Promise<RecipeDetail>} 更新したレシピ
     */
    const updateData = async (data: RecipeFormInput): Promise<RecipeDetail> => {

        // レシピ更新
        const result: RecipeDetail = await apiPost('/recipe/update', { data });

        return result;
    }

    const deleteData = async (id: number): Promise<void> => {
        await apiPost('/recipe/delete', { id });
    }

    return {
        updateData,
        deleteData
    }
}