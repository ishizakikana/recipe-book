import { useCloseOnNavigation } from '@/components/features/common/header/hooks/useCloseOnNavigation';
import { renderHook } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}))

describe('useCloseOnNavigation', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('pathname が変更されたとき、処理が実行される', () => {
        const pathnames = ['/initial', '/changed'];
        let callIdx = 0;

        (usePathname as jest.Mock).mockImplementation(() => pathnames[callIdx]);

        const { rerender } = renderHook(() => useCloseOnNavigation(mockOnClose));

        // 初回は実行されない
        expect(mockOnClose).not.toHaveBeenCalled();

        // パス変更で処理が実行される
        callIdx = 1;
        rerender();

        expect(mockOnClose).toHaveBeenCalledTimes(1);

        // 同じパスにいる場合は実行されない
        rerender();
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    })
})