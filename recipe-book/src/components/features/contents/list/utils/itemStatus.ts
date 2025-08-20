import { CategorizedItem } from '../types/categorizedItem';

/**
 * 完了済みアイテムのIDリスト取得
 * 
 * isDone が true のアイテムIDをすべて取得します。
 * 
 * @param categorizedItems カテゴリごとに分類されたリストアイテム
 * @returns すべての完了済みアイテムのIDリスト
 */
export function getDoneIds(categorizedItems: CategorizedItem[]): number[] {
    return categorizedItems.flatMap(({ items }) =>
        items.filter(item => item.isDone)
            .map(item => item.id)
    );
}

/**
 * 未完了アイテムのIDリスト取得
 * 
 * @param categorizedItems カテゴリごとに分類されたリストアイテム
 * @returns すべての未完了アイテムのIDリスト
 */
export function getUndoneIds(categorizedItems: CategorizedItem[]): number[] {
    return categorizedItems.flatMap(({ items }) =>
        items.filter(item => !item.isDone)
            .map(item => item.id)
    );
}