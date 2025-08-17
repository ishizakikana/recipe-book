import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useDialog } from "../../src/hooks/useDialog";

describe('useDialog', () => {
    test('openの初期値がfalse', () => {
        const { result } = renderHook(() => useDialog());
        expect(result.current.open).toBe(false);
    })

    test('onOpenでopenがtrueになる', () => {
        const { result } = renderHook(() => useDialog());

        act(() => {
            result.current.onOpen();
        });

        expect(result.current.open).toBe(true);
    })

    test('onCloseでopenがfalseになる', () => {
        const { result } = renderHook(() => useDialog());

        act(() => {
            result.current.onClose();
        });

        expect(result.current.open).toBe(false);
    })
})