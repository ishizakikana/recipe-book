import { COOKIE_KEYS, deleteCookie, getCookie, setCookie } from '@/lib/server/cookie';
import { cookies } from 'next/headers';

function createMockResponse() {
    const headers = new Map<string, string>();

    return {
        headers: {
            append: (key: string, value: string) => {
                headers.set(key, value);
            },
            get: (key: string) => {
                return headers.get(key) ?? null;
            },
            // iterable な headers にするための実装
            [Symbol.iterator]() {
                return headers[Symbol.iterator]();
            }
        }
    } as unknown as Response;
}

jest.mock('cookie', () => ({
    serialize: (key: string, value: string) => `serialized-${key}-${value}`
}))

jest.mock('next/headers', () => ({
    cookies: jest.fn()
}))

describe('cookie', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('setCookie', () => {
        test('cookieをセットする', () => {
            const res = createMockResponse();
            const result = setCookie(res, COOKIE_KEYS.AUTH_TOKEN, 'test token');

            expect(result.headers.get('Set-Cookie')).toBe('serialized-auth_token-test token');
        })
    })

    describe('getCookie', () => {
        test('cookieを取得する', async () => {
            (cookies as jest.Mock).mockReturnValueOnce({
                get: (key: string) => {
                    return key === COOKIE_KEYS.AUTH_TOKEN ? { value: 'test token' } : null;
                }
            })

            const result = await getCookie(COOKIE_KEYS.AUTH_TOKEN);
            expect(result).toEqual('test token');
        })

        test('cookieが存在しないとき、nullを返す', async () => {
            (cookies as jest.Mock).mockReturnValueOnce({
                get: () => { return null; }
            })

            const result = await getCookie(COOKIE_KEYS.AUTH_TOKEN);
            expect(result).toBe(null);
        })
    })

    describe('deleteCookie', () => {
        test('cookieを削除する', async () => {
            const res = createMockResponse();
            const result = await deleteCookie(res, COOKIE_KEYS.AUTH_TOKEN);
            expect(result.headers.get('Set-Cookie')).toBe('serialized-auth_token-');
        })
    })

})