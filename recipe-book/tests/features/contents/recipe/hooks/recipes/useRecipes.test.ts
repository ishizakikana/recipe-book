import { useRecipes } from '@/components/features/contents/recipe/hooks/recipes/useRecipes';
import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { RecipeDetail } from '@/types/viewModel';
import { act, renderHook } from '@testing-library/react';

// モック
const mockUpdateData = jest.fn();
const mockUpdateState = jest.fn();

jest.mock('@/components/features/contents/recipe/hooks/recipes/useRecipesActions', () => {
    return {
        useRecipesActions: () => ({
            updateData: mockUpdateData
        })
    }
})

jest.mock('@/components/features/contents/recipe/hooks/recipes/useRecipesState', () => {
    return {
        useRecipesState: () => ({
            updateState: mockUpdateState
        })
    }
})

describe('useRecipes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('update', () => {
        test('updateDataとupdateStateが実行される', async () => {
            const mockRecipeFormInput: RecipeFormInput = {
                id: 1,
                name: 'Test Recipe',
                categoryId: '1',
                ingredients: 'Ingredient 1 100g\nIngredient 2 200ml',
                steps: [
                    { id: 1, text: 'Step 1', seasonings: '' },
                    { id: 2, text: 'Step 2', seasonings: 'Seasoning 1 10g' },
                ],
                shelfLife: '3 days',
                calories: 250,
                imageUrl: undefined
            }

            const mockRecipe: RecipeDetail = {
                id: 1,
                name: 'Test Recipe',
                categoryId: 1,
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                ingredients: [
                    { id: '1', name: 'Ingredient 1', volume: '100g', recipeId: 1 },
                    { id: '2', name: 'Ingredient 2', volume: '200ml', recipeId: 1 }
                ],
                steps: [
                    { id: 1, text: 'Step 1', seasonings: [], recipeId: 1, stepNumber: 1 },
                    {
                        id: 2, text: 'Step 2', seasonings: [
                            { id: '1', name: 'Seasoning 1', volume: '10g', stepId: 2 },
                        ], recipeId: 1, stepNumber: 2
                    },
                ],
                shelfLife: '3 days',
                calories: 250,
                imageUrl: undefined
            }

            mockUpdateData.mockResolvedValue(mockRecipe);

            const { result } = renderHook(() => useRecipes());

            await act(async () => {
                await result.current.update(mockRecipeFormInput);
            })

            expect(mockUpdateData).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockUpdateState).toHaveBeenCalledWith(mockRecipe);
        })
    })
})