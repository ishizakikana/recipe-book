// モック
const mockApiGetServer = jest.fn();
jest.mock('@lib/server/fetchServer', () => ({
    apiGetServer: mockApiGetServer
}))

import RecipeLayout from '@/app/(contents)/recipe/layout';
import { apiGetServer } from '@/lib/server/fetchServer';
import { ReactNode } from 'react';

describe('RecipeLayout', () => {
    const mockChildren: ReactNode = (<div>content</div>)
    const mockDialog: ReactNode = (<div>dialog</div>)

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('データを取得し、コンテンツを表示する', async () => {
        (apiGetServer as jest.Mock).mockImplementation((url: string) => {
            {
                if (url === '/recipe-category/find?all=true') {
                    return Promise.resolve([{ id: 1, name: 'Category 1' }]);
                } else if (url === '/recipe/find?all=true') {
                    return Promise.resolve([{ id: 1, name: 'Recipe 1' }]);
                }
            }
        });

        const result = await RecipeLayout({ children: mockChildren, dialog: mockDialog });

        expect(apiGetServer).toHaveBeenCalledTimes(2);
        expect(apiGetServer).toHaveBeenNthCalledWith(1, '/recipe-category/find?all=true');
        expect(apiGetServer).toHaveBeenNthCalledWith(2, '/recipe/find?all=true');
        expect(result).toBeTruthy();
        expect(JSON.stringify(result)).toContain('content');
        expect(JSON.stringify(result)).toContain('dialog');
    })
})