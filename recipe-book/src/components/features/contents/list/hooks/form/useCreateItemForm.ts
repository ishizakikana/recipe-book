import { SelectOption } from '@/components/ui/form/SelectBox';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ItemFormInput, itemSchema } from '../../types/itemFormInput';
import { useItemList } from '../itemList/useItemList';
import { useListContext } from '../useListContext';

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
export function useCreateItemForm() {

    const { listCategories } = useListContext();
    const { create } = useItemList();

    const {
        control,
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ItemFormInput>({
        resolver: zodResolver(itemSchema)
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
    const onCreate = async (data: ItemFormInput) => {
        try {
            await create(data);
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