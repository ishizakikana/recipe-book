import { apiPost } from '@/lib/fetch';
import { act, renderHook } from '@testing-library/react';
import { CategorizedItem } from '../../types';
import { getDoneIds, getUndoneIds } from '../../utils/itemStatus';
import { useItemListActions } from '../useItemListActions';

jest.mock('@lib/fetch');
jest.mock('../../utils/itemStatus');

const mockedApiPost = apiPost as jest.MockedFunction<typeof apiPost>;
const mockedGetDoneIds = getDoneIds as jest.MockedFunction<typeof getDoneIds>;
const mockedGetUndoneIds = getUndoneIds as jest.MockedFunction<typeof getUndoneIds>;

describe('useItemListActions', () => {
    const mockData: CategorizedItem[] = [
        {
            category: { id: 1, name: 'A', icon: '', color: '' },
            items: [
                { id: 1, name: 'アイテム1', volume: '100', recipeName: 'レシピ1', categoryId: 1, isDone: true },
                { id: 2, name: 'アイテム2', volume: '200', recipeName: 'レシピ2', categoryId: 1, isDone: false }
            ]
        },
        {
            category: { id: 2, name: 'B', icon: '', color: '' },
            items: [
                { id: 3, name: 'アイテム3', volume: '300', recipeName: 'レシピ3', categoryId: 2, isDone: true },
                { id: 4, name: 'アイテム4', volume: '400', recipeName: 'レシピ4', categoryId: 2, isDone: false },
                { id: 5, name: 'アイテム5', volume: '500', recipeName: 'レシピ5', categoryId: 2, isDone: true },
            ]
        },
    ]

    let stateActions: {
        add: jest.Mock;
        modifyAll: jest.Mock;
        removeAll: jest.Mock;
    };

    let setError: jest.Mock;

    beforeEach(() => {
        stateActions = {
            add: jest.fn(),
            modifyAll: jest.fn(),
            removeAll: jest.fn(),
        }
        setError = jest.fn();
        jest.clearAllMocks();
    });

    describe('create', () => {
        test('リストアイテムを作成する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const newItem = { id: 6, name: 'アイテム6', volume: '600', recipeName: 'レシピ6', categoryId: 3, isDone: true };

            mockedApiPost.mockResolvedValue(newItem);

            await act(async () => {
                await result.current.create(newItem);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/create', { data: newItem });
            expect(stateActions.add).toHaveBeenCalledWith(newItem);
            expect(setError).not.toHaveBeenCalled();
        })

        test('カテゴリが未選択のとき、その他（6）として登録する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const newItem = { id: 6, name: 'アイテム6', volume: '600', recipeName: 'レシピ6', categoryId: 0, isDone: true };

            mockedApiPost.mockResolvedValue(newItem);

            await act(async () => {
                await result.current.create(newItem);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/create', { data: { ...newItem, categoryId: 6 } });
        })

        test('エラーが発生したとき、エラーをスローする', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const newItem = { id: 6, name: 'アイテム6', volume: '600', recipeName: 'レシピ6', categoryId: 3, isDone: true };

            mockedApiPost.mockRejectedValue(new Error('エラー'));

            await expect(
                act(async () => {
                    await result.current.create(newItem);
                })
            ).rejects.toThrow('エラー');
            expect(stateActions.add).not.toHaveBeenCalled();
        })
    })

    describe('update', () => {
        test('リストアイテムを完了済みに更新する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const isDone = true;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.update(2, isDone, onFinally);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: 2, data: { isDone: isDone } });
            expect(stateActions.modifyAll).toHaveBeenCalledWith([2], isDone);
            expect(onFinally).toHaveBeenCalled();
        })

        test('リストアイテムを未完了に更新する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const isDone = false;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.update(1, isDone, onFinally);
            })

            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: 1, data: { isDone: isDone } });
            expect(stateActions.modifyAll).toHaveBeenCalledWith([1], isDone);
            expect(onFinally).toHaveBeenCalled();
        })

        test('エラーが発生したとき、setError を呼び出す', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));

            mockedApiPost.mockRejectedValue(new Error('エラー'));
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.update(1, true, onFinally);
            })

            expect(stateActions.modifyAll).not.toHaveBeenCalled();
            expect(setError).toHaveBeenCalledWith('リストアイテムの更新に失敗しました。');
            expect(onFinally).toHaveBeenCalled();
        })
    })

    describe('updateAll', () => {
        test('複数のリストアイテムを完了済みに更新する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const ids = [1, 2];
            const isDone = true;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            mockedGetUndoneIds.mockReturnValue(ids);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.updateAll(isDone, onFinally);
            })

            expect(mockedGetUndoneIds).toHaveBeenCalledWith(mockData);
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[0], data: { isDone: isDone } });
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[1], data: { isDone: isDone } });
            expect(stateActions.modifyAll).toHaveBeenCalledWith(ids, isDone);
            expect(setError).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })

        test('複数のリストアイテムを未完了に更新する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const ids = [1, 2];
            const isDone = false;

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            mockedGetDoneIds.mockReturnValue(ids);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.updateAll(isDone, onFinally);
            })

            expect(mockedGetDoneIds).toHaveBeenCalledWith(mockData);
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[0], data: { isDone: isDone } });
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/update', { id: ids[1], data: { isDone: isDone } });
            expect(stateActions.modifyAll).toHaveBeenCalledWith(ids, isDone);
            expect(setError).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })

        test('対象となるリストアイテムが0件のとき、何もしない', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const ids: number[] = [];

            mockedGetDoneIds.mockReturnValue(ids);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.updateAll(false, onFinally);
            })

            expect(mockedGetDoneIds).toHaveBeenCalledWith(mockData);
            expect(mockedApiPost).not.toHaveBeenCalled();
            expect(stateActions.modifyAll).not.toHaveBeenCalled();
            expect(setError).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })

        test('エラーが発生したとき、setError を呼び出す', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));

            mockedApiPost.mockRejectedValue(new Error('エラー'));
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.updateAll(true, onFinally);
            })

            expect(stateActions.modifyAll).not.toHaveBeenCalled();
            expect(setError).toHaveBeenCalledWith('リストアイテムの更新に失敗しました。');
            expect(onFinally).toHaveBeenCalled();
        })
    })

    describe('deleteAll', () => {
        test('完了済みリストアイテムをすべて削除する', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const ids = [1, 2];

            mockedApiPost.mockResolvedValue(undefined); // 何も返さない
            mockedGetDoneIds.mockReturnValue(ids);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.deleteAll(onFinally);
            })

            expect(mockedGetDoneIds).toHaveBeenCalledWith(mockData);
            expect(mockedApiPost).toHaveBeenCalledWith('/list-item/delete', { ids: ids });
            expect(stateActions.removeAll).toHaveBeenCalledWith(ids);
            expect(setError).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })

        test('対象となるリストアイテムが0件のとき、何もしない', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));
            const ids: number[] = [];

            mockedGetDoneIds.mockReturnValue(ids);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.deleteAll(onFinally);
            })

            expect(mockedGetDoneIds).toHaveBeenCalledWith(mockData);
            expect(mockedApiPost).not.toHaveBeenCalled();
            expect(stateActions.modifyAll).not.toHaveBeenCalled();
            expect(setError).not.toHaveBeenCalled();
            expect(onFinally).toHaveBeenCalled();
        })


        test('エラーが発生したとき、setError を呼び出す', async () => {
            const { result } = renderHook(() => useItemListActions(mockData, stateActions, setError));

            mockedApiPost.mockRejectedValue(new Error('エラー'));
            mockedGetDoneIds.mockReturnValue([1]);
            const onFinally = jest.fn();

            await act(async () => {
                await result.current.deleteAll(onFinally);
            })

            expect(stateActions.removeAll).not.toHaveBeenCalled();
            expect(setError).toHaveBeenCalledWith('リストアイテムの削除に失敗しました。');
            expect(onFinally).toHaveBeenCalled();
        })
    })
})