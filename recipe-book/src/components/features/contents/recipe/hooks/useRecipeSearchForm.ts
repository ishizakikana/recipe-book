import { ERROR_MESSAGES, formatMessage } from '@/lib/constants/messages';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RecipeSearchInput } from '../type';
import { buildSearchQuery } from '../util';

export function useRecipeSearchForm({
    searchInput
}: {
    searchInput: RecipeSearchInput
}) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<RecipeSearchInput>({
        defaultValues: searchInput
    });

    // エラー管理
    const [submitError, setSubmitError] = useState<string | null>(null);

    /**
     * 検索パラメータをもとにクエリ文字列を生成し、検索を行う
     * 
     * @param searchInput 検索条件
     * @returns {void}
     */
    const search = (searchInput: RecipeSearchInput): void => {
        try {
            const query = buildSearchQuery(searchInput);
            router.push(query);
        } catch (e) {
            console.error(e);
            const msg = e instanceof Error
                ? formatMessage(ERROR_MESSAGES.SEARCH_FAILED, 'レシピ')
                : ERROR_MESSAGES.UNKNOWN_ERROR;
            setSubmitError(msg);
        }
    }

    const onSubmit = handleSubmit(search);

    return {
        register,
        control,
        loading: isSubmitting,
        submitError,
        onSubmit
    }
}