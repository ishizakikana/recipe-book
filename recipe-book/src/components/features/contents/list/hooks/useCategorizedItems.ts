import { ListCategory, ListItem } from '@prisma/client';
import { useMemo } from 'react';

/**
 * リストアイテムをカテゴリごとに分類するカスタムフック
 * 
 * 指定されたカテゴリのアイテムのリストをもとに、カテゴリ単位でアイテムをグループ化して返します。
 * 
 * @param listCategories リストカテゴリ一覧
 * @param listItems リストアイテム一覧
 * @returns カテゴリごとに分類されたリストアイテム
 */
export function useCategorizedItems(
    listCategories: ListCategory[],
    listItems: ListItem[]
) {

    // メモ化　listCategories と listItems に変更があった場合のみ再計算
    return useMemo(() => {
        return listCategories
            .sort((a, b) => a.id - b.id)    // カテゴリIDでソート
            .map(category => {
                const items = listItems.filter(item => item.categoryId === category.id)
                    .sort((a, b) => a.name.localeCompare(b.name))       // アイテム名でソート
                return { category, items };
            })
            .filter(({ items }) => items.length > 0)
    }, [listCategories, listItems]);
}