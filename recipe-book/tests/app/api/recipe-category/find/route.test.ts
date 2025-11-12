// mock
const mockHandleApi = jest.fn();;
const mockGetRequestParams = jest.fn();
const mockFindAll = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
}));
jest.mock('@/lib/server/repositories/recipeCategoryRepository', () => ({
    recipeCategoryRepository: {
        findAll: mockFindAll,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { GET } from '@/app/api/recipe-category/find/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/recipe-category/find GET', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
    });

    test('レシピカテゴリーリストを取得し、200レスポンスを返す', async () => {
        const categories = [{ id: '1', name: 'カテゴリー1' }, { id: '2', name: 'カテゴリー2' }];
        const mockRes = { categories, status: 200 };

        const req = {} as unknown as NextRequest;

        (mockGetRequestParams as jest.Mock).mockReturnValue({});
        (mockFindAll as jest.Mock).mockResolvedValue(categories);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindAll).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(categories, { status: 200 });
        expect(res).toBe(mockRes);
    })
})