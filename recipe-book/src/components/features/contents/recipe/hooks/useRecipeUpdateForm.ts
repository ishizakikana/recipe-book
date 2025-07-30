import { FormReturn } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RecipeUpdateFormInput, schema } from '../type';

export const useRecipeUpdateForm = (): FormReturn<RecipeUpdateFormInput> => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RecipeUpdateFormInput>({
        resolver: zodResolver(schema)
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