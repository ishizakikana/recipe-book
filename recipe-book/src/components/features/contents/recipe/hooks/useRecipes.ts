import { useContext } from 'react';
import { RecipeContext } from '../providers/RecipeContextProvider';

export function useRecipes() {

    const { recipes } = useContext(RecipeContext);

    return {
        recipes,
    }
}