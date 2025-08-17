import { fn } from 'storybook/test';

export const mockPush = fn((url: string) => console.log(`[mockPush] push: ${url}`));
export const mockReplace = fn((url: string) => console.log(`[mockReplace] replace: ${url}`));
export const mockBack = fn(() => console.log('[mockBack] back'));
export const mockForward = fn(() => console.log('[mockForward] forward'));
export const mockRefresh = fn(() => console.log('[mockRefresh] refresh'));
export const mockPrefetch = fn((url: string) => console.log(`[mockPrefetch] prefetch: ${url}`));

export const mockRouter = {
    push: mockPush,
    back: mockBack,
    forward: mockForward,
    refresh: mockRefresh,
    replace: mockReplace,
    prefetch: mockPrefetch,
}