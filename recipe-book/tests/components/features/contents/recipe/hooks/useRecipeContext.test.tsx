import { RecipeContext, useRecipeContext } from '@/components/features/contents/recipe/hooks/useRecipeContext'
import { RecipeContextType } from '@/components/features/contents/recipe/types/context'
import { renderHook } from '@testing-library/react'

describe('useRecipeContext', () => {
    const mockValue: RecipeContextType = {
        recipeDetail: null,
        recipeCategories: [],
        recipeSummaries: [],
        setRecipeDetail: () => { },
        setRecipeSummaries: () => { },
    }

    test('Provider から値が取得できること', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <RecipeContext.Provider value={mockValue}>
                {children}
            </RecipeContext.Provider>
        )

        const { result } = renderHook(() => useRecipeContext(), { wrapper });

        expect(result.current).toBe(mockValue);
    })

    test('Provider がない場合はエラーがスローされること', () => {
        try {
            renderHook(() => useRecipeContext());
        } catch (error) {
            expect(error).toEqual(new Error('RecipeContextはプロバイダーの外で使用できません。'));
        }
    })
})