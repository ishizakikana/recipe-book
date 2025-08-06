import { apiPost } from '@/lib/fetch';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useLoginForm } from '../useLoginForm';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

jest.mock('@/lib/fetch', () => ({
    apiPost: jest.fn()
}))

const mockPush = jest.fn();

describe('useLoginForm', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush
        })
    })

    describe('onSubmit', () => {
        test('処理が成功したとき、レシピ一覧に画面遷移する', async () => {
            (apiPost as jest.Mock).mockResolvedValueOnce({});

            const { result } = renderHook(() => useLoginForm());

            await act(async () => {
                result.current.onLogin({
                    userId: 'testUser',
                    password: 'testPassword'
                } as any);
            })

            expect(apiPost).toHaveBeenCalledWith('/auth/login', {
                userId: 'testUser',
                password: 'testPassword'
            });
            expect(mockPush).toHaveBeenCalledWith('/recipe');
        })
    })

    test('処理が失敗したとき、エラーメッセージを設定する', async () => {
        const errorMsg = 'ログインエラー';
        (apiPost as jest.Mock).mockRejectedValueOnce(new Error(errorMsg));

        const { result } = renderHook(() => useLoginForm());

        await act(async () => {
            result.current.onLogin({
                userId: 'testUser',
                password: 'testPassword'
            } as any);
        })

        expect(result.current.submitError).toBe(errorMsg);
        expect(mockPush).not.toHaveBeenCalled();
    })

    test('予期しない型のエラーがスローされたとき、unknown エラーメッセージを設定する', async () => {
        (apiPost as jest.Mock).mockRejectedValueOnce('Unexpected error');

        const { result } = renderHook(() => useLoginForm());

        await act(async () => {
            result.current.onLogin({
                userId: 'testUser',
                password: 'testPassword'
            } as any);
        })

        expect(result.current.submitError).toBe('予期せぬエラーが発生しました。');
        expect(mockPush).not.toHaveBeenCalled();
    })

    test('バリデーションエラーがあるとき、エラーメッセージを設定する', async () => {
        const { result } = renderHook(() => useLoginForm());

        await act(async () => {
            result.current.onSubmit();
        });

        expect(result.current.formErrors?.userId?.message).toBe('Required');
        expect(result.current.formErrors?.password?.message).toBe('Required');
    })
})