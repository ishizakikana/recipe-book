// mock
const mockHandleApi = jest.fn();
const mockCreate = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi
}));
jest.mock('@/lib/server/repositories/listItemRepository', () => ({
    listItemRepository: {
        create: mockCreate,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { POST } from '@/app/api/list-item/create/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/list-item/create POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('リストアイテムを複数作成して、200レスポンスを返す', async () => {
        const mockItems = [{ id: '1', name: 'item 1' }, { id: '2', name: 'item 2' }];
        const mockRes = { mockItems, status: 200 };
        const req = {
            json: async () => ({
                datalist: [
                    { data: { id: '1', name: 'item 1' } },
                    { data: { id: '2', name: 'item 2' } },
                ]
            })
        } as unknown as NextRequest;

        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockCreate as jest.Mock).mockImplementation((data) => Promise.resolve(data));
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItems, { status: 200 });
        expect(res).toBe(mockRes);
    })

    test('リストアイテムを単体作成して、200レスポンスを返す', async () => {
        const mockItem = { id: '1', name: 'item 1' };
        const mockRes = { mockItem, status: 200 };
        const req = {
            json: async () => ({
                data: { id: '1', name: 'item 1' }
            })
        } as unknown as NextRequest;

        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);
        (mockCreate as jest.Mock).mockImplementation((data) => Promise.resolve(data));
        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItem, { status: 200 });
        expect(res).toBe(mockRes);
    })
})