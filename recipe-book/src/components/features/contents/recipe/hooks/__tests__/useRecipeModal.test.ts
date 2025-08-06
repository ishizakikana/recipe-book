import { renderHook } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { useRecipeModal } from '../useRecipeModal';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}));

const mockBack = jest.fn();

describe('useRecipeModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    });

    describe('open', () => {
        test('最後のURLセグメントが数字のとき、モーダル画面を表示する', () => {
            (usePathname as jest.Mock).mockReturnValue('/recipe/123');

            const { result } = renderHook(() => useRecipeModal());

            expect(result.current.open).toBe(true);
        })

        test('最後のURLセグメントが数字でないとき、モーダル画面を非表示にする', () => {
            (usePathname as jest.Mock).mockReturnValue('/recipe/abc');

            const { result } = renderHook(() => useRecipeModal());

            expect(result.current.open).toBe(false);
        })
    })

    describe('onClose', () => {
        test('モーダルを閉じるとき、router.back()を実行する', () => {
            (usePathname as jest.Mock).mockReturnValue('/recipe/123');

            const { result } = renderHook(() => useRecipeModal());

            result.current.onClose();

            expect(mockBack).toHaveBeenCalled();
        })
    })
})