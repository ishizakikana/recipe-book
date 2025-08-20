import { apiGet } from '@/lib/client/fetch';
import { useRouter } from 'next/navigation';

/**
 * ログアウトカスタムフック
 * 
 * @returns logout (ログアウト)
 */
export function useLogout() {
    const router = useRouter();

    /**
     * ログアウト
     */
    const logout = async () => {
        await apiGet('/auth/logout');
        router.push('/login');
    }

    return { logout }
}