import { useRecipesState } from '@/components/features/contents/recipe/hooks/recipes/useRecipesState';
import { RecipeContext } from '@/components/features/contents/recipe/hooks/useRecipeContext';
import { RecipeContextType } from '@/components/features/contents/recipe/types/context';
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { renderHook } from '@testing-library/react';

// モック
const mockSetRecipeDetail = jest.fn();

// モックデータ
const mockRecipeSummaries: RecipeSummary[] = [
    {
        id: 1,
        name: 'Recipe 1',
        category: { id: 1, name: 'Category 1', icon: '', color: '' },
        imageUrl: 'image1.jpg',
        shelfLife: '3 days',
        calories: 100,
        keywords: ['Recipe 1'],
        visible: true
    },
    {
        id: 2,
        name: 'Recipe 2',
        category: { id: 2, name: 'Category 2', icon: '', color: '' },
        imageUrl: 'image2.jpg',
        shelfLife: '5 days',
        calories: 200,
        keywords: ['Recipe 2'],
        visible: true
    }
]

const renderUseRecipesState = () => {
    const mockSetRecipeSummaries = jest.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => {
        const contextValue: RecipeContextType = {
            recipeCategories: [],
            recipeSummaries: mockRecipeSummaries,
            recipeDetail: {} as any,
            setRecipeSummaries: mockSetRecipeSummaries,
            setRecipeDetail: mockSetRecipeDetail,
        }

        return (
            <RecipeContext.Provider value={contextValue}>
                {children}
            </RecipeContext.Provider>
        )
    }

    return {
        ...renderHook(() => useRecipesState(), { wrapper }),
        mockSetRecipeSummaries
    }
}

describe('useRecipeState', () => {
    describe('createState', () => {
        test('正常時、recipeSummariesを更新', () => {
            const { result, mockSetRecipeSummaries } = renderUseRecipesState();

            const insertedRecipe: RecipeDetail = {
                id: 3,
                name: 'Inserted Recipe',
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                imageUrl: 'image1.jpg',
                shelfLife: '3 days',
                calories: 100,
                ingredients: [{ id: '1', name: 'Ingredient 1', volume: '100g' }],
                steps: [],
            }

            result.current.createState(insertedRecipe);

            expect(mockSetRecipeDetail).toHaveBeenCalledWith(insertedRecipe);

            const summariesUpdater = mockSetRecipeSummaries.mock.calls[0][0];
            const updateSummaries = summariesUpdater(mockRecipeSummaries);
            const updatedSummary = updateSummaries.find((r: RecipeSummary) => r.id === insertedRecipe.id);
            expect(updatedSummary).toEqual(expect.objectContaining(insertedRecipe));
        })

        test('ingredients が空配列のとき、keywords に name のみを追加する', () => {
            const { result, mockSetRecipeSummaries } = renderUseRecipesState();

            const insertedRecipe: RecipeDetail = {
                id: 3,
                name: 'Inserted Recipe',
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                imageUrl: 'image1.jpg',
                shelfLife: '3 days',
                calories: 100,
                ingredients: [],
                steps: [],
            }

            result.current.createState(insertedRecipe);

            expect(mockSetRecipeDetail).toHaveBeenCalledWith(insertedRecipe);

            const summariesUpdater = mockSetRecipeSummaries.mock.calls[0][0];
            const updateSummaries = summariesUpdater(mockRecipeSummaries);
            const updatedSummary = updateSummaries.find((r: RecipeSummary) => r.id === insertedRecipe.id);
            expect(updatedSummary).toEqual(expect.objectContaining(insertedRecipe));
        })
    })

    describe('updateState', () => {
        test('正常時、recipeSummariesを更新', () => {
            const { result, mockSetRecipeSummaries } = renderUseRecipesState();

            const updatedRecipe: RecipeDetail = {
                id: 1,
                name: 'Updated Recipe',
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                imageUrl: 'image1.jpg',
                shelfLife: '3 days',
                calories: 100,
                ingredients: [{ id: '1', name: 'Ingredient 1', volume: '100g' }],
                steps: [],
            }

            result.current.updateState(updatedRecipe);

            expect(mockSetRecipeDetail).toHaveBeenCalledWith(updatedRecipe);

            const summariesUpdater = mockSetRecipeSummaries.mock.calls[0][0];
            const updateSummaries = summariesUpdater(mockRecipeSummaries);
            const updatedSummary = updateSummaries.find((r: RecipeSummary) => r.id === updatedRecipe.id);
            expect(updatedSummary).toEqual(expect.objectContaining(updatedRecipe));
        })

        test('ingredients が空配列のとき、keywords に name のみを追加する', () => {
            const { result, mockSetRecipeSummaries } = renderUseRecipesState();

            const updatedRecipe: RecipeDetail = {
                id: 1,
                name: 'Updated Recipe',
                category: { id: 1, name: 'Category 1', icon: '', color: '' },
                imageUrl: 'image1.jpg',
                shelfLife: '3 days',
                calories: 100,
                ingredients: [],
                steps: [],
            }

            result.current.updateState(updatedRecipe);

            expect(mockSetRecipeDetail).toHaveBeenCalledWith(updatedRecipe);

            const summariesUpdater = mockSetRecipeSummaries.mock.calls[0][0];
            const updateSummaries = summariesUpdater(mockRecipeSummaries);
            const updatedSummary = updateSummaries.find((r: RecipeSummary) => r.id === updatedRecipe.id);
            expect(updatedSummary).toEqual(expect.objectContaining(updatedRecipe));
        })
    })

    describe('deleteState', () => {
        test('正常時、recipeSummariesを更新', () => {
            const { result, mockSetRecipeSummaries } = renderUseRecipesState();

            const deleteRecipeId = 1;

            result.current.deleteState(deleteRecipeId);

            expect(mockSetRecipeDetail).toHaveBeenCalledWith(null);

            const summariesUpdater = mockSetRecipeSummaries.mock.calls[0][0];
            const updateSummaries = summariesUpdater(mockRecipeSummaries);
            const updatedSummary = updateSummaries.filter((r: RecipeSummary) => r.id !== deleteRecipeId);
            expect(updatedSummary.length).toBe(mockRecipeSummaries.length - 1);
        })
    })
})