import { SelectOption } from '@/components/ui/form/select/SelectBox';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { ListCategory } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateItemFormInput } from '../types';

/**
 * リストアイテム新規作成フォーム入力スキーマ
 * 
 * name: 入力必須
 * volume: 任意
 * categoryId: 任意 未選択の場合は自動的にその他（6）を設定
 */
export const createItemSchema = z.object({
    name: z.string().min(1, '入力してください'),
    volume: z.string(),
    categoryId: z.number().optional(),
});

/**
 * リストアイテム新規作成フォームカスタムフック
 * 
 * @param listCategories リストカテゴリ一覧
 * @param create リストアイテム新規作成関数
 * @returns 
 *  control（フォームコントロールオブジェクト）
 *  register（フォーム登録関数）
 *  handleSubmit（フォーム送信ハンドラー）
 *  categories（カテゴリセレクトオプション）
 *  submitError（送信エラーメッセージ）
 *  errors（フォームエラーオブジェクト） 
 *  isSubmitting（送信中フラグ）
 *  onCreate（リストアイテム新規作成関数）
 */
export function useCreateItemForm(
    listCategories: ListCategory[],
    create: (item: CreateItemFormInput) => void
) {

    const {
        control,
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<CreateItemFormInput>({
        resolver: zodResolver(createItemSchema)
    })

    // エラー管理
    const [submitError, setSubmitError] = useState<string | null>(null);

    // カテゴリセレクトオプション
    const categories: SelectOption[] = listCategories.map((category) => ({
        label: category.name,
        value: category.id.toString()
    }));

    /**
     * リストアイテム新規作成
     * 
     * フォーム入力値を元にリストアイテムを新規作成します。
     * 成功時は入力値とエラーメッセージをクリアし、true を返します。
     * 失敗時はエラーメッセージを設定し、false を返します。
     * 
     * @param data フォーム入力値
     * @returns 処理結果
     */
    const onCreate = (data: CreateItemFormInput) => {
        try {
            create(data);
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
        categories,
        submitError,
        errors,
        isSubmitting,
        onCreate
    }
}