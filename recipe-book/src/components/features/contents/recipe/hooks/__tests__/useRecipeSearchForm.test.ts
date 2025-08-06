import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { act } from 'react';
import { buildSearchQuery } from '../../utils/searchQuery';
import { useRecipeSearchForm } from '../useRecipeSearchForm';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

jest.mock('../../utils/searchQuery', () => ({
    buildSearchQuery: jest.fn(),
}))

const mockPush = jest.fn();

describe('useRecipeSearchForm', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    })

    describe('search', () => {
        test('クエリ文字列を生成し、router.pushを実行する', async () => {
            const mockQuery = '/recipe?keyword=test&categoryIds=1,2';
            (buildSearchQuery as jest.Mock).mockReturnValue(mockQuery);

            const { result } = renderHook(() => useRecipeSearchForm({
                searchInput: {
                    keyword: 'test',
                    categoryIds: [1, 2]
                }
            }))

            await act(async () => {
                await result.current.onSubmit();
            })

            expect(buildSearchQuery).toHaveBeenCalledWith({
                keyword: 'test',
                categoryIds: [1, 2]
            });

            expect(mockPush).toHaveBeenCalledWith(mockQuery);
            expect(result.current.submitError).toBeNull();
        })

        test('エラーが発生したとき、submitErrorにエラーメッセージを設定する', async () => {
            (buildSearchQuery as jest.Mock).mockImplementation(() => {
                throw new Error();
            });

            const { result } = renderHook(() => useRecipeSearchForm({
                searchInput: {
                    keyword: 'test',
                    categoryIds: [1, 2]
                }
            }))

            await act(async () => {
                await result.current.onSubmit();
            })

            expect(result.current.submitError).toBe('レシピの検索に失敗しました。');
        })

        test('未知のエラーが発生したとき、submitErrorに不明なエラーのメッセージを設定する', async () => {
            (buildSearchQuery as jest.Mock).mockImplementation(() => {
                throw 'Unknown error';
            });

            const { result } = renderHook(() => useRecipeSearchForm({
                searchInput: {
                    keyword: 'test',
                    categoryIds: [1, 2]
                }
            }))

            await act(async () => {
                await result.current.onSubmit();
            })

            expect(result.current.submitError).toBe('予期せぬエラーが発生しました。');
        })
    })
})