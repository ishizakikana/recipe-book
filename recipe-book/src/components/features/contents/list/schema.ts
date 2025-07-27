import { z } from 'zod';

/**
 * リストアイテム新規登録フォームスキーマ
 */
export const createSchema = z.object({
    name: z.string().min(1, '入力してください'),
    volume: z.string(),
    categoryId: z.coerce.number().min(1, '選択してください'),
});