// モック
const mockApiGetServer = jest.fn();
jest.mock('@lib/server/fetchServer', () => ({
    apiGetServer: mockApiGetServer
}))

import RecipePage from '@/app/(contents)/recipe/[id]/page';
import { apiGetServer } from '@/lib/server/fetchServer';

describe('RecipePage', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('データを取得し、コンテンツを表示する', async () => {
        (apiGetServer as jest.Mock).mockResolvedValue((url: string) => (
            { id: 1, name: url.includes('category') ? 'Category 1' : 'Recipe 1' }
        ));

        const result = await RecipePage({ params: Promise.resolve({ id: '1' }) });

        expect(apiGetServer).toHaveBeenCalledTimes(1);
        expect(apiGetServer).toHaveBeenCalledWith('/recipe/find?id=1');

        expect(result).toBeTruthy();
    })

    test('データが存在しない場合、nullを返す', async () => {
        (apiGetServer as jest.Mock).mockResolvedValue(null);

        const result = await RecipePage({ params: Promise.resolve({ id: '1' }) });

        expect(apiGetServer).toHaveBeenCalledTimes(1);
        expect(apiGetServer).toHaveBeenCalledWith('/recipe/find?id=1');

        expect(result).toBeNull();
    })
})