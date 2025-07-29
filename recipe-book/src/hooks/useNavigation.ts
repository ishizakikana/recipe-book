import { usePathname, useRouter } from 'next/navigation';

export function useNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    /**
     * 指定パスへ画面遷移
     * 
     * @param path パス
     */
    const navigateTo = (path: string) => {
        router.push(path);
    }

    /**
     * 現在のパスに追記して画面遷移
     * 
     * @param suffix 追加するパス
     */
    const navigateAppend = (suffix: string) => {
        const path = pathname.endsWith('/')
            ? `${pathname}${suffix}`
            : `${pathname}/${suffix}`

        router.push(path);
    }

    return { navigateTo, navigateAppend };
}