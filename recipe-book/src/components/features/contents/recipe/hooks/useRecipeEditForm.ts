import { RecipeFormInput, schema } from '@/components/features/contents/recipe/types/edit';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { RecipeDetail } from '@/types/entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecipeActions } from './useRecipeActions';

export const useRecipeEditForm = (
    recipe: RecipeDetail
) => {

    const router = useRouter();
    const { update } = useRecipeActions();

    const {
        register,
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RecipeFormInput>({
        resolver: zodResolver(schema),
        defaultValues: {
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
    });

    // エラー管理
    const [submitError, setSubmitError] = useState<string | null>(null);

    // レシピ更新
    const onUpdate = async (data: RecipeFormInput) => {
        try {
            update(data);       // データ更新
            reset();        // 入力値リセット
            setSubmitError(null); // エラーメッセージクリア
            return true;
        } catch (e) {
            const msg = e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            setSubmitError(msg);
            return false;
        }
    }

    return {
        control,
        register,
        handleSubmit,
        submitError,
        formErrors: errors,
        loading: isSubmitting,
        onUpdate
    };
}