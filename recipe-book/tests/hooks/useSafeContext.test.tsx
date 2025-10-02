import { useSafeContext } from '@/hooks/useSafeContext';
import { renderHook } from '@testing-library/react';
import { createContext } from 'react';

const TestContext = createContext<{ test: string } | null>(null);

describe('useSafeContext', () => {

    test('Provider内で値を取得できる', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <TestContext.Provider value={{ test: 'value' }}>
                {children}
            </TestContext.Provider>
        );

        const { result } = renderHook(() => useSafeContext(TestContext, 'TestContext'), { wrapper });

        expect(result.current).toEqual({ test: 'value' });
    })

    test('Provider外で使用するとエラーを投げる', () => {
        try {
            renderHook(() => useSafeContext(TestContext, 'TestContext'));
        } catch (e) {
            expect((e as Error).message).toBe('TestContextはプロバイダーの外で使用できません。');
        }
    })
})