import { ListCategory, ListItem } from '@prisma/client';
import { z } from 'zod';

/**
 * カテゴリごとに分類されたリストアイテム型
 */
export type CategorizedItem = {
    category: ListCategory,
    items: ListItem[]
}

/**
 * リストアイテム新規登録フォーム入力型
 */
export type CreateFormInput = z.infer<typeof createSchema>;

//　スキーマ
export const createSchema = z.object({
    name: z.string().min(1, '入力してください'),
    volume: z.string(),
    categoryId: z.coerce.number().min(1, '選択してください'),
});