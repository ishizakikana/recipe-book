/**
 * レシピ検索GETパラメータ
 */
export type RecipeSearchParams = {
    keyword?: string,
    categoryIds?: string
}

/**
 * レシピ検索フォーム入力型
 */
export type RecipeSearchInput = {
    categoryIds: number[],
    keyword: string
}