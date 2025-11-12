// mock
const mockHandleApi = jest.fn();
const mockDeleteCookie = jest.fn();

jest.mock('@/lib/server/api', () => ({ handleApi: mockHandleApi }));
jest.mock('@/lib/server/cookie', () => ({
    deleteCookie: mockDeleteCookie,
    COOKIE_KEYS: { AUTH_TOKEN: 'Authentication token' },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { GET } from '@/app/api/auth/logout/route';
import { NextResponse } from 'next/server';

describe('/api/auth/logout GET', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Cookieからユーザーデータを削除して、200レスポンスを返す', async () => {
        const mockRes = { status: 200 };
        const req = {} as unknown as Request;

        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockDeleteCookie as jest.Mock).mockReturnValue(mockRes);
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({}, { status: 200 });
        expect(mockDeleteCookie).toHaveBeenCalledWith(mockRes, expect.any(String));
        expect(res).toBe(mockRes);
    })
})