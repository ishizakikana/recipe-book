import { usePathname, useRouter } from "next/navigation";

/**
 * レシピ詳細モーダル画面制御カスタムフック
 * 
 * @returns 
 *  open（モーダル開閉状態）
 *  onClose（非表示イベント）
 */
export function useRecipeModal() {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split('/');
    const open = !isNaN(Number(segments[segments.length - 1]));

    // 非表示イベント
    const onClose = () => router.back();

    return {
        open,
        onClose
    }
}