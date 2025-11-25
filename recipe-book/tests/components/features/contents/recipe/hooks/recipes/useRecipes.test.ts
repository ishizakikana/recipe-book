import { useRecipes } from '@/components/features/contents/recipe/hooks/recipes/useRecipes';
import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { RecipeDetail } from '@/types/viewModel';
import { act, renderHook } from '@testing-library/react';

// モック
const mockCreateData = jest.fn();
const mockCreateState = jest.fn();
const mockUpdateData = jest.fn();
const mockUpdateState = jest.fn();
const mockDeleteData = jest.fn();
const mockDeleteState = jest.fn();

jest.mock('@/components/features/contents/recipe/hooks/recipes/useRecipesActions', () => {
    return {
        useRecipesActions: () => ({
            createData: mockCreateData,
            updateData: mockUpdateData,
            deleteData: mockDeleteData
        })
    }
})

jest.mock('@/components/features/contents/recipe/hooks/recipes/useRecipesState', () => {
    return {
        useRecipesState: () => ({
            createState: mockCreateState,
            updateState: mockUpdateState,
            deleteState: mockDeleteState
        })
    }
})

describe('useRecipes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createRecipe', () => {
        test('createDataとcreateStateが実行される', async () => {
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
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                ingredients: [
                    { id: '1', name: 'Ingredient 1', volume: '100g' },
                    { id: '2', name: 'Ingredient 2', volume: '200ml' }
                ],
                steps: [
                    { id: 1, text: 'Step 1', seasonings: [], stepNumber: 1 },
                    {
                        id: 2, text: 'Step 2', seasonings: [
                            { id: '1', name: 'Seasoning 1', volume: '10g' },
                        ], stepNumber: 2
                    },
                ],
                shelfLife: '3 days',
                calories: 250,
                imageUrl: 'image.png'
            }

            mockCreateData.mockResolvedValue(mockRecipe);

            const { result } = renderHook(() => useRecipes());

            await act(async () => {
                await result.current.createRecipe(mockRecipeFormInput);
            })

            expect(mockCreateData).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockCreateState).toHaveBeenCalledWith(mockRecipe);
        })
    })

    describe('updateRecipe', () => {
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
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                ingredients: [
                    { id: '1', name: 'Ingredient 1', volume: '100g' },
                    { id: '2', name: 'Ingredient 2', volume: '200ml' }
                ],
                steps: [
                    { id: 1, text: 'Step 1', seasonings: [], stepNumber: 1 },
                    {
                        id: 2, text: 'Step 2', seasonings: [
                            { id: '1', name: 'Seasoning 1', volume: '10g' },
                        ], stepNumber: 2
                    },
                ],
                shelfLife: '3 days',
                calories: 250,
                imageUrl: 'image.png'
            }

            mockUpdateData.mockResolvedValue(mockRecipe);

            const { result } = renderHook(() => useRecipes());

            await act(async () => {
                await result.current.updateRecipe(mockRecipeFormInput);
            })

            expect(mockUpdateData).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockUpdateState).toHaveBeenCalledWith(mockRecipe);
        })
    })

    describe('deleteRecipe', () => {
        test('deleteDataとdeleteStateが実行される', async () => {
            const recipeId = 1;
            const { result } = renderHook(() => useRecipes());

            await act(async () => {
                await result.current.deleteRecipe(recipeId);
            })

            expect(mockDeleteData).toHaveBeenCalledWith(recipeId);
            expect(mockDeleteState).toHaveBeenCalledWith(recipeId);
        })
    })
})