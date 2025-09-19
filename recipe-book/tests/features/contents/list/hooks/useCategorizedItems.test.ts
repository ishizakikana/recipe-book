import { useCategorizedItems } from '@/components/features/contents/list/hooks/useCategorizedItems'
import { ListCategory, ListItem } from '@prisma/client'
import { renderHook } from '@testing-library/react'

const mockCategories: ListCategory[] = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
]

const mockListItems: ListItem[] = [
    { id: 1, name: '玉ねぎ', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true },
    { id: 2, name: 'ひき肉', volume: '200', recipeName: 'レシピ2', categoryId: 1, isDone: false },
    { id: 3, name: 'にんじん', volume: '300', recipeName: 'レシピ3', categoryId: 2, isDone: true },
    { id: 4, name: 'じゃがいも', volume: '400', recipeName: 'レシピ4', categoryId: 2, isDone: false },
    { id: 5, name: 'たまご', volume: '500', recipeName: 'レシピ5', categoryId: 3, isDone: true },
]

describe('useCategorizedItems', () => {
    test('カテゴリごとにアイテムが正しく分類される', () => {
        const { result } = renderHook(() => useCategorizedItems(mockCategories, mockListItems));

        expect(result.current).toHaveLength(3);

        expect(result.current[0].category).toEqual(mockCategories[0]);
        expect(result.current[0].items.map(i => i.name)).toEqual(['ひき肉', '玉ねぎ']);

        expect(result.current[1].category).toEqual(mockCategories[1]);
        expect(result.current[1].items.map(i => i.name)).toEqual(['じゃがいも', 'にんじん']);

        expect(result.current[2].category).toEqual(mockCategories[2]);
        expect(result.current[2].items.map(i => i.name)).toEqual(['たまご']);
    })

    test('カテゴリに属するアイテムが存在しないとき、除外される', () => {
        const emptyCategory = { id: 4, name: 'D', icon: '', color: '' };
        const { result } = renderHook(() => useCategorizedItems([...mockCategories, emptyCategory], mockListItems));

        expect(result.current).toHaveLength(3);
        expect(result.current.find(c => c.category.id === emptyCategory.id)).toBeUndefined();
    })
})