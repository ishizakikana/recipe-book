import { ListContext, useListContext } from '@/components/features/contents/list/hooks/useListContext'
import { ListContextType } from '@/components/features/contents/list/types/context'
import { renderHook } from '@testing-library/react'

describe('useListContext', () => {
    const mockValue: ListContextType = {
        listCategories: [],
        categorizedItems: [],
        listItems: [],
        setListItems: jest.fn(),
        error: null,
        setError: jest.fn(),
    }

    test('Provider から値が取得できること', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ListContext.Provider value={mockValue}>
                {children}
            </ListContext.Provider>
        )

        const { result } = renderHook(() => useListContext(), { wrapper });

        expect(result.current).toBe(mockValue);
    })

    test('Provider がない場合はエラーがスローされること', () => {
        try {
            renderHook(() => useListContext());
        } catch (error) {
            expect(error).toEqual(new Error('ListContextはプロバイダーの外で使用できません。'));
        }
    })
})