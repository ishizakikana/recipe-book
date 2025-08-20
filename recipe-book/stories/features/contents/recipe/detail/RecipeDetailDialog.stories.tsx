import RecipeDetailDialog from '@/components/features/contents/recipe/components/detail/RecipeDetailDialog';
import { RecipeDetail } from '@/types/entity';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: 1, name: 'レシピ材料1', volume: '100g' },
        { id: 2, name: 'レシピ材料2', volume: '200g' },
        { id: 3, name: 'レシピ材料3', volume: '300g' },
    ],
    steps: [
        { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [] },
        {
            id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
                { id: 1, name: '塩', volume: '少々' },
                { id: 2, name: 'にんにくチューブ', volume: '少々' },
            ]
        },
        { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [] },
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
                code: `
                <RecipeDetailDialog 
                    recipe={recipe} 
                    open={open} 
                    onClose={onClose} />`.trim()
            }
        }
    },
    argTypes: {
        recipe: {
            control: false,
            description: 'レシピ情報',
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
        recipe: mockRecipe,
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
