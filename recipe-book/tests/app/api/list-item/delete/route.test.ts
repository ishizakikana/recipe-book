// mock
const mockHandleApi = jest.fn();
const mockDelete = jest.fn();
const mockDeleteAll = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi
}));
jest.mock('@/lib/server/repositories/listItemRepository', () => ({
    listItemRepository: {
        delete: mockDelete,
        deleteAll: mockDeleteAll,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { POST } from '@/app/api/list-item/delete/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/list-item/delete POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('リストアイテムを複数削除して、200レスポンスを返す', async () => {
        const mockItemNumbers = [1, 2];
        const mockRes = { mockItemNumbers, status: 200 };
        const req = {
            json: async () => ({
                ids: [1, 2]
            })
        } as unknown as NextRequest;

        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockDeleteAll as jest.Mock).mockImplementation((data) => Promise.resolve(data));
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItemNumbers, { status: 200 });
        expect(res).toBe(mockRes);
    })

    test('リストアイテムを単体作成して、200レスポンスを返す', async () => {
        const mockItemNumber = 1;
        const mockRes = { mockItemNumber, status: 200 };
        const req = {
            json: async () => ({
                id: 1
            })
        } as unknown as NextRequest;

        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockDelete as jest.Mock).mockImplementation((data) => Promise.resolve(data));
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItemNumber, { status: 200 });
        expect(res).toBe(mockRes);
    })
})