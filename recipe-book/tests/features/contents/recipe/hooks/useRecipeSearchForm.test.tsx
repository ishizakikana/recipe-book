import { useRecipeSearchForm } from '@/components/features/contents/recipe/hooks/useRecipeSearchForm';
import { RecipeContext } from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { RecipeSummary } from '@/types/entity';
import { RecipeCategory } from '@prisma/client';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// todo テスト
const mockRecipes: RecipeSummary[] = [
    {
        id: 1,
        name: 'レシピ1',
        imageUrl: '',
        shelfLife: '冷蔵3日',
        calories: 100,
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

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/hooks/useQueryParams');

describe('useRecipeSearchForm', () => {
    const mockPush = jest.fn();
    const mockSetRecipes = jest.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <RecipeContext.Provider
            value={{ recipes: mockRecipes, recipeCategories: mockCategories, setRecipes: mockSetRecipes }}>
            {children}
        </RecipeContext.Provider>
    )

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    })


    describe('form', () => {
        test('GETパラメータが設定されていないとき、初期値が空', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({}))
            })

            const { result } = renderHook(() => useRecipeSearchForm(), { wrapper });

            expect(result.current.form).toEqual({ keyword: '', categoryIds: [] });
            expect(result.current.isSearch).toBe(false);
            expect(mockPush).toHaveBeenCalledWith('/recipe?');
        })

        test('GETパラメータがすべて設定されているとき、初期値が設定される', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ keyword: 'test', categoryIds: '1,2' }))
            })

            const { result } = renderHook(() => useRecipeSearchForm(), { wrapper });

            expect(result.current.form).toEqual({ keyword: 'test', categoryIds: [1, 2] });
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=test&categoryIds=1%2C2');
        })

        test('keyword のみ設定されているとき、初期値が設定される', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ keyword: 'test' }))
            })

            const { result } = renderHook(() => useRecipeSearchForm(), { wrapper });

            expect(result.current.form).toEqual({ keyword: 'test', categoryIds: [] });
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=test');
        })

        test('categoryIds のみ設定されているとき、初期値が設定される', async () => {
            (useQueryParams as jest.Mock).mockReturnValue({
                getParams: jest.fn(() => ({ categoryIds: '1,2' }))
            })

            const { result } = renderHook(() => useRecipeSearchForm(), { wrapper });

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

            const { result } = renderHook(() => useRecipeSearchForm(), { wrapper });

            act(() => {
                result.current.setFormValue('keyword', 'test');
            })

            expect(result.current.form.keyword).toBe('test');
            expect(result.current.isSearch).toBe(true);
            expect(mockPush).toHaveBeenCalledWith('/recipe?keyword=test');
        })
    })
})
