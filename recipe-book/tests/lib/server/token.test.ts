import { verifyToken } from '@/lib/server/auth';
import { COOKIE_KEYS, getCookie } from '@/lib/server/cookie';
import { apiGetServer } from '@/lib/server/fetchServer';
import { getUserFromAuthToken } from '@/lib/server/token';

jest.mock('@lib/server/auth', () => ({
    verifyToken: jest.fn()
}))

jest.mock('@lib/server/fetchServer', () => ({
    apiGetServer: jest.fn()
}))

jest.mock('@lib/server/cookie', () => ({
    getCookie: jest.fn(),
    COOKIE_KEYS: { AUTH_TOKEN: 'auth_token' }
}))

describe('token', () => {

    describe('getUserFormAuthToken', () => {
        const mockGetCookie = getCookie as jest.Mock;
        const mockVerifyToken = verifyToken as jest.Mock;
        const mockApiGetServer = apiGetServer as jest.Mock;

        afterEach(() => {
            jest.clearAllMocks();
        })

        test('Cookieが存在しないとき、nullを返却する', async () => {
            mockGetCookie.mockResolvedValueOnce(null);

            const result = await getUserFromAuthToken();

            expect(result).toBeNull();
            expect(mockGetCookie).toHaveBeenCalledWith(COOKIE_KEYS.AUTH_TOKEN);
        })

        test('トークンがnullのとき、nullを返却する', async () => {
            mockGetCookie.mockResolvedValueOnce('token');
            mockVerifyToken.mockResolvedValueOnce(null);

            const result = await getUserFromAuthToken();

            expect(result).toBeNull();
            expect(mockVerifyToken).toHaveBeenCalledWith('token');
        })

        test('トークンが無効な型のとき、nullを返却する', async () => {
            mockGetCookie.mockResolvedValueOnce('token');
            mockVerifyToken.mockResolvedValueOnce('decoded');

            const result = await getUserFromAuthToken();

            expect(result).toBeNull();
            expect(mockVerifyToken).toHaveBeenCalledWith('token');
        })

        test('トークンに userId 情報が含まれていないとき、nullを返却する', async () => {
            mockGetCookie.mockResolvedValueOnce('token');
            mockVerifyToken.mockResolvedValueOnce({});

            const result = await getUserFromAuthToken();

            expect(result).toBeNull();
            expect(mockVerifyToken).toHaveBeenCalledWith('token');
        })

        test('トークンに userId 情報が含まれているとき、ユーザー情報を返却する', async () => {
            mockGetCookie.mockResolvedValueOnce('token');
            mockVerifyToken.mockResolvedValueOnce({ userId: '1' });
            mockApiGetServer.mockResolvedValueOnce({ id: '1' });

            const result = await getUserFromAuthToken();

            expect(result).toEqual({ id: '1' });
            expect(mockVerifyToken).toHaveBeenCalledWith('token');
            expect(mockApiGetServer).toHaveBeenCalledWith('/user/find?id=1');
        })

        test('ユーザーIDが一致するデータが存在しないとき、nullを返却する', async () => {
            mockGetCookie.mockResolvedValueOnce('token');
            mockVerifyToken.mockResolvedValueOnce({ userId: '1' });
            mockApiGetServer.mockResolvedValueOnce(null);

            const result = await getUserFromAuthToken();

            expect(result).toBeNull();
            expect(mockVerifyToken).toHaveBeenCalledWith('token');
            expect(mockApiGetServer).toHaveBeenCalledWith('/user/find?id=1');
        })
    })
})