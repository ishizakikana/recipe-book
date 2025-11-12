// mock
const mockHandleApi = jest.fn();
const mockGetRequestParams = jest.fn();
const mockFindAll = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
}));
jest.mock('@/lib/server/repositories/listCategoryRepository', () => ({
    listCategoryRepository: {
        findAll: mockFindAll,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { GET } from '@/app/api/list-category/find/route';
import { NextResponse } from 'next/server';

describe('/api/list-category/find GET', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('リストカテゴリリストを取得して、200レスポンスを返す', async () => {
        const mockCategories = [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }];
        const mockRes = { mockCategories, status: 200 };
        const req = {} as unknown as Request;

        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockFindAll as jest.Mock).mockReturnValue(mockCategories);
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockCategories, { status: 200 });
        expect(res).toBe(mockRes);
    })
})