import { RecipeSearchInput, RecipeSearchParams } from '@/components/features/contents/recipe/types/search';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { RecipeContext } from '../providers/RecipeContextProvider';

/**
 * GETパラメータをもとに検索フォーム入力値作成
 * 
 * @param params GETパラメータ
 * @returns 検索フォーム入力値
 */
const toSearchInput = (params: RecipeSearchParams): RecipeSearchInput => {
    const keyword = params.keyword ?? '';
    const categoryIds = params.categoryIds?.split(',') ?? [];

    return {
        keyword,
        categoryIds: categoryIds.map(id => Number(id))
    }
}

/**
 * 検索条件入力値をもとにクエリ文字列作成
 * 
 * @param searchInput 検索フォーム入力値
 * @returns '/recipe' に付与するクエリ文字列
 */
const buildSearchQuery = (searchInput: RecipeSearchInput): string => {
    const params = new URLSearchParams();

    if (searchInput.keyword) {
        params.append('keyword', searchInput.keyword);
    }

    if (searchInput.categoryIds && searchInput.categoryIds.length > 0) {
        params.append('categoryIds', searchInput.categoryIds.join(','));
    }

    return `/recipe?${params.toString()}`;
}

/**
 * レシピ検索フォームカスタムフック
 * 
 * GETパラメータ、検索フォーム入力値の管理とレシピ検索を行います。
 * 
 * @returns 
 *  form (検索フォーム入力値)
 *  isSearch (検索中フラグ)
 *  setFormValue (検索フォーム入力値更新)
 */
export function useRecipeSearchForm() {
    const router = useRouter();
    const { getParams } = useQueryParams<RecipeSearchParams>();
    const { setRecipes } = useContext(RecipeContext);

    // フォーム入力値管理
    const [form, setForm] = useState<RecipeSearchInput>({ keyword: '', categoryIds: [] });

    // 検索中フラグ
    const isSearch = form.keyword !== '' || form.categoryIds.length !== 0;

    /**
     * フォーム値更新
     * 
     * @param key キー
     * @param value 値
     * @returns {void}
     */
    const setFormValue = (key: string, value: string | number[]) => {
        setForm(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    /**
     * 検索
     * 
     * 検索フォーム入力値をもとにレシピリストとGETパラメータを更新します。
     * 
     * @param initialForm 検索フォーム入力値初期値
     */
    const search = (initialForm?: RecipeSearchInput) => {
        const searchInput = initialForm ?? form;

        // レシピリスト更新
        setRecipes(prev =>
            prev.map(r => {
                let visible =
                    (searchInput.categoryIds.length === 0 || searchInput.categoryIds.includes(r.category.id)) &&
                    (searchInput.keyword === '' || r.keywords.some((k: string) => k.includes(searchInput.keyword)));

                return { ...r, visible };
            })
        )

        // GETパラメータ更新
        const query = buildSearchQuery(searchInput);
        router.push(query);
    }

    // 初回読み込み時にGETパラメータをもとに検索
    useEffect(() => {
        const params = getParams();
        if (Object.keys(params).length !== 0) {
            const initialForm = toSearchInput(params);
            setForm(initialForm);
            search(initialForm);
        }
    }, []);

    // フォーム入力値変更時に検索
    useEffect(() => {
        search();
    }, [form])

    return {
        form,
        isSearch,
        setFormValue,
    }
}