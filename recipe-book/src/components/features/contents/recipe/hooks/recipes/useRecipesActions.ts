import { apiPost } from '@/lib/client/fetch';
import { stripFullImageUrl } from '@/lib/server/converter/recipeConverter';
import { RecipeDetail } from '@/types/entity';
import { RecipeFormInput } from '../../types/edit';

export function useRecipesActions() {

    const updateData = async (data: RecipeFormInput): Promise<RecipeDetail> => {

        // レシピ更新
        const recipe: RecipeDetail = await apiPost('/recipe/update', {
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
                ingredients: data.ingredients.split('\n').map(i => ({
                    recipeId: data.id,
                    name: i.split(' ')[0],
                    volume: i.split(' ')[1]
                })),
                steps: data.steps
            }
        })

        console.log(recipe);

        return recipe;
    }

    return {
        updateData
    }
}