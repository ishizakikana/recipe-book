// mock
const mockHandleApi = jest.fn();;
const mockGetRequestParams = jest.fn();
const mockFindById = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
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
jest.mock('@/lib/constants/messages', () => ({
    ERROR_MESSAGES: {
        NOT_FOUND: 'Not Found',
    },
    formatMessage: (_msg: string, _entity: string) => {
        return 'Not Found';
    },
}));

import { GET } from '@/app/api/user/find/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/recipe-category/find GET', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
    });

    test('レシピカテゴリーリストを取得し、200レスポンスを返す', async () => {
        const user = { id: '1', name: 'ユーザー1' };
        const mockRes = { user, status: 200 };

        const req = {} as unknown as NextRequest;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            searchParams: new Map([['id', user.id]])
        });
        (mockFindById as jest.Mock).mockResolvedValue(user);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindById).toHaveBeenCalledWith(user.id);
        expect(NextResponse.json).toHaveBeenCalledWith(user, { status: 200 });
        expect(res).toBe(mockRes);
    })

    test('存在しないidを指定してユーザーを取得し、404レスポンスを返す', async () => {
        const mockRes = { message: 'Not Found', status: 404 };

        const req = {} as unknown as NextRequest;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            searchParams: new Map([['id', '999']])
        });
        (mockFindById as jest.Mock).mockResolvedValue(null);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindById).toHaveBeenCalledWith('999');
        expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Not Found' }, { status: 404 });
        expect(res).toBe(mockRes);
    })
})