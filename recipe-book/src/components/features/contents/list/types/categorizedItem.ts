import { ListCategory, ListItem } from '@prisma/client';

/**
 * カテゴリごとに分類されたリストアイテム型
 */
export type CategorizedItem = {
    category: ListCategory,
    items: ListItem[]
}