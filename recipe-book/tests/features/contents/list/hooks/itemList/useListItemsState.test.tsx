import { useItemListState } from '@/components/features/contents/list/hooks/itemList/useItemListState'
import { ListContext } from '@/components/features/contents/list/hooks/useListContext'
import { ListContextType } from '@/components/features/contents/list/types/context'
import { ListItem } from '@prisma/client'
import { act, renderHook } from '@testing-library/react'

const mockListItems: ListItem[] = [
    { id: 1, name: 'アイテム1', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true },
    { id: 2, name: 'アイテム2', volume: '200', recipeName: 'レシピ2', categoryId: 1, isDone: false },
]

const renderUseListItemsState = (override: Partial<ListContextType> = {}) => {
    const mockSetListItems = jest.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => {
        const contextValue: ListContextType = {
            listCategories: [],
            categorizedItems: [],
            listItems: mockListItems,
            setListItems: mockSetListItems,
            error: null,
            setError: jest.fn(),
            ...override
        }

        return (
            <ListContext.Provider value={contextValue}>
                {children}
            </ListContext.Provider>
        )
    }

    return {
        ...renderHook(() => useItemListState(), { wrapper }),
        mockSetListItems
    }
}

describe('useListItemsState', () => {

    describe('add', () => {
        test('リストアイテムを追加する', () => {
            const { result, mockSetListItems } = renderUseListItemsState();
            const newItem = { id: 3, name: 'アイテム3', volume: '300', recipeName: 'レシピ3', categoryId: 1, isDone: true };

            act(() => {
                result.current.createState(newItem);
            })

            expect(mockSetListItems).toHaveBeenCalledTimes(1);

            const updater = mockSetListItems.mock.calls[0][0];
            const updatedList = updater(mockListItems);
            expect(updatedList).toEqual([...mockListItems, newItem]);
        })
    })

    describe('modifyAll', () => {
        test('指定されたすべてのアイテムのチェック状態を変更する', () => {
            const { result, mockSetListItems } = renderUseListItemsState();
            const ids = [1, 2];
            const isDone = true;

            act(() => {
                result.current.updateAllState(ids, isDone);
            })

            expect(mockSetListItems).toHaveBeenCalledTimes(1);

            const updater = mockSetListItems.mock.calls[0][0];
            const updatedList = updater(mockListItems);
            expect(updatedList).toEqual(
                mockListItems.map(item => ids.includes(item.id) ? { ...item, isDone } : item)
            );
        })

        test('存在しないIDが指定されたとき、何もしない', () => {
            const { result, mockSetListItems } = renderUseListItemsState();
            const ids = [3];
            const isDone = true;

            act(() => {
                result.current.updateAllState(ids, isDone);
            })

            expect(mockSetListItems).toHaveBeenCalledTimes(1);

            const updater = mockSetListItems.mock.calls[0][0];
            const updatedList = updater(mockListItems);
            expect(updatedList).toEqual(mockListItems); // 変更なし
        })
    })

    describe('removeAll', () => {
        test('指定されたすべてのアイテムを削除する', () => {
            const { result, mockSetListItems } = renderUseListItemsState();
            const ids = [1, 2];

            act(() => {
                result.current.deleteAllState(ids);
            })

            expect(mockSetListItems).toHaveBeenCalledTimes(1);

            const updater = mockSetListItems.mock.calls[0][0];
            const updatedList = updater(mockListItems);
            expect(updatedList).toEqual(
                mockListItems.filter(item => !ids.includes(item.id))
            );
        })
    })
})