import { ListCategory, ListItem } from '@prisma/client';
import { z } from 'zod';
import { createSchema } from './schema';

/**
 * カテゴリごとに分類されたリストアイテム型
 */
export type categorizedItem = {
    category: ListCategory,
    items: ListItem[]
}

/**
 * リストアイテム新規登録フォーム入力型
 */
export type CreateFormInput = z.infer<typeof createSchema>;

