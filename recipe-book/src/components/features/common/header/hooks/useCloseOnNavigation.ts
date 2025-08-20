import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * パス変更時のメニュー開閉管理カスタムフック
 * 
 * @param onClose メニュー非表示処理
 * @returns {void} 副作用のみ
 */
export function useCloseOnNavigation(
    onClose: () => void
) {
    const pathname = usePathname();
    const prevPath = useRef(pathname);

    useEffect(() => {
        if (prevPath.current !== pathname) {
            prevPath.current = pathname;
            onClose();
        }
    }, [pathname, onClose]);
}