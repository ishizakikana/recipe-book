import { RecipeFormInput } from '../../types/edit';
import { useRecipesActions } from './useRecipesActions';
import { useRecipesState } from './useRecipesState';

export function useRecipes() {

    const { updateData } = useRecipesActions();
    const { updateState } = useRecipesState();

    const update = async (data: RecipeFormInput) => {
        const result = await updateData(data);
        updateState(result);
    }

    return {
        update
    }
}