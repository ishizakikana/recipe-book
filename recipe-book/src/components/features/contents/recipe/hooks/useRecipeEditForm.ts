import { RecipeFormInput, schema } from '@/components/features/contents/recipe/types/edit';
import { SelectOption } from '@/components/ui/form/SelectBox';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { RecipeDetail } from '@/types/entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RecipeContext } from '../providers/RecipeContextProvider';
import { useRecipes } from './recipes/useRecipes';

export const useRecipeEditForm = (
    recipe: RecipeDetail | null
) => {

    const { recipeCategories } = useContext(RecipeContext);
    const { update } = useRecipes();

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
            categoryId: recipe?.category.id.toString(),
            shelfLife: recipe?.shelfLife || '',
            calories: recipe?.calories || undefined,
            ingredients: recipe?.ingredients.map(i => `${i.name} ${i.volume}`).join('\n'),
            steps: recipe?.steps.map(s => ({
                id: s.id,
                text: s.text,
                seasonings: s.seasonings?.map(s => `${s.name} ${s.volume}`).join('\n') ?? ''
            }))
        }
    });

    // エラー管理
    const [submitError, setSubmitError] = useState<string | null>(null);

    // カテゴリセレクトボックスオプション
    const categoryOptions: SelectOption[] = recipeCategories.map(c =>
        ({ label: c.name, value: c.id.toString() })
    )

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
        categoryOptions,
        register,
        handleSubmit,
        submitError,
        formErrors: errors,
        loading: isSubmitting,
        onUpdate
    };
}