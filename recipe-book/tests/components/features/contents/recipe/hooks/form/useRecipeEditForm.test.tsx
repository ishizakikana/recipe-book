import { useRecipeEditForm } from '@/components/features/contents/recipe/hooks/form/useRecipeEditForm';
import { RecipeContext } from '@/components/features/contents/recipe/hooks/useRecipeContext';
import { RecipeContextType } from '@/components/features/contents/recipe/types/context';
import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { RecipeDetail } from '@/types/viewModel';
import { RecipeCategory } from '@prisma/client';
import { act, renderHook } from '@testing-library/react';
import * as ReactHookForm from 'react-hook-form';

// モック
const mockReset = jest.fn();
const mockCreateRecipe = jest.fn();
const mockUpdateRecipe = jest.fn();
const mockUseForm = ReactHookForm.useForm as jest.Mock;

jest.mock('@/components/features/contents/recipe/hooks/recipes/useRecipes', () => {
    return {
        useRecipes: () => ({
            createRecipe: mockCreateRecipe,
            updateRecipe: mockUpdateRecipe
        })
    }
})

jest.mock('react-hook-form', () => {
    const actual = jest.requireActual('react-hook-form');
    return {
        ...actual,
        useForm: jest.fn(actual.useForm)
    }
})

// モックデータ
const mockRecipeCategories: RecipeCategory[] = [
    { id: 1, name: 'Category 1', icon: '', color: '' },
    { id: 2, name: 'Category 2', icon: '', color: '' },
    { id: 3, name: 'Category 3', icon: '', color: '' },
]

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
                { id: '1', name: 'Seasoning 1', volume: '10g', },
            ], stepNumber: 2
        },
    ],
    shelfLife: '3 days',
    calories: 250,
    imageUrl: 'image.png'
}

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
    imageUrl: 'image.png'
}

const renderUseRecipeEditForm = (recipe: RecipeDetail | null) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
        const contextValue: RecipeContextType = {
            recipeCategories: mockRecipeCategories,
            recipeSummaries: [],
            recipeDetail: mockRecipe,
            setRecipeSummaries: jest.fn(),
            setRecipeDetail: jest.fn(),
        }

        return (
            <RecipeContext.Provider value={contextValue}>
                {children}
            </RecipeContext.Provider>
        )
    }

    return renderHook(() => useRecipeEditForm(recipe), { wrapper });
}

