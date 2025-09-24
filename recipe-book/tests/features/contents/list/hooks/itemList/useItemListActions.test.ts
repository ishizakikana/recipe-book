import { useItemListActions } from '@/components/features/contents/list/hooks/itemList/useItemListActions';
import { getDoneIds, getUndoneIds } from '@/components/features/contents/list/utils/itemStatus';
import { apiPost } from '@/lib/client/fetch';
import { act, renderHook } from '@testing-library/react';

jest.mock('@lib/client/fetch');
jest.mock('@/components/features/contents/list/utils/itemStatus');

const mockedApiPost = apiPost as jest.MockedFunction<typeof apiPost>;
const mockedGetDoneIds = getDoneIds as jest.MockedFunction<typeof getDoneIds>;
const mockedGetUndoneIds = getUndoneIds as jest.MockedFunction<typeof getUndoneIds>;

describe('useItemListActions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        test('リストアイテムを作成する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const newItem = { id: 6, name: 'アイテム6', volume: '600', recipeName: 'レシピ6', categoryId: 3, isDone: true };

            mockedApiPost.mockResolvedValue(newItem);

            await act(async () => {
                await result.current.createData(newItem);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/create', { data: newItem });
        })

        test('カテゴリが未選択のとき、その他（6）として登録する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const newItem = { id: 6, name: 'アイテム6', volume: '600', recipeName: 'レシピ6', categoryId: 0, isDone: true };

            mockedApiPost.mockResolvedValue(newItem);

            await act(async () => {
                await result.current.createData(newItem);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/create', { data: { ...newItem, categoryId: 6 } });
        })
    })

    describe('update', () => {
        test('リストアイテムを完了済みに更新する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const isDone = true;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない

            await act(async () => {
                await result.current.updateData(2, isDone);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: 2, data: { isDone: isDone } });
        })

        test('リストアイテムを未完了に更新する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const isDone = false;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない

            await act(async () => {
                await result.current.updateData(1, isDone);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: 1, data: { isDone: isDone } });
        })
    })

    describe('updateAll', () => {
        test('複数のリストアイテムを完了済みに更新する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const ids = [1, 2];
            const isDone = true;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            mockedGetUndoneIds.mockReturnValue(ids);

            await act(async () => {
                await result.current.updateAllData(ids, isDone);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[0], data: { isDone: isDone } });
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[1], data: { isDone: isDone } });
        })

        test('複数のリストアイテムを未完了に更新する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const ids = [1, 2];
            const isDone = false;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            mockedGetDoneIds.mockReturnValue(ids);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.updateAllData(ids, isDone);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[0], data: { isDone: isDone } });
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[1], data: { isDone: isDone } });
        })
    })

    describe('deleteAll', () => {
        test('完了済みリストアイテムをすべて削除する', async () => {
            const { result } = renderHook(() => useItemListActions());
            const ids = [1, 2];

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            mockedGetDoneIds.mockReturnValue(ids);

            await act(async () => {
                await result.current.deleteAllData(ids);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/delete', { ids: ids });
        })
    })
})