import { z } from 'zod';

/**
 * レシピフォーム入力型　(zod変換後)
 */
export type RecipeFormInput = z.infer<typeof schema>;

// バリデーションスキーマ
export const schema = z.object({
    id: z.number(),
    name: z.string().nonempty('入力してください'),
    categoryId: z.string().nonempty('選択してください'),
    imageUrl: z.string().optional(),
    shelfLife: z.string().max(10, '10文字以下で入力してください').optional(),
    calories: z.coerce.number().optional(),
    ingredients: z.string(),
    steps: z.object({
        id: z.number().optional(),
        text: z.string(),
        seasonings: z.string().optional()
    }).array()
})