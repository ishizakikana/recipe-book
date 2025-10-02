import { toRecipeDetail, toRecipeSummary } from '@/lib/server/converter/recipeConverter'
import { RecipeDetailResponse, RecipeSummaryResponse } from '@/types/entity'
import { RecipeDetail, RecipeSummary } from '@/types/viewModel'

describe('recipeConverter', () => {

    describe('toRecipeSummary', () => {
        test('DBから取得したレシピデータをレシピ概要に変換する', () => {
            const recipe: RecipeSummaryResponse = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'sample.jpg',
                categoryId: 1,
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: 100,
                shelfLife: '1日',
                ingredients: [
                    { id: '1', recipeId: 1, name: '材料1', volume: '200g' },
                    { id: '2', recipeId: 1, name: '材料2', volume: '100g' }
                ]
            }

            const expected: RecipeSummary = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/sample.jpg',
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: 100,
                shelfLife: '1日',
                keywords: ['レシピ1', '材料1', '材料2'],
                visible: true
            }

            const result = toRecipeSummary(recipe, true);

            expect(result).toEqual(expected);
        })

        test('カロリーと賞味期限がnullの場合、undefinedに変換される', () => {
            const recipe: RecipeSummaryResponse = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'sample.jpg',
                categoryId: 1,
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: null,
                shelfLife: null,
                ingredients: []
            }

            const expected: RecipeSummary = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/sample.jpg',
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: undefined,
                shelfLife: undefined,
                keywords: ['レシピ1'],
                visible: true
            }

            const result = toRecipeSummary(recipe, true);

            expect(result).toEqual(expected);
        })

        test('画像URLがnullのとき、no_image.png を返す', () => {
            const recipe: RecipeSummaryResponse = {
                id: 1,
                name: 'レシピ1',
                imageUrl: null,
                categoryId: 1,
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: null,
                shelfLife: null,
                ingredients: []
            }

            const expected: RecipeSummary = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.png',
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: undefined,
                shelfLife: undefined,
                keywords: ['レシピ1'],
                visible: false
            }

            const result = toRecipeSummary(recipe, false);

            expect(result).toEqual(expected);
        })
    })

    describe('toRecipeDetail', () => {
        test('DBから取得したレシピデータをレシピ詳細に変換する', () => {
            const recipe: RecipeDetailResponse = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'sample.jpg',
                categoryId: 1,
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: 100,
                shelfLife: '1日',
                ingredients: [
                    { id: '1', recipeId: 1, name: '材料1', volume: '200g' },
                    { id: '2', recipeId: 1, name: '材料2', volume: '100g' }
                ],
                steps: [
                    { id: 1, recipeId: 1, stepNumber: 1, text: 'ステップ1', seasonings: [] },
                    {
                        id: 2, recipeId: 1, stepNumber: 2, text: 'ステップ2', seasonings: [
                            { id: '1', stepId: 2, name: '調味料1', volume: '100g' },
                            { id: '2', stepId: 2, name: '調味料2', volume: '200g' }
                        ]
                    }
                ]
            }

            const expected: RecipeDetail = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/sample.jpg',
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: 100,
                shelfLife: '1日',
                ingredients: [
                    { id: '1', name: '材料1', volume: '200g' },
                    { id: '2', name: '材料2', volume: '100g' }
                ],
                steps: [
                    { id: 1, stepNumber: 1, text: 'ステップ1', seasonings: [] },
                    {
                        id: 2, stepNumber: 2, text: 'ステップ2', seasonings: [
                            { id: '1', name: '調味料1', volume: '100g' },
                            { id: '2', name: '調味料2', volume: '200g' }
                        ]
                    }
                ]
            }

            const result = toRecipeDetail(recipe);

            expect(result).toEqual(expected);
        })

        test('カロリーまたた', () => {
            const recipe: RecipeDetailResponse = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'sample.jpg',
                categoryId: 1,
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: 100,
                shelfLife: '1日',
                ingredients: [
                    { id: '1', recipeId: 1, name: '材料1', volume: '200g' },
                    { id: '2', recipeId: 1, name: '材料2', volume: '100g' }
                ],
                steps: [
                    { id: 1, recipeId: 1, stepNumber: 1, text: 'ステップ1', seasonings: [] },
                    {
                        id: 2, recipeId: 1, stepNumber: 2, text: 'ステップ2', seasonings: [
                            { id: '1', stepId: 2, name: '調味料1', volume: '100g' },
                            { id: '2', stepId: 2, name: '調味料2', volume: '200g' }
                        ]
                    }
                ]
            }

            const expected: RecipeDetail = {
                id: 1,
                name: 'レシピ1',
                imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/sample.jpg',
                category: { id: 1, name: 'カテゴリー1', color: '#ff0000', icon: 'icon1' },
                calories: 100,
                shelfLife: '1日',
                ingredients: [
                    { id: '1', name: '材料1', volume: '200g' },
                    { id: '2', name: '材料2', volume: '100g' }
                ],
                steps: [
                    { id: 1, stepNumber: 1, text: 'ステップ1', seasonings: [] },
                    {
                        id: 2, stepNumber: 2, text: 'ステップ2', seasonings: [
                            { id: '1', name: '調味料1', volume: '100g' },
                            { id: '2', name: '調味料2', volume: '200g' }
                        ]
                    }
                ]
            }

            const result = toRecipeDetail(recipe);

            expect(result).toEqual(expected);
        })
    })
})