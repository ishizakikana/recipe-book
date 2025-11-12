// mock
const mockHandleApi = jest.fn();
const mockUpdate = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi
}));
jest.mock('@/lib/server/repositories/listItemRepository', () => ({
    listItemRepository: {
        update: mockUpdate,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { POST } from '@/app/api/list-item/update/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/list-item/update POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
    });

    test('リストアイテムを複数更新して、200レスポンスを返す', async () => {
        const mockItems = [{ id: 1, name: 'Item 1 updated' }, { id: 2, name: 'Item 2 updated' }];
        const mockRes = { mockItems, status: 200 };
        const req = {
            json: async () => ({
                datalist: [{ id: 1, data: { id: 1, name: 'Item 1' } }, { id: 2, data: { id: 2, name: 'Item 2' } }]
            })
        } as unknown as NextRequest;

        (mockUpdate as jest.Mock).mockImplementation((_, data) => {
            const updated = { id: data.id, name: data.name + ' updated' };
            return Promise.resolve(updated)
        });
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItems, { status: 200 });
        expect(res).toBe(mockRes);
    })

    test('リストアイテムを単体作成して、200レスポンスを返す', async () => {
        const mockItem = { id: 1, name: 'Item 1 updated' };
        const mockRes = { mockItem, status: 200 };
        const req = {
            json: async () => ({
                id: 1,
                data: { id: 1, name: 'Item 1' }
            })
        } as unknown as NextRequest;

        (mockUpdate as jest.Mock).mockImplementation((_, data) => Promise.resolve({ id: data.id, name: data.name + ' updated' }));
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockItem, { status: 200 });
        expect(res).toBe(mockRes);
    })
})