import { categorizedItem } from './type';

/**
 * 完了済みアイテムのIDリスト取得
 * 
 * @param categorizedItems カテゴリごとに分類されたリストアイテム
 * @returns すべての完了済みアイテムのIDリスト
 */
export function getDoneIds(categorizedItems: categorizedItem[]): number[] {
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
export function getUndoneIds(categorizedItems: categorizedItem[]): number[] {
    return categorizedItems.flatMap(({ items }) =>
        items.filter(item => !item.isDone)
            .map(item => item.id)
    );
}