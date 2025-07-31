import { ListCategory, ListItem } from '@prisma/client';
import { z } from 'zod';
import { createItemSchema } from './hooks/useCreateItemForm';

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
export type CreateItemFormInput = z.infer<typeof createItemSchema>;