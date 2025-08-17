import { RecipeSearchInput } from '@/components/features/contents/recipe/type';
import { useState } from 'react';

export function useRecipeSearchForm(
    searchInput: RecipeSearchInput
) {

    // フォーム入力値管理
    const [form, setForm] = useState<RecipeSearchInput>(searchInput);

    const setFormValue = (key: string, value: string | number[]) => {
        setForm(prev => {
            return {
                ...prev,
                [key]: value
            }
        });
    }

    return {
        form,
        setFormValue
    }
}