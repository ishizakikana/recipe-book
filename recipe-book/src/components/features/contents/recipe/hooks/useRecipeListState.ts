import { RecipeSummary } from '@/types/entity';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useRecipeListState(
    initialRecipes: RecipeSummary[]
) {
    const router = useRouter();

    // レシピリスト管理
    const [recipes, setRecipes] = useState<RecipeSummary[]>(initialRecipes);



    const modify = (recipe: RecipeSummary) => {
        setRecipes(prev => prev.map(r => r.id === recipe.id ? recipe : r));
    }

    return {
        recipes,
        modify
    }
}