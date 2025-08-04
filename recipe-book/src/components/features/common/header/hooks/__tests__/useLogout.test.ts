import { useRouter } from 'next/navigation';
import { useLogout } from '../useLogout';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

jest.mock('@/lib/fetch', () => ({
    apiGet: jest.fn(() => Promise.resolve())
}));

describe('useDrawer', () => {
    test('ログアウト処理を実行する', async () => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn()
        })

        const { logout } = useLogout();

        await logout();

        expect(useRouter).toHaveBeenCalled();
        expect(useRouter().push).toHaveBeenCalledWith('/login');
    })
})