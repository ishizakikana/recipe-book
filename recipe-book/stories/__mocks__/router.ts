import { action } from 'storybook/internal/actions';
import { fn } from 'storybook/test';

export const mockPush = fn((url: string) => action(`[router] push: ${url}`)());
export const mockReplace = fn((url: string) => action(`[router]  replace: ${url}`)());
export const mockBack = fn(() => action('[router]  back')());
export const mockForward = fn(() => action('[router]  forward')());
export const mockRefresh = fn(() => action('[router]  refresh')());
export const mockPrefetch = fn((url: string) => action(`[router]  prefetch: ${url}`)());

export const mockRouter = {
    push: mockPush,
    back: mockBack,
    forward: mockForward,
    refresh: mockRefresh,
    replace: mockReplace,
    prefetch: mockPrefetch,
}