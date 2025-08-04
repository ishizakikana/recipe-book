import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useDrawer } from '../useDrawer';

describe('useDrawer', () => {

    describe('drawerOpen', () => {
        test('初期値がfalseであること', () => {
            const { result } = renderHook(() => useDrawer());
            expect(result.current.drawerOpen).toBe(false);
        })
    })

    describe('toggleDrawer', () => {
        test('drawerOpenがtrueになる', () => {
            const { result } = renderHook(() => useDrawer());

            act(() => {
                result.current.toggleDrawer();
            })

            expect(result.current.drawerOpen).toBe(true);
        })

        test('drawerOpenがfalseになる', () => {
            const { result } = renderHook(() => useDrawer());

            act(() => {
                result.current.toggleDrawer();
                result.current.toggleDrawer();
            })

            expect(result.current.drawerOpen).toBe(false);
        })
    })

    describe('closeDrawer', () => {
        test('drawerOpenがfalseになる', () => {
            const { result } = renderHook(() => useDrawer());

            act(() => {
                result.current.toggleDrawer();
                result.current.closeDrawer();
            })
            expect(result.current.drawerOpen).toBe(false);
        })
    })
})