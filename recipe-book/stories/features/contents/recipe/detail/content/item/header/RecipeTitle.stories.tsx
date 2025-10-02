import RecipeTitle from '@/components/features/contents/recipe/components/detail/content/item/header/RecipeTitle';
import { RecipeContextType } from '@/components/features/contents/recipe/types/context';
import { RecipeDetail } from '@/types/viewModel';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    categoryId: 1,
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: '000101', name: 'レシピ材料1', volume: '100g', recipeId: 1 },
        { id: '000102', name: 'レシピ材料2', volume: '200g', recipeId: 1 },
        { id: '000103', name: 'レシピ材料3', volume: '300g', recipeId: 1 },
    ],
    steps: [
        { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [], recipeId: 1 },
        {
            id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
                { id: '00010201', name: '塩', volume: '少々' },
                { id: '00010202', name: 'にんにくチューブ', volume: '少々' },
            ],
            recipeId: 1
        },
        { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [], recipeId: 1 },
    ]
}

const mockRecipeContext: RecipeContextType = {
    recipeDetail: mockRecipe,
    recipeCategories: [],
    recipeSummaries: [],
    setRecipeDetail: fn(),
    setRecipeSummaries: fn()
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

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const name = await canvas.findByText(mockRecipe.name);
        const category = await canvas.findByText(mockRecipe.category.name);
        const shelfLife = await canvas.findByText(mockRecipe.shelfLife ? mockRecipe.shelfLife : '');
        const calories = await canvas.findByText(mockRecipe.calories ? `${mockRecipe.calories}kcal` : '');

        expect(name).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(shelfLife).toBeInTheDocument();
        expect(calories).toBeInTheDocument();
    }
}