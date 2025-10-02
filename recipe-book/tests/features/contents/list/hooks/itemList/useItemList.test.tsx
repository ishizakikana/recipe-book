import { useItemList } from '@/components/features/contents/list/hooks/itemList/useItemList';
import { ListContext } from '@/components/features/contents/list/hooks/useListContext';
import { ListContextType } from '@/components/features/contents/list/types/context';
import { ItemFormInput } from '@/components/features/contents/list/types/itemFormInput';
import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

// モック関数
const mockCreateData = jest.fn();
const mockUpdateData = jest.fn();
const mockUpdateAllData = jest.fn();
const mockDeleteAllData = jest.fn();
const mockCreateState = jest.fn();
const mockUpdateAllState = jest.fn();
const mockDeleteAllState = jest.fn();
const mockSetError = jest.fn();
const mockGetDoneIds = jest.fn();
const mockGetUndoneIds = jest.fn();

jest.mock('@/components/features/contents/list/hooks/itemList/useItemListState', () => ({
    useItemListState: () => ({
        listItems: [],
        createState: mockCreateState,
        updateAllState: mockUpdateAllState,
        deleteAllState: mockDeleteAllState,
    }),
}));

jest.mock('@/components/features/contents/list/hooks/itemList/useItemListActions', () => ({
    useItemListActions: () => ({
        createData: mockCreateData,
        updateData: mockUpdateData,
        updateAllData: mockUpdateAllData,
        deleteAllData: mockDeleteAllData
    }),
}));
jest.mock('@/components/features/contents/list/hooks/useCategorizedItems', () => ({
    useCategorizedItems: () => []
}));
jest.mock('@/components/features/contents/list/utils/itemStatus', () => ({
    getDoneIds: (...args: any[]) => mockGetDoneIds(...args),
    getUndoneIds: (...args: any[]) => mockGetUndoneIds(...args),
}));

// コンテキストラッパー
const renderUseItemList = () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
        const contextValue: ListContextType = {
            listCategories: [],
            categorizedItems: [],
            listItems: [],
            setListItems: jest.fn(),
            error: null,
            setError: mockSetError,
        }

        return (
            <ListContext.Provider value={contextValue}>
                {children}
            </ListContext.Provider>
        )
    }
    return renderHook(() => useItemList(), { wrapper });
}

