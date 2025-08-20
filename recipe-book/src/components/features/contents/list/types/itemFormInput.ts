
import { z } from 'zod';

/**
 * リストアイテム新規作成フォーム入力スキーマ
 * 
 * name: 入力必須
 * volume: 任意
 * categoryId: 任意 未選択の場合は自動的にその他（6）を設定
 */
export const itemSchema = z.object({
    name: z.string().min(1, '入力してください'),
    volume: z.string(),
    categoryId: z.number().optional(),
});

/**
 * リストアイテム新規登録フォーム入力型
 */
export type ItemFormInput = z.infer<typeof itemSchema>;