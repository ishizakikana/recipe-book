import { renderHook } from "@testing-library/react";
import { act } from "react";
import useMenu from "../../src/hooks/useMenu";

describe('useMenu', () => {
    test('openの初期値がfalse', () => {
        const { result } = renderHook(() => useMenu());

        expect(result.current.open).toBe(false);
        expect(result.current.anchorEl).toBeNull();
    })

    test('onOpenでopenがtrueになる', () => {
        const { result } = renderHook(() => useMenu());

        const button = document.createElement('button');
        const event = {
            currentTarget: button
        } as React.MouseEvent<HTMLButtonElement>;

        act(() => {
            result.current.onOpen(event);
        });

        expect(result.current.open).toBe(true);
        expect(result.current.anchorEl).toBe(button);
    })

    test('onCloseでopenがfalseになる', () => {
        const { result } = renderHook(() => useMenu());

        act(() => {
            result.current.onClose();
        });

        expect(result.current.open).toBe(false);
        expect(result.current.anchorEl).toBeNull();
    })
})