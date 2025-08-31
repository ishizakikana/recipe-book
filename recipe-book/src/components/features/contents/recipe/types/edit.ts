import { z } from 'zod';

/**
 * レシピフォーム入力型　(zod変換後)
 */
export type RecipeFormInput = z.infer<typeof schema>;

// バリデーションスキーマ
export const schema = z.object({
    id: z.number(),
    name: z.string().min(1, '入力してください'),
    categoryId: z.string().startsWith('0', { message: '選択してください' }),
    imageUrl: z.string(),
    shelfLife: z.string().optional(),
    calories: z.coerce.number().optional(),
    ingredients: z.string(),
    steps: z.object({
        id: z.number().optional(),
        text: z.string(),
        seasonings: z.string()
    }).array()
})