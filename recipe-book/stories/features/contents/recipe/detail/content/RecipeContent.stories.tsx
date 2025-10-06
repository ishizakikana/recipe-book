import RecipeContent from '@/components/features/contents/recipe/components/detail/content/RecipeContent';
import { RecipeDetail } from '@/types/viewModel';
import { Box } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

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
            ]
        },
        { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [] },
    ]
}


const meta: Meta<typeof RecipeContent> = {
    title: 'Features/Recipe/Detail/Content/RecipeContent',
    component: RecipeContent,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<RecipeContent recipe={recipe} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <Box p={6}>
                <Story />
            </Box>
        )],
    argTypes: {
        recipe: {
            control: false,
            description: 'レシピ情報',
            table: {
                category: 'data',
                type: { summary: 'RecipeDetail' }
            }
        }
    },
    args: {
        recipe: mockRecipe
    }
}

export default meta;
type Story = StoryObj<typeof RecipeContent>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.getByRole('img', { name: `${mockRecipe.name}の画像` })).toBeInTheDocument();
        expect(canvas.getByRole('list', { name: '材料リスト' })).toBeInTheDocument();
        expect(canvas.getByRole('list', { name: '作業手順リスト' })).toBeInTheDocument();
    }
}