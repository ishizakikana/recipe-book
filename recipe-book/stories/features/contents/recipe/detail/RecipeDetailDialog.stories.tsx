import RecipeDetailDialog from '@/components/features/contents/recipe/components/detail/RecipeDetailDialog';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { RecipeCategory } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockRecipeCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
]

const mockRecipes: RecipeSummary[] = [
    {
        id: 1,
        name: 'レシピ1',
        categoryId: 1,
        category: { id: 1, name: '主食', icon: '', color: '' },
        imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
        shelfLife: '冷蔵保存3日',
        calories: 100,
        keywords: ['keyword1', 'keyword2'],
        visible: true
    },
    {
        id: 2,
        name: 'レシピ2',
        categoryId: 1,
        category: { id: 1, name: '主食', icon: '', color: '' },
        imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
        shelfLife: '冷蔵保存3日',
        calories: 100,
        keywords: ['keyword1', 'keyword2'],
        visible: true
    }
]

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    categoryId: 1,
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: '000101', name: '材料1', volume: '100g', recipeId: 1 },
        { id: '000102', name: '材料2', volume: '200g', recipeId: 1 }
    ],
    steps: [
        { id: 1, text: '手順1', seasonings: [], stepNumber: 1, recipeId: 1 },
        {
            id: 2, text: '手順2', seasonings: [
                { id: '000201', name: '調味料1', volume: '大さじ1', stepId: 2 },
                { id: '000202', name: '調味料2', volume: '小さじ2', stepId: 2 }
            ], stepNumber: 2, recipeId: 1
        }
    ]
}

const mockOnClose = fn();
const mockUseRecipeModal = () => ({
    open: true,
    onClose: mockOnClose
})

const meta: Meta<typeof RecipeDetailDialog> = {
    title: 'Features/Recipe/Detail/RecipeDetailDialog',
    component: RecipeDetailDialog,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<RecipeDetailDialog initialValue={recipe} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider recipeCategories={mockRecipeCategories} initialRecipes={mockRecipes}>
                <Story />
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        initialValue: {
            control: false,
            description: 'レシピ情報初期値',
            table: {
                category: 'data',
                type: { summary: 'RecipeDetail' }
            }
        },
        useRecipeModal: {
            control: false,
            description: 'Storybookテスト用',
            table: {
                category: '-',
            }
        }
    },
    args: {
        initialValue: mockRecipe,
        useRecipeModal: mockUseRecipeModal
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDetailDialog>

export const Default: Story = {
    play: async () => {
        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        } else {
            throw new Error('Backdrop not found');
        }

        // ダイアログ非表示処理が呼び出されたかどうか
        expect(mockOnClose).toHaveBeenCalled();
    }
}
