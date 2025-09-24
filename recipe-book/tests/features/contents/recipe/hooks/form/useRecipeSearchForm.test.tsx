import { useRecipeSearchForm } from '@/components/features/contents/recipe/hooks/form/useRecipeSearchForm';
import { RecipeContext } from '@/components/features/contents/recipe/hooks/useRecipeContext';
import { RecipeContextType } from '@/components/features/contents/recipe/types/context';
import { useQueryParams } from '@/hooks/useQueryParams';
import { RecipeSummary } from '@/types/viewModel';
import { RecipeCategory } from '@prisma/client';
import { act, renderHook } from '@testing-library/react';

// モック
const mockPush = jest.fn();
const mockSetRecipeSummaries = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    }),
}))

jest.mock('@/hooks/useQueryParams');

// テストデータ
const mockRecipes: RecipeSummary[] = [
    {
        id: 1,
        name: 'レシピ1',
        imageUrl: '',
        shelfLife: '冷蔵3日',
        calories: 100,
        categoryId: 1,
        category: { id: 1, name: 'カテゴリ1', icon: '', color: '' },
        keywords: ['レシピ1', 'キーワード1', 'キーワード2'],
        visible: true
    },
    {
        id: 2,
        name: 'レシピ2',
        imageUrl: '',
        shelfLife: '冷蔵3日',
        calories: 200,
        categoryId: 2,
        category: { id: 2, name: 'カテゴリ2', icon: '', color: '' },
        keywords: ['レシピ2', 'キーワード3', 'キーワード4'],
        visible: true
    },
    {
        id: 3,
        name: 'レシピ3',
        imageUrl: '',
        shelfLife: '冷蔵3日',
        calories: 300,
        categoryId: 3,
        category: { id: 3, name: 'カテゴリ3', icon: '', color: '' },
        keywords: ['レシピ3', 'キーワード5', 'キーワード6'],
        visible: true
    },
    {
        id: 4,
        name: 'レシピ4',
        imageUrl: '',
        shelfLife: '冷蔵3日',
        calories: 400,
        categoryId: 1,
        category: { id: 1, name: 'カテゴリ1', icon: '', color: '' },
        keywords: ['レシピ4', 'キーワード7', 'キーワード8'],
        visible: true
    }
]

const mockCategories: RecipeCategory[] = [
    { id: 1, name: 'カテゴリ1', icon: '', color: '' },
    { id: 2, name: 'カテゴリ2', icon: '', color: '' },
    { id: 3, name: 'カテゴリ3', icon: '', color: '' },
]

const renderUseRecipeSearchForm = (override: Partial<{ recipes: RecipeSummary[], recipeCategories: RecipeCategory[], setRecipes: jest.Mock }> = {}) => {

    const wrapper = ({ children }: { children: React.ReactNode }) => {
        const contextValue: RecipeContextType = {
            recipeCategories: mockCategories,
            recipeSummaries: mockRecipes,
            recipeDetail: {} as any,
            setRecipeSummaries: mockSetRecipeSummaries,
            setRecipeDetail: jest.fn(),
            ...override
        }

        return (
            <RecipeContext.Provider value={contextValue}>
                {children}
            </RecipeContext.Provider>
        )
    }

    return {
        ...renderHook(() => useRecipeSearchForm(), { wrapper }),
        mockSetRecipeSummaries
    }
}

describe('useRecipeSearchForm', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('form', () => {
        test('GETパラメータが設定されていないとき、初期値が空', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({}))
            })

            const { result } = renderUseRecipeSearchForm();

            expect(result.current.form).toEqual({ keyword: '', categoryIds: [] });
            expect(result.current.isSearch).toBe(false);
            expect(mockPush).toHaveBeenCalledWith('/recipe?');
        })

        test('GETパラメータがすべて設定されているとき、初期値が設定される', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ keyword: 'test', categoryIds: '1,2' }))
            })

            const { result } = renderUseRecipeSearchForm();

            expect(result.current.form).toEqual({ keyword: 'test', categoryIds: [1, 2] });
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=test&categoryIds=1%2C2');
        })

        test('keyword のみ設定されているとき、初期値が設定される', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ keyword: 'test' }))
            })

            const { result } = renderUseRecipeSearchForm();

            expect(result.current.form).toEqual({ keyword: 'test', categoryIds: [] });
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=test');
        })

        test('categoryIds のみ設定されているとき、初期値が設定される', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ categoryIds: '1,2' }))
            })

            const { result } = renderUseRecipeSearchForm();

            expect(result.current.form).toEqual({ keyword: '', categoryIds: [1, 2] });
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?categoryIds=1%2C2');
        })
    })

    describe('setFormValue', () => {
        test('フォームの値が更新される', () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({}))
            })

            const { result } = renderUseRecipeSearchForm();

            act(() => {
                result.current.setFormValue('keyword', 'test');
            })

            expect(result.current.form.keyword).toBe('test');
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=test');
        })
    })

    describe('search', () => {
        test('キーワードを含むレシピを表示する', () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ keyword: 'キーワード1' }))
            })

            const { result } = renderUseRecipeSearchForm();

            act(() => {
                result.current.search();
            })

            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=%E3%82%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%891');

            const updater = mockSetRecipeSummaries.mock.calls[0][0];
            const updatedList = updater(mockRecipes);
            expect(updatedList).toEqual([
                ...mockRecipes.map(r => r.id === 1 ? { ...r, visible: true } : { ...r, visible: false }),
            ]);
        })

        test('カテゴリIDが一致するレシピを表示する', () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ categoryIds: '1,2' }))
            })

            const { result } = renderUseRecipeSearchForm();

            act(() => {
                result.current.search();
            })

            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?categoryIds=1%2C2');

            const updater = mockSetRecipeSummaries.mock.calls[0][0];
            const updatedList = updater(mockRecipes);
            expect(updatedList).toEqual([
                ...mockRecipes.map(r => (r.categoryId === 1 || r.categoryId === 2) ? { ...r, visible: true } : { ...r, visible: false }),
            ]);
        })

        test('キーワードとカテゴリIDの両方に一致するレシピを表示する', () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ keyword: 'レシピ4', categoryIds: '1' }))
            })

            const { result } = renderUseRecipeSearchForm();

            act(() => {
                result.current.search();
            })

            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=%E3%83%AC%E3%82%B7%E3%83%944&categoryIds=1');

            const updater = mockSetRecipeSummaries.mock.calls[0][0];
            const updatedList = updater(mockRecipes);
            expect(updatedList).toEqual([
                ...mockRecipes.map(r => (r.categoryId === 1 && r.name.includes('レシピ4')) ? { ...r, visible: true } : { ...r, visible: false }),
            ]);
        })
    })
})
