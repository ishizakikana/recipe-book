// モック
const mockApiGetServer = jest.fn();
jest.mock('@lib/server/fetchServer', () => ({
    apiGetServer: mockApiGetServer
}))

import ListPage from '@/app/(contents)/list/page';
import { apiGetServer } from '@/lib/server/fetchServer';

describe('ListPage', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('データを取得し、コンテンツを表示する', async () => {
        (apiGetServer as jest.Mock).mockImplementation((url: string) => {
            {
                if (url === '/list-category/find?all=true') {
                    return Promise.resolve([{ id: 1, name: 'Category 1' }]);
                } else if (url === '/list-item/find?all=true') {
                    return Promise.resolve([{ id: 1, name: 'Recipe 1' }]);
                }
            }
        });

        const result = await ListPage();

        expect(apiGetServer).toHaveBeenCalledTimes(2);
        expect(apiGetServer).toHaveBeenNthCalledWith(1, '/list-category/find?all=true');
        expect(apiGetServer).toHaveBeenNthCalledWith(2, '/list-item/find?all=true');
        expect(result).toBeTruthy();
    })
})