import { apiPost } from '@/lib/client/fetch';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
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

/**
 * ログインフォームカスタムフック
 * 
 * @returns 
 *  register (react-hook-form登録関数)
 *  handleSubmit (react-hook-form送信関数)
 *  onLogin (ログイン処理関数)
 *  onSubmit (フォーム送信イベント関数)
 *  submitError (送信エラーメッセージ)
 *  formErrors (フォーム入力エラー)
 *  loading (送信中フラグ)
 */
export const useLoginForm = () => {
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
    const onLogin = async (data: LoginFormInput) => {
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
        handleSubmit,
        onLogin: onLogin,
        onSubmit: handleSubmit(onLogin),
        submitError,
        formErrors: errors,
        loading: isSubmitting,
    }
}