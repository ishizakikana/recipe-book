import { apiPost } from '@/lib/client/fetch';
import { stripFullImageUrl } from '@/lib/server/converter/recipeConverter';
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
        const result: RecipeDetail = await apiPost('/recipe/update', {
            id: data.id,
            data: {
                recipe: {
                    id: data.id,
                    name: data.name,
                    categoryId: parseInt(data.categoryId),
                    imageUrl: stripFullImageUrl(data.imageUrl),
                    calories: data.calories,
                    shelfLife: data.shelfLife,
                },
                ingredients: data.ingredients.split('\n').map((i, idx) => ({
                    id: `${String(data.id).padStart(4, '0')}${String(idx).padStart(2, '0')}`,      // ex) 000101 レシピID + インデックス
                    recipeId: data.id,
                    name: i.split(' ')[0],
                    volume: i.split(' ')[1]
                })),
                steps: data.steps.map((step, idx) => ({
                    id: step.id,
                    recipeId: data.id,
                    stepNumber: idx + 1,
                    text: step.text,
                    seasonings: step.seasonings ? step.seasonings.split('\n').map((s, idx) => ({
                        id: `${String(data.id).padStart(4, '0')}${String(idx).padStart(2, '0')}`,      // ex) 000101 レシピID + インデックス
                        name: s.split(' ')[0],
                        volume: s.split(' ')[1]
                    })) : []
                }))
            }
        })

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