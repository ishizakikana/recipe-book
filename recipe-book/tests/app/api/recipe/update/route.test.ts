// mock
const mockHandleApi = jest.fn();;
const mockGetRequestParams = jest.fn();
const mockUpdate = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
}));
jest.mock('@/lib/server/repositories/recipeRepository', () => ({
    recipeRepository: {
        update: mockUpdate,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { POST } from '@/app/api/recipe/update/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/list-item/update POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
    });

    test('レシピ情報を更新し、200レスポンスを返す', async () => {
        const form = { id: 1, name: 'Recipe 1' };
        const result = { id: 1, name: 'Recipe 1 updated' };
        const mockRes = { result, status: 200 };

        const req = {
            json: async () => ({
                data: result
            })
        } as unknown as NextRequest;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            json: { data: form }
        });
        (mockUpdate as jest.Mock).mockResolvedValue(result);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await POST(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalledWith(form);
        expect(NextResponse.json).toHaveBeenCalledWith(result, { status: 200 });
        expect(res).toBe(mockRes);
    })
})