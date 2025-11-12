// mock
const mockHandleApi = jest.fn();;
const mockGetRequestParams = jest.fn();
const mockFindRecipeDetailById = jest.fn();
const mockFindAllRecipeSummariesByConditions = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
}));
jest.mock('@/lib/server/repositories/recipeRepository', () => ({
    recipeRepository: {
        findRecipeDetailById: mockFindRecipeDetailById,
        findAllRecipeSummariesByConditions: mockFindAllRecipeSummariesByConditions,
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
    formatMessage: (msg: string, _param: string) => msg,
}));

import { GET } from '@/app/api/recipe/find/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/list-item/update POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
    });

    test('idを指定してレシピを取得し、200レスポンスを返す', async () => {
        const result = { id: 1, name: 'Recipe 1' };
        const mockRes = { result, status: 200 };

        const req = {
            json: async () => ({
                datalist: [{ id: 1, data: { id: 1, name: 'Item 1' } }, { id: 2, data: { id: 2, name: 'Item 2' } }]
            })
        } as unknown as NextRequest;

        const targetId = 1;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            searchParams: new URLSearchParams({ id: targetId.toString() })
        });
        (mockFindRecipeDetailById as jest.Mock).mockResolvedValue(result);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindRecipeDetailById).toHaveBeenCalledWith(targetId);
        expect(NextResponse.json).toHaveBeenCalledWith(result, { status: 200 });
        expect(res).toBe(mockRes);
    })

    test('存在しないidを指定してレシピを取得し、404レスポンスを返す', async () => {
        const mockRes = { message: 'Not Found', status: 404 };

        const req = {
            json: async () => ({
                datalist: [{ id: 1, data: { id: 1, name: 'Item 1' } }, { id: 2, data: { id: 2, name: 'Item 2' } }]
            })
        } as unknown as NextRequest;

        const targetId = 1;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            searchParams: new URLSearchParams({ id: targetId.toString() })
        });
        (mockFindRecipeDetailById as jest.Mock).mockResolvedValue(null);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindRecipeDetailById).toHaveBeenCalledWith(targetId);
        expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Not Found' }, { status: 404 });
        expect(res).toBe(mockRes);
    })

    test('conditionsを指定してレシピを複数取得し、200レスポンスを返す', async () => {
        const results = [
            { id: 1, name: 'Recipe 1' },
            { id: 2, name: 'Recipe 2' }
        ];
        const mockRes = { results, status: 200 };

        const req = {
            json: async () => ({
                datalist: [{ id: 1, data: { id: 1, name: 'Item 1' } }, { id: 2, data: { id: 2, name: 'Item 2' } }]
            })
        } as unknown as NextRequest;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            searchParams: new URLSearchParams({ conditions: JSON.stringify({}) })
        });
        (mockFindAllRecipeSummariesByConditions as jest.Mock).mockResolvedValue(results);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindAllRecipeSummariesByConditions).toHaveBeenCalledWith({});
        expect(NextResponse.json).toHaveBeenCalledWith(results, { status: 200 });
        expect(res).toBe(mockRes);
    })

    test('allを指定してレシピを全件取得し、200レスポンスを返す', async () => {
        const results = [
            { id: 1, name: 'Recipe 1' },
            { id: 2, name: 'Recipe 2' }
        ];
        const mockRes = { results, status: 200 };

        const req = {
            json: async () => ({
                datalist: [{ id: 1, data: { id: 1, name: 'Item 1' } }, { id: 2, data: { id: 2, name: 'Item 2' } }]
            })
        } as unknown as NextRequest;

        (mockGetRequestParams as jest.Mock).mockReturnValue({
            searchParams: new URLSearchParams({ all: 'true' })
        });
        (mockFindAllRecipeSummariesByConditions as jest.Mock).mockResolvedValue(results);
        (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        const res = await GET(req);

        expect(mockHandleApi).toHaveBeenCalled();
        expect(mockFindAllRecipeSummariesByConditions).toHaveBeenCalledWith();
        expect(NextResponse.json).toHaveBeenCalledWith(results, { status: 200 });
        expect(res).toBe(mockRes);
    })
})