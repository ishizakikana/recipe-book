// mock
const mockVerifyToken = jest.fn();

jest.mock('../src/lib/server/auth', () => ({
    verifyToken: mockVerifyToken,
}));

jest.mock('../src/lib/server/cookie', () => ({
    COOKIE_KEYS: { AUTH_TOKEN: 'auth_token' },
}));

jest.mock('next/server', () => ({
    NextResponse: {
        redirect: jest.fn(),
        next: jest.fn(),
    },
    NextRequest: jest.fn(),
}));

import { NextResponse } from 'next/server';
import { middleware } from '../src/middleware';

describe('middleware', () => {
    const mockUrl = 'https://example.com';
    const mockNextResponse = { redirected: true };
    const mockNext = { continued: true };

    beforeEach(() => {
        jest.clearAllMocks();
        (NextResponse.redirect as jest.Mock).mockReturnValue(mockNextResponse);
        (NextResponse.next as jest.Mock).mockReturnValue(mockNext);
    });

    const createMockRequest = (pathname: string, tokenValue?: string) => {
        const cookies = new Map<string, { value: string }>();
        if (tokenValue) cookies.set('auth_token', { value: tokenValue });

        return {
            nextUrl: { pathname },
            url: `${mockUrl}${pathname}`,
            cookies: {
                get: (key: string) => cookies.get(key),
            },
        } as unknown as any;
    };

    test('ログイン済みユーザーが /login にアクセス → /recipe にリダイレクトされる', async () => {
        const req = createMockRequest('/login', 'valid-token');
        mockVerifyToken.mockResolvedValue({ userId: 123 });

        const res = await middleware(req);

        expect(mockVerifyToken).toHaveBeenCalledWith('valid-token');
        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/recipe', req.url));
        expect(res).toBe(mockNextResponse);
    });

    test('未ログインユーザーがコンテンツページにアクセス → /login にリダイレクトされる', async () => {
        const req = createMockRequest('/recipe');
        mockVerifyToken.mockResolvedValue(null);

        const res = await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', req.url));
        expect(res).toBe(mockNextResponse);
    });

    test('ログインページ以外の許可パス、またはトップページはそのまま通過する', async () => {
        const req1 = createMockRequest('/');
        const req2 = createMockRequest('/login');
        mockVerifyToken.mockResolvedValue(null);

        const res1 = await middleware(req1);
        const res2 = await middleware(req2);

        expect(NextResponse.next).toHaveBeenCalledTimes(2);
        expect(res1).toBe(mockNext);
        expect(res2).toBe(mockNext);
    });
});
