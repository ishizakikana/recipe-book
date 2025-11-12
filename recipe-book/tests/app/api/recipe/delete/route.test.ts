// mock
const mockHandleApi = jest.fn();
const mockGetRequestParams = jest.fn();
const mockDelete = jest.fn();

jest.mock('@/lib/server/api', () => ({
    handleApi: mockHandleApi,
    getRequestParams: mockGetRequestParams,
}));
jest.mock('@/lib/server/repositories/recipeRepository', () => ({
    recipeRepository: {
        delete: mockDelete,
    },
}));
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));


describe('/api/list-item/update POST', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('レシピを削除し、200レスポンスを返す', async () => {
        // const mockItems = [{ id: 1, name: 'Item 1 updated' }, { id: 2, name: 'Item 2 updated' }];
        // const mockRes = { mockItems, status: 200 };
        // const req = {
        //     json: async () => ({
        //         datalist: [{ id: 1, data: { id: 1, name: 'Item 1' } }, { id: 2, data: { id: 2, name: 'Item 2' } }]
        //     })
        // } as unknown as NextRequest;

        // (mockHandleApi as jest.Mock).mockImplementation(async (_req, handler) => handler());
        // (mockUpdate as jest.Mock).mockImplementation((_, data) => {
        //     const updated = { id: data.id, name: data.name + ' updated' };
        //     return Promise.resolve(updated)
        // });
        // (NextResponse.json as jest.Mock).mockReturnValue(mockRes);

        // const res = await POST(req);

        // expect(mockHandleApi).toHaveBeenCalled();
        // expect(NextResponse.json).toHaveBeenCalledWith(mockItems, { status: 200 });
        // expect(res).toBe(mockRes);
    })
})