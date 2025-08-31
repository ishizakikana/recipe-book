import RecipeTitle from '@/components/features/contents/recipe/components/detail/content/item/title/RecipeTitle';
import { RecipeDetail } from '@/types/viewModel';
import { Stack } from '@mui/material';
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
        }
    ]
}

const meta: Meta<typeof RecipeTitle> = {
    title: 'Features/Recipe/Detail/Content/Item/Header/RecipeTitle',
    component: RecipeTitle,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<RecipeTitle recipe={recipe} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <Stack px={2} py={4}>
                <Story />
            </Stack>
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
type Story = StoryObj<typeof RecipeTitle>;

export const Default: Story = {}