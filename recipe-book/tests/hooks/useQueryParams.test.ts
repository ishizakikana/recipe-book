import { useQueryParams } from '@/hooks/useQueryParams';
import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn()
}))

describe('useQueryParams', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('クエリパラメータが null のとき、空のオブジェクトを返す', () => {
        (useSearchParams as jest.Mock).mockReturnValue(null);

        const { result } = renderHook(() => useQueryParams<{ id: string, name: string }>());
        const params = result.current.getParams();

        expect(params).toEqual({});
    })

    test('クエリパラメータが存在するとき、オブジェクトで返す', () => {
        const mockSearchParams = new Map<string, string>([
            ['id', '123'],
            ['name', 'test']
        ]);
        (useSearchParams as jest.Mock).mockImplementation(() => ({
            forEach: (callback: (value: string, key: string) => void) => {
                mockSearchParams.forEach((value, key) => {
                    callback(value, key);
                });
            }
        }));

        const { result } = renderHook(() => useQueryParams<{ id: string, name: string }>());
        const params = result.current.getParams();

        expect(params).toEqual({ id: '123', name: 'test' });
    })
})