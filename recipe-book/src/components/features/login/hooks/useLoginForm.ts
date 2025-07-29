import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { apiPost } from '@/lib/fetch';
import { FormReturn } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// バリデーションスキーマ
const schema = z.object({
    userId: z.string().min(1, ERROR_MESSAGES.REQUIRED_FIELD),
    password: z.string().min(1, ERROR_MESSAGES.REQUIRED_FIELD)
});

// 入力型推論
export type LoginFormInput = z.infer<typeof schema>;

export const useLoginForm = (): FormReturn<LoginFormInput> => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormInput>({
        resolver: zodResolver(schema)
    });

    // エラー管理
    const [submitError, setSubmitError] = useState<string | null>(null);

    // フォーム送信イベント
    const onSubmit = async (data: LoginFormInput) => {
        try {
            await apiPost('/auth/login', data);
            router.push('/recipe');
        } catch (e) {
            const msg = e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            setSubmitError(msg);
        }
    }

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        submitError,
        formErrors: errors,
        loading: isSubmitting,
    }
}