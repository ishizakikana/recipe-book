import { ListItem } from '@prisma/client'
import { act, renderHook } from '@testing-library/react'
import { useListItemsState } from '../useListItemsState'

describe('useListItemsState', () => {
    const mockData: ListItem[] = [
        { id: 1, name: 'アイテム1', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true },
        { id: 2, name: 'アイテム2', volume: '200', recipeName: 'レシピ2', categoryId: 1, isDone: false },
    ]

    describe('listItems', () => {
        test('初期値が正しく設定される', () => {
            const { result } = renderHook(() => useListItemsState(mockData));

            expect(result.current.listItems).toEqual(mockData);
        })

        test('空の配列で初期化される', () => {
            const { result } = renderHook(() => useListItemsState([]));

            expect(result.current.listItems).toEqual([]);
        })
    })

    describe('add', () => {
        test('リストアイテムを追加する', () => {
            const { result } = renderHook(() => useListItemsState(mockData));
            const newItem = { id: 3, name: 'アイテム3', volume: '300', recipeName: 'レシピ3', categoryId: 1, isDone: true };

            act(() => {
                result.current.add(newItem);
            })

            expect(result.current.listItems).toEqual([...mockData, newItem]);
        })
    })

    describe('modifyAll', () => {
        test('指定されたすべてのアイテムのチェック状態を変更する', () => {
            const { result } = renderHook(() => useListItemsState(mockData));
            const ids = [1, 2];
            const isDone = true;

            act(() => {
                result.current.modifyAll(ids, isDone);
            })

            expect(result.current.listItems).toEqual(mockData.map(item =>
                item.id === 1 || item.id === 2 ? { ...item, isDone } : item
            ));
        })

        test('存在しないIDが指定されたとき、何もしない', () => {
            const { result } = renderHook(() => useListItemsState(mockData));
            const ids = [3];
            const isDone = true;

            act(() => {
                result.current.modifyAll(ids, isDone);
            })

            expect(result.current.listItems).toEqual(mockData);
        })
    })

    describe('removeAll', () => {
        test('指定されたすべてのアイテムを削除する', () => {
            const { result } = renderHook(() => useListItemsState(mockData));
            const ids = [1, 2];

            act(() => {
                result.current.removeAll(ids);
            })

            expect(result.current.listItems).toEqual(mockData.filter(item => !ids.includes(item.id)));
        })
    })
})