describe('useItemList', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('create', () => {
        test('DBとStateにアイテムが追加される', async () => {
            const input: ItemFormInput = { name: 'アイテム2', volume: '200', categoryId: 1 };
            const createdItem = { ...input, id: 4, categoryId: 1, isDone: false };
            mockCreateData.mockResolvedValue(createdItem);

            const { result } = renderUseItemList();

            await result.current.create(input);

            expect(mockCreateData).toHaveBeenCalledWith(input);
            expect(mockCreateState).toHaveBeenCalledWith(createdItem);
        })
    })

    describe('update', () => {
        test('DBとStateのアイテムが未完了に変更される', async () => {
            const { result } = renderUseItemList();
            const onFinally = jest.fn();
            const isDone = false;

            await result.current.update(1, isDone, onFinally);

            expect(mockUpdateData).toHaveBeenCalledWith(1, isDone);
            expect(mockUpdateAllState).toHaveBeenCalledWith([1], isDone);
            expect(onFinally).toHaveBeenCalled();
        })

        test('DBとStateのアイテムが完了済みに変更される', async () => {
            const { result } = renderUseItemList();
            const onFinally = jest.fn();
            const isDone = true;

            await result.current.update(1, isDone, onFinally);

            expect(mockUpdateData).toHaveBeenCalledWith(1, isDone);
            expect(mockUpdateAllState).toHaveBeenCalledWith([1], isDone);
            expect(onFinally).toHaveBeenCalled();
        })

        test('例外発生時、エラーをセットする', async () => {
            (mockUpdateData as jest.Mock).mockImplementation(() => {
                throw new Error('update error');
            })

            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.update(1, false, onFinally);

            expect(mockUpdateData).toHaveBeenCalledWith(1, false);
            expect(mockUpdateAllState).not.toHaveBeenCalled();
            expect(mockSetError).toHaveBeenCalledWith('リストアイテムの更新に失敗しました。');
            expect(onFinally).toHaveBeenCalled();
        })
    })

    describe('updateAll', () => {
        test('DBとStateのアイテムが未完了に変更される', async () => {
            const isDone = true;
            const ids = [2, 3];

            (mockGetUndoneIds as jest.Mock).mockReturnValue(ids);
            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.updateAll(isDone, onFinally);

            expect(mockUpdateAllData).toHaveBeenCalledWith(ids, isDone);
            expect(mockUpdateAllState).toHaveBeenCalledWith(ids, isDone);
            expect(onFinally).toHaveBeenCalled();
        })

        test('DBとStateのアイテムが完了済みに変更される', async () => {
            const isDone = false;
            const ids = [1];

            (mockGetDoneIds as jest.Mock).mockReturnValue(ids);
            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.updateAll(isDone, onFinally);

            expect(mockUpdateAllData).toHaveBeenCalledWith(ids, isDone);
            expect(mockUpdateAllState).toHaveBeenCalledWith(ids, isDone);
            expect(onFinally).toHaveBeenCalled();
        })

        test('すでにすべての項目が未完了または完了済みの時、何もしない', async () => {
            (mockGetUndoneIds as jest.Mock).mockReturnValue([]);
            const { result } = renderUseItemList();
            const onFinally = jest.fn();
            const isDone = true;

            await result.current.updateAll(isDone, onFinally);

            expect(mockUpdateAllData).not.toHaveBeenCalled();
            expect(mockUpdateAllState).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })

        test('例外発生時、エラーをセットする', async () => {
            const isDone = true;
            const ids = [2, 3];

            (mockGetUndoneIds as jest.Mock).mockReturnValue(ids);
            (mockUpdateAllData as jest.Mock).mockImplementation(() => {
                throw new Error('updateAll error');
            })

            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.updateAll(isDone, onFinally);

            expect(mockUpdateAllData).toHaveBeenCalledWith(ids, isDone);
            expect(mockUpdateAllState).not.toHaveBeenCalled();
            expect(mockSetError).toHaveBeenCalledWith('リストアイテムの更新に失敗しました。');
            expect(onFinally).toHaveBeenCalled();
        })
    })

    describe('deleteAll', () => {
        test('DBとStateの完了済みアイテムが削除される', async () => {
            const ids = [1];
            (mockGetDoneIds as jest.Mock).mockReturnValue(ids);

            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.deleteAll(onFinally);

            expect(mockDeleteAllData).toHaveBeenCalledWith(ids);
            expect(mockDeleteAllState).toHaveBeenCalledWith(ids);
            expect(onFinally).toHaveBeenCalled();
        })

        test('すでにすべての項目が完了済みの時、何もしない', async () => {
            (mockGetDoneIds as jest.Mock).mockReturnValue([]);
            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.deleteAll(onFinally);

            expect(mockDeleteAllData).not.toHaveBeenCalled();
            expect(mockDeleteAllState).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })

        test('例外発生時、エラーをセットする', async () => {
            const ids = [1];
            (mockGetDoneIds as jest.Mock).mockReturnValue(ids);
            (mockDeleteAllData as jest.Mock).mockImplementation(() => {
                throw new Error('deleteAll error');
            })

            const { result } = renderUseItemList();
            const onFinally = jest.fn();

            await result.current.deleteAll(onFinally);

            expect(mockDeleteAllData).toHaveBeenCalledWith(ids);
            expect(mockDeleteAllState).not.toHaveBeenCalled();
            expect(mockSetError).toHaveBeenCalledWith('リストアイテムの削除に失敗しました。');
            expect(onFinally).toHaveBeenCalled();
        })
    })
})