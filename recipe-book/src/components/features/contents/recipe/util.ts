import { RecipeSearchInput } from './hooks/useRecipeSearchForm';

/**
 * 検索パラメータをもとにクエリ文字列を作成
 * 
 * @param searchInput 検索条件
 * @returns クエリ文字列
 */
export const buildSearchQuery = (searchInput: RecipeSearchInput): string => {
    const params = new URLSearchParams();

    if (searchInput.keyword) {
        params.append('keyword', searchInput.keyword);
    }

    if (searchInput.categoryIds && searchInput.categoryIds.length > 0) {
        params.append('categoryIds', searchInput.categoryIds.join(','));
    }

    return `/recipe?${params.toString()}`;
}