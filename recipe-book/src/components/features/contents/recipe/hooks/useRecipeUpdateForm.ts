import { RecipeDetail } from '@/types/entity';
import { FormReturn } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RecipeUpdateFormInput, schema } from '../type';

export const useRecipeUpdateForm = (
    recipe: RecipeDetail
): FormReturn<RecipeUpdateFormInput> => {

    const defaultValues: RecipeUpdateFormInput = {
        ...recipe,
        categoryId: recipe.category.id.toString(),
        shelfLife: recipe.shelfLife || '',
        calories: recipe.calories || 0,
        ingredients: recipe.ingredients.map(i => `${i.name} ${i.volume}`).join('\n'),
        steps: recipe.steps.map(s => ({
            text: s.text,
            seasonings: s.seasonings?.map(s => `${s.name} ${s.volume}`).join('\n') ?? ''
        }))
    }

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RecipeUpdateFormInput>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues
    });

    // エラー管理
    const [submitError, setSubmitError] = useState<string | null>(null);

    // フォーム送信イベント
    const onSubmit = async (data: RecipeUpdateFormInput) => {
        try {
            console.log('submit');
            console.log(data);
        } catch (e) {
            console.error(e);
            const msg = e instanceof Error ? e.message : '不明なエラー';
            setSubmitError(msg);
        }
    }

    return {
        register,
        control,
        onSubmit: handleSubmit(onSubmit),
        submitError,
        formErrors: errors,
        loading: isSubmitting
    };
}