import { apiPost } from '@/lib/client/fetch';
import { RecipeSummary } from '@/types/entity';
import { RecipeFormInput } from '../types/edit';

export function useRecipeActions(
) {

    const update = async (data: RecipeFormInput) => {

        // レシピ更新
        const result: RecipeSummary = await apiPost('/recipe/update', {
            id: data.id,
            data: {
                name: data.name,
                categoryId: parseInt(data.categoryId),
                imageUrl: data.imageUrl,
                calories: data.calories,
                shelfLife: data.shelfLife
            }
        });
    }

    return {
        update
    }
}