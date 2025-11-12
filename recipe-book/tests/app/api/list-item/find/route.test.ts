// mock
const mockHandleApi = jest.fn();
const mockGetRequestParams = jest.fn();
const mockFindAll = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
}));
jest.mock('@/lib/server/repositories/listItemRepository', () => ({
    listItemRepository: {
        findAll: mockFindAll,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { GET } from '@/app/api/list-item/find/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/list-item/find GET', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('リストアイテムをすべて取得し、200レスポンスを返す', async () => {
        const mockItems = [{ id: 1, name: 'item 1' }, { id: 2, name: 'item 2' }];
        const mockRes = { mockItems, status: 200 };
        const req = {} as unknown as NextRequest;

        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
        (mockGetRequestParams as jest.Mock).mockReturnValue({});
        (mockFindAll as jest.Mock).mockResolvedValue(mockItems);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItems, { status: 200 });
        expect(res).toBe(mockRes);
    })
})