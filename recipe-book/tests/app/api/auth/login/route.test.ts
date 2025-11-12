// mock
const mockHandleApi = jest.fn();
const mockSignToken = jest.fn();
const mockSetCookie = jest.fn();
const mockFindById = jest.fn();

jest.mock('@/lib/server/api', () => ({ handleApi: mockHandleApi }));
jest.mock('@/lib/server/auth', () => ({ signToken: mockSignToken }));
jest.mock('@/lib/server/cookie', () => ({
    setCookie: mockSetCookie,
    COOKIE_KEYS: { AUTH_TOKEN: 'Authentication token' },
}));
jest.mock('@/lib/server/repositories/userRepository', () => ({
    userRepository: {
        findById: mockFindById,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { POST } from '@/app/api/auth/login/route';
import { NextResponse } from 'next/server';

describe('/api/auth/login POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('ユーザー認証に成功したとき、トークンをCookieに保存して200レスポンスを返す', async () => {
        const mockUser = { id: 'test', password: 'password' };
        const mockRes = { status: 200 };
        const req = {
            json: async () => ({ userId: 'test', password: 'password' }),
        } as unknown as Request;

        (mockFindById as jest.Mock).mockResolvedValue(mockUser);
        (mockSignToken as jest.Mock).mockResolvedValue('mocked-jwt-token');
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockSetCookie as jest.Mock).mockReturnValue(mockRes);
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindById).toHaveBeenCalledWith('test');
        expect(mockSignToken).toHaveBeenCalledWith({ userId: 'test' });
        expect(NextResponse.json).toHaveBeenCalledWith({}, { status: 200 });
        expect(mockSetCookie).toHaveBeenCalledWith(mockRes, expect.any(String), 'mocked-jwt-token');
        expect(res).toBe(mockRes);
    })

    test('ユーザー認証に失敗したとき、401レスポンスを返す', async () => {
        const mockRes = { status: 401 };
        const req = {
            json: async () => ({ userId: 'test', password: 'password' }),
        } as unknown as Request;

        (mockFindById as jest.Mock).mockResolvedValue(null);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindById).toHaveBeenCalledWith('test');
        expect(NextResponse.json).toHaveBeenCalledWith({ message: expect.any(String) }, { status: 401 });
        expect(res).toBe(mockRes);
    })
})