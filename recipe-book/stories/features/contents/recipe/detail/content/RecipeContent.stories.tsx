import RecipeContent from '@/components/features/contents/recipe/components/detail/content/RecipeContent';
import { RecipeDetail } from '@/types/viewModel';
import { Box } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';

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
        },
        { id: 3, text: '手順3', seasonings: [], stepNumber: 3, recipeId: 1 }
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

export const Default: Story = {}