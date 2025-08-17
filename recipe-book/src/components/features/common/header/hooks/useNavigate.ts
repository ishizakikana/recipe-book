import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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