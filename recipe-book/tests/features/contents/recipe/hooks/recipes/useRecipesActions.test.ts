import { useRecipesActions } from '@/components/features/contents/recipe/hooks/recipes/useRecipesActions';
import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { RecipeDetail } from '@/types/viewModel';
import { act, renderHook } from '@testing-library/react';

// モック
const mockApiPost = jest.fn();
jest.mock('@/lib/client/fetch', () => ({
    apiPost: (url: string, data: any) => mockApiPost(url, data)
}))

// テストデータ

describe('useRecipesActions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('updateData', () => {
        test('正常時、レシピを更新できる', async () => {
            const { result } = renderHook(() => useRecipesActions());

            const recipeFormInput: RecipeFormInput = {
                id: 1,
                name: '更新後レシピ',
                categoryId: '2',
                imageUrl: 'http://example.com/updated.jpg',
                shelfLife: '7days',
                calories: 250,
                ingredients: '材料1\n材料2',
                steps: [
                    { id: 1, text: '手順1', seasonings: '調味料1\n調味料2' },
                    { id: 2, text: '手順2', seasonings: undefined }
                ]
            }

            const expectRecipe: RecipeDetail = {
                id: 1,
                name: '更新後レシピ',
                categoryId: 2,
                category: { id: 2, name: 'Category 2', icon: '', color: '' },
                ingredients: [
                    { id: '000100', name: '材料1', volume: undefined, recipeId: 1 },
                    { id: '000101', name: '材料2', volume: undefined, recipeId: 1 }
                ],
                steps: [
                    {
                        id: 1, text: '手順1', stepNumber: 1, recipeId: 1, seasonings: [
                            { id: '000100', name: '調味料1', volume: undefined },
                            { id: '000101', name: '調味料2', volume: undefined }
                        ]
                    },
                    { id: 2, text: '手順2', stepNumber: 2, recipeId: 1, seasonings: [] }
                ],
                shelfLife: '冷蔵7日',
                calories: 250,
                imageUrl: 'http://example.com/updated.jpg',
            }

            await act(async () => {
                mockApiPost.mockResolvedValue(expectRecipe);
                const resultRecipe = await result.current.updateData(recipeFormInput);
                expect(resultRecipe).toEqual(expectRecipe);
            })

            expect(mockApiPost).toHaveBeenCalledWith('/recipe/update', {
                id: recipeFormInput.id,
                data: {
                    recipe: {
                        id: recipeFormInput.id,
                        name: recipeFormInput.name,
                        categoryId: parseInt(recipeFormInput.categoryId),
                        imageUrl: recipeFormInput.imageUrl,
                        calories: recipeFormInput.calories,
                        shelfLife: recipeFormInput.shelfLife,
                    },
                    ingredients: [
                        { id: '000100', name: '材料1', volume: undefined, recipeId: 1 },
                        { id: '000101', name: '材料2', volume: undefined, recipeId: 1 }
                    ],
                    steps: [
                        {
                            id: 1, text: '手順1', stepNumber: 1, recipeId: 1, seasonings: [
                                { id: '000100', name: '調味料1', volume: undefined },
                                { id: '000101', name: '調味料2', volume: undefined }
                            ]
                        },
                        { id: 2, text: '手順2', stepNumber: 2, recipeId: 1, seasonings: [] }
                    ]
                }
            });
        });

    })
})