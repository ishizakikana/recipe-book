// モック
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
    redirect: mockRedirect
}))

jest.mock('@/lib/server/token', () => ({
    getUserFromAuthToken: jest.fn(() => Promise.resolve({ id: '1', name: 'test user' }))
}))

import ContentsLayout from '@/app/(contents)/layout';
import { getUserFromAuthToken } from '@/lib/server/token';
import { ReactNode } from 'react';

describe('contentsLayout', () => {
    const mockChildren: ReactNode = (<div>content</div>)

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('未ログインのとき、ログイン画面を表示する', async () => {
        (getUserFromAuthToken as jest.Mock).mockResolvedValueOnce(null);

        await ContentsLayout({ children: mockChildren });

        expect(getUserFromAuthToken).toHaveBeenCalled();
        expect(mockRedirect).toHaveBeenCalledWith('/login');
    })

    test('ログイン済みのとき、レシピ一覧画面を表示する', async () => {
        const result = await ContentsLayout({ children: mockChildren });

        expect(getUserFromAuthToken).toHaveBeenCalled();
        expect(result).toBeTruthy();
        expect(JSON.stringify(result)).toContain('content');
        expect(mockRedirect).not.toHaveBeenCalled();
    })
})