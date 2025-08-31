import { RecipeFormInput } from '../../types/edit';
import { useRecipesActions } from './useRecipesActions';
import { useRecipesState } from './useRecipesState';

export function useRecipes() {

    const { updateData, deleteData } = useRecipesActions();
    const { updateState, deleteState } = useRecipesState();

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