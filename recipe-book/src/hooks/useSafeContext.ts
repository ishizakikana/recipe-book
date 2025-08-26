import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { Context, useContext } from 'react';

/**
 * コンテキストを安全に使用するための汎用フック
 * 
 * @param context コンテキスト
 * @param name コンテキスト名（エラーメッセージ用）
 * @returns コンテキストの値
 * @throws Provider外でコンテキストが使用されたとき
 */
export function useSafeContext<T>(context: Context<T | null>, name: string) {
    const value = useContext(context);
    if (!value) {
        const msg = formatMessage(ERROR_MESSAGES.HOOK_OUTSIDE_PROVIDER, name);
        throw new Error(msg);
    }
    return value;
}