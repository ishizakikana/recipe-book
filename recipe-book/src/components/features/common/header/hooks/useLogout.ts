import { apiGet } from '@/lib/fetch';
import { useRouter } from 'next/navigation';

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