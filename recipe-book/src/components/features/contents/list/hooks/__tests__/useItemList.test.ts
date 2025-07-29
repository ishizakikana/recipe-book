import { ListCategory, ListItem } from '@prisma/client';
import { renderHook } from '@testing-library/react';
import { useCategorizedItems } from '../useCategorizedItems';
import { useItemList } from '../useItemList';
import { useItemListActions } from '../useItemListActions';
import { useListItemsState } from '../useListItemsState';

jest.mock('../../hooks/useListItemsState');
jest.mock('../../hooks/useCategorizedItems');
jest.mock('../../hooks/useItemListActions');

describe('useItemList', () => {
    const mockCategories: ListCategory[] = [
        { id: 1, name: 'A', icon: '', color: '' },
    ]

    const mockListItems: ListItem[] = [
        { id: 1, name: 'アイテム1', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true }
    ]

    const mockListItemsState = {
        listItems: mockListItems,
        add: jest.fn(),
        modifyAll: jest.fn(),
        removeAll: jest.fn(),
    }

    const categorizedItems = [
        {
            category: { id: 1, name: 'A', icon: '', color: '' },
            items: [
                { id: 1, name: 'アイテム1', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true }
            ]
        }
    ]

    const mockActions = {
        create: jest.fn(),
        update: jest.fn(),
        updateAll: jest.fn(),
        deleteAll: jest.fn(),
    }

    beforeEach(() => {
        { (useListItemsState as jest.Mock).mockReturnValue(mockListItemsState) }
        { (useCategorizedItems as jest.Mock).mockReturnValue(categorizedItems) }
        { (useItemListActions as jest.Mock).mockReturnValue(mockActions) }

        jest.clearAllMocks();
    })

    test('各依存フックが正しく呼ばれ、戻り値が結合される', () => {
        const { result } = renderHook(() => useItemList(mockCategories, mockListItems));

        expect(useListItemsState).toHaveBeenCalledWith(mockListItems);
        expect(useCategorizedItems).toHaveBeenCalledWith(mockCategories, mockListItems);
        expect(useItemListActions).toHaveBeenCalledWith(
            categorizedItems,
            {
                add: mockListItemsState.add,
                modifyAll: mockListItemsState.modifyAll,
                removeAll: mockListItemsState.removeAll
            },
            expect.any(Function)
        );

        expect(result.current).toEqual({
            categorizedItems: categorizedItems,
            error: null,
            create: mockActions.create,
            update: mockActions.update,
            updateAll: mockActions.updateAll,
            deleteAll: mockActions.deleteAll,
            setError: expect.any(Function)
        })
    })
})