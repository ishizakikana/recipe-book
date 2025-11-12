
import RecipeDetailCard from '@/components/features/contents/recipe/components/detail/RecipeDetailCard';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeContextType } from '@/components/features/contents/recipe/types/context';
import { RecipeDetail } from '@/types/viewModel';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, within } from '@testing-library/react';
import { fn } from 'storybook/test';

const mockSetRecipeDetail = fn();

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: '000101', name: 'レシピ材料1', volume: '100g' },
        { id: '000102', name: 'レシピ材料2', volume: '200g' },
        { id: '000103', name: 'レシピ材料3', volume: '300g' },
    ],
    steps: [
        { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [] },
        {
            id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
                { id: '00010201', name: '塩', volume: '少々' },
                { id: '00010202', name: 'にんにくチューブ', volume: '少々' },
            ],
        },
        { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [] },
    ]
}

const mockRecipeContext: RecipeContextType = {
    recipeDetail: mockRecipe,
    recipeCategories: [],
    recipeSummaries: [],
    setRecipeDetail: mockSetRecipeDetail,
    setRecipeSummaries: fn()
}

const meta: Meta<typeof RecipeDetailCard> = {
    title: 'Components/Features/Recipe/Detail/RecipeDetailCard',
    component: RecipeDetailCard,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<RecipeDetailCard initialValue={recipe} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider recipeCategories={[]} initialRecipes={[]}>
                <Stack width='100%' height='100%'>
                    <Stack p={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        initialValue: {
            control: false,
            description: 'レシピ初期情報',
            table: {
                category: 'data',
                type: { summary: 'RecipeDetail' }
            }
        },
        useRecipeContext: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                type: { summary: '() => RecipeContext' }
            }
        }
    },
    args: {
        initialValue: mockRecipe
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDetailCard>;

export const Default: Story = {
    play: async () => {

        // コンテキストの値と初期値の id が一致するとき、コンテキストの値を変更しない
        expect(mockSetRecipeDetail).not.toHaveBeenCalled();

        // 表示確認
        expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
        expect(screen.getByRole('region', { name: 'レシピコンテンツ' })).toBeInTheDocument();
    }
}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング'
            }
        }
    },
    args: {
        initialValue: mockRecipe,
        useRecipeContext: () => ({
            ...mockRecipeContext,
            recipeDetail: {
                id: 999,
                name: 'レシピ1',
                categoryId: 0,
                category: { id: 0, name: '主食', icon: '', color: '' },
                imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
                shelfLife: '冷蔵保存3日',
                calories: 100,
                ingredients: [],
                steps: []
            },
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const loading = await canvas.findByRole('progressbar');

        // 表示チェック
        expect(loading).toBeInTheDocument();

        // コンテキストの値と初期値の id が一致しないとき、コンテキストの値を変更する
        expect(mockSetRecipeDetail).toHaveBeenCalled();
    },
}