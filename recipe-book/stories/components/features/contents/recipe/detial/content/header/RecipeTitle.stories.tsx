import RecipeTitle from '@/components/features/contents/recipe/components/detail/content/item/header/RecipeTitle';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeDetail } from '@/types/viewModel';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';

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

const meta: Meta<typeof RecipeTitle> = {
    title: 'Components/Features/Recipe/Detail/Content/Item/Header/RecipeTitle',
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

        // 表示確認
        expect(canvas.getByText(mockRecipe.name)).toBeInTheDocument();
        expect(canvas.getByText(mockRecipe.category.name)).toBeInTheDocument();
        expect(canvas.getByText(mockRecipe.shelfLife ? mockRecipe.shelfLife : '')).toBeInTheDocument();
        expect(canvas.getByText(mockRecipe.calories ? `${mockRecipe.calories}kcal` : '')).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: '編集' })).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: '削除' })).toBeInTheDocument();
    }
}