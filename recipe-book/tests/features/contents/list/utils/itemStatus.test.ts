import { CategorizedItem } from "@/components/features/contents/list/types";
import { getDoneIds, getUndoneIds } from "@/components/features/contents/list/utils/itemStatus";

describe('itemStatus utils', () => {
    const mockData: CategorizedItem[] = [
        {
            category: { id: 1, name: 'A', icon: '', color: '' },
            items: [
                { id: 1, name: 'アイテム1', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true },
                { id: 2, name: 'アイテム2', volume: '200', recipeName: 'レシピ2', categoryId: 1, isDone: false },
            ],
        },
        {
            category: { id: 2, name: 'B', icon: '', color: '' },
            items: [
                { id: 3, name: 'アイテム3', volume: '300', recipeName: 'レシピ3', categoryId: 2, isDone: true },
                { id: 4, name: 'アイテム4', volume: '400', recipeName: 'レシピ4', categoryId: 2, isDone: false },
                { id: 5, name: 'アイテム5', volume: '500', recipeName: 'レシピ5', categoryId: 2, isDone: true },
            ],
        },
    ];

    describe('getDoneIds', () => {

        test('完了済みアイテムのIDのみ取得できる', () => {
            expect(getDoneIds(mockData).sort()).toEqual([1, 3, 5]);
        });

        test('全てのアイテムが未完了のとき、空の配列を返す', () => {
            const data: CategorizedItem[] = [
                {
                    category: { id: 3, name: 'C', icon: '', color: '' },
                    items: [{ id: 10, name: 'テスト', volume: '', recipeName: '', categoryId: 3, isDone: false }],
                },
            ];
            expect(getDoneIds(data)).toEqual([]);
        });

        test('空の配列が渡されたとき、空の配列を返す', () => {
            expect(getDoneIds([])).toEqual([]);
        });
    });

    describe('getUndoneIds', () => {
        test('未完了アイテムのIDのみ取得できる', () => {
            expect(getUndoneIds(mockData).sort()).toEqual([2, 4]);
        });

        test('すべてのアイテムが完了済みのとき、空の配列を返す', () => {
            const data: CategorizedItem[] = [
                {
                    category: { id: 3, name: 'C', icon: '', color: '' },
                    items: [{ id: 10, name: 'テスト', volume: '', recipeName: '', categoryId: 3, isDone: true }],
                },
            ];
            expect(getUndoneIds(data)).toEqual([]);
        });

        test('空の配列が渡されたとき、空の配列を返す', () => {
            expect(getUndoneIds([])).toEqual([]);
        });
    });
});