import { z } from 'zod';

/**
 * レシピ検索フォーム入力型
 */
export type RecipeSearchInput = {
    categoryIds: number[],
    keyword: string
}

/**
 * レシピフォーム入力型
 */
export type RecipeFormInput = z.infer<typeof schema>;

// バリデーションスキーマ
export const schema = z.object({
    id: z.number(),
    name: z.string().min(1, '入力してください'),
    categoryId: z.string(),
    imageUrl: z.string(),
    shelfLife: z.string(),
    calories: z.number(),
    ingredients: z.string(),
    steps: z.object({
        text: z.string(),
        seasonings: z.string()
    }).array()
})