describe('useRecipeEditForm', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('initialValues', () => {
        test('初期値が正しく設定される', () => {
            const { result } = renderUseRecipeEditForm(mockRecipe);

            expect(result.current.control._defaultValues).toEqual(mockRecipeFormInput);
        })

        test('recipe が null のとき、初期値が空になる', () => {
            const { result } = renderUseRecipeEditForm(null);

            expect(result.current.control._defaultValues).toEqual({
                id: 0,
                name: undefined,
                categoryId: undefined,
                imageUrl: undefined,
                shelfLife: undefined,
                calories: undefined,
                ingredients: undefined,
                steps: undefined
            });
        })
    })


    describe('categories', () => {
        test('初期値が正しく設定される', () => {
            const { result } = renderUseRecipeEditForm(mockRecipe);

            expect(result.current.categoryOptions).toEqual([
                { label: 'Category 1', value: '1' },
                { label: 'Category 2', value: '2' },
                { label: 'Category 3', value: '3' },
            ]);
        })
    })

    describe('onRegister', () => {
        test('新規登録成功時は入力値とエラーメッセージをクリアし、true を返す', async () => {
            mockCreateRecipe.mockResolvedValue(true);
            mockUseForm.mockImplementation(() => ({
                register: jest.fn(),
                reset: mockReset,
                control: {},
                handleSubmit: (fn: any) => fn,
                formState: { errors: {} }
            }))

            const { result } = renderUseRecipeEditForm(mockRecipe);

            let success;
            await act(async () => {
                success = await result.current.onRegister({
                    ...mockRecipeFormInput,
                    id: 0
                });
            })

            expect(mockCreateRecipe).toHaveBeenCalledWith({
                ...mockRecipeFormInput,
                id: 0
            });
            expect(mockReset).toHaveBeenCalled();
            expect(result.current.submitError).toBeNull();
            expect(success).toBe(true);
        })

        test('新規登録失敗時はエラーメッセージをセットし、false を返す', async () => {
            mockCreateRecipe.mockRejectedValue(new Error('Update failed'));
            mockUseForm.mockImplementation(() => ({
                register: jest.fn(),
                reset: mockReset,
                control: {},
                handleSubmit: (fn: any) => fn,
                formState: { errors: {} }
            }))


            const { result } = renderUseRecipeEditForm(mockRecipe);

            let success;
            await act(async () => {
                success = await result.current.onRegister({
                    ...mockRecipeFormInput,
                    id: 0
                });
            })

            expect(mockCreateRecipe).toHaveBeenCalledWith({
                ...mockRecipeFormInput,
                id: 0
            });
            expect(mockReset).not.toHaveBeenCalled();
            expect(result.current.submitError).toBe('Update failed');
            expect(success).toBe(false);
        })

        test('新規登録処理にて予期しない型のエラーがスローされたとき、unknown エラーメッセージを設定する', async () => {
            mockCreateRecipe.mockRejectedValue('Some string error');
            mockUseForm.mockImplementation(() => ({
                register: jest.fn(),
                reset: mockReset,
                control: {},
                handleSubmit: (fn: any) => fn,
                formState: { errors: {} }
            }))


            const { result } = renderUseRecipeEditForm(mockRecipe);

            let success;
            await act(async () => {
                success = await result.current.onRegister({
                    ...mockRecipeFormInput,
                    id: 0
                });
            })

            expect(mockReset).not.toHaveBeenCalled();
            expect(result.current.submitError).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
            expect(success).toBe(false);
        })

        test('更新成功時は入力値とエラーメッセージをクリアし、true を返す', async () => {
            mockUpdateRecipe.mockResolvedValue(true);
            mockUseForm.mockImplementation(() => ({
                register: jest.fn(),
                reset: mockReset,
                control: {},
                handleSubmit: (fn: any) => fn,
                formState: { errors: {} }
            }))

            const { result } = renderUseRecipeEditForm(mockRecipe);

            let success;
            await act(async () => {
                success = await result.current.onRegister(mockRecipeFormInput);
            })

            expect(mockUpdateRecipe).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockReset).toHaveBeenCalled();
            expect(result.current.submitError).toBeNull();
            expect(success).toBe(true);
        })

        test('更新失敗時はエラーメッセージをセットし、false を返す', async () => {
            mockUpdateRecipe.mockRejectedValue(new Error('Update failed'));
            mockUseForm.mockImplementation(() => ({
                register: jest.fn(),
                reset: mockReset,
                control: {},
                handleSubmit: (fn: any) => fn,
                formState: { errors: {} }
            }))


            const { result } = renderUseRecipeEditForm(mockRecipe);

            let success;
            await act(async () => {
                success = await result.current.onRegister(mockRecipeFormInput);
            })

            expect(mockUpdateRecipe).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockReset).not.toHaveBeenCalled();
            expect(result.current.submitError).toBe('Update failed');
            expect(success).toBe(false);
        })

        test('更新処理にて予期しない型のエラーがスローされたとき、unknown エラーメッセージを設定する', async () => {
            mockCreateRecipe.mockRejectedValue('Some string error');
            mockUseForm.mockImplementation(() => ({
                register: jest.fn(),
                reset: mockReset,
                control: {},
                handleSubmit: (fn: any) => fn,
                formState: { errors: {} }
            }))


            const { result } = renderUseRecipeEditForm(mockRecipe);

            let success;
            await act(async () => {
                success = await result.current.onRegister({
                    ...mockRecipeFormInput,
                    id: 0
                });
            })

            expect(mockReset).not.toHaveBeenCalled();
            expect(result.current.submitError).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
            expect(success).toBe(false);
        })
    })
})