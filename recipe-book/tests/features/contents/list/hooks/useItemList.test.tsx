import { useCategorizedItems } from '@/components/features/contents/list/hooks/useCategorizedItems';
import { useItemList } from '@/components/features/contents/list/hooks/useItemList';
import { useItemListActions } from '@/components/features/contents/list/hooks/useItemListActions';
import { ListContext } from '@/components/features/contents/list/hooks/useListContext';
import { useListItemsState } from '@/components/features/contents/list/hooks/useListItemsState';
import { ListContextType } from '@/components/features/contents/list/types/context';
import { ListCategory, ListItem } from '@prisma/client';
import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

jest.mock('@/components/features/contents/list/hooks/useListItemsState');
jest.mock('@/components/features/contents/list/hooks/useCategorizedItems');
jest.mock('@/components/features/contents/list/hooks/useItemListActions');

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

    const renderUseItemList = () => {
        const wrapper = ({ children }: { children: ReactNode }) => {
            const contextValue: ListContextType = {
                listCategories: mockCategories,
                categorizedItems: [],
                listItems: [],
                setListItems: jest.fn(),
                error: null,
                setError: jest.fn(),
            }

            return (
                <ListContext.Provider value={contextValue}>
                    {children}
                </ListContext.Provider>
            )
        }
        return renderHook(() => useItemList(), { wrapper });
    }

    beforeEach(() => {
        { (useListItemsState as jest.Mock).mockReturnValue(mockListItemsState) }
        { (useCategorizedItems as jest.Mock).mockReturnValue(categorizedItems) }
        { (useItemListActions as jest.Mock).mockReturnValue(mockActions) }

        jest.clearAllMocks();
    })

    describe('create', () => {
        test('createData と createState が呼ばれる', async () => {
            const { result } = renderUseItemList();
            const input = { name: 'アイテム2', volume: '200', categoryId: 1 };
            await result.current.create(input);
            expect(mockActions.create).toHaveBeenCalledWith(input);
            expect(mockListItemsState.add).toHaveBeenCalledWith(input);
        })
    })
})