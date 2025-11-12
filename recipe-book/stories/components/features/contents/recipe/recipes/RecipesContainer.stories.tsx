import RecipesContainer from '@/components/features/contents/recipe/components/recipes/RecipesContainer';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { Box } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';

const mockRecipeSummaries: RecipeSummary[] = [{
    id: 1,
    name: 'しらたき塩焼きそば',
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/huftga6tcppne7md6q70.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    categoryId: 1,
    category: { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    keywords: [],
    visible: true
},
{
    id: 2,
    name: '鶏むね肉の照り焼き',
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.png',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    categoryId: 1,
    category: { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    keywords: [],
    visible: true
}]

const mockRecipeCategories = [
    { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    { id: 2, name: '副菜', icon: 'salad', color: 'green' },
    { id: 3, name: '肉', icon: 'bacon', color: 'red' },
]

const meta: Meta<typeof RecipesContainer> = {
    title: 'Components/Features/Recipe/Recipes/RecipesContainer',
    component: RecipesContainer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<RecipesContainer />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider initialRecipes={mockRecipeSummaries} recipeCategories={mockRecipeCategories}>
                <Box sx={{ py: 3 }}>
                    <Story />
                </Box>
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        useRecipeContext: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: '_' }
            }
        }
    },
    args: {
        useRecipeContext: () => ({
            recipeDetail: { id: 1 } as RecipeDetail,
            recipeSummaries: mockRecipeSummaries,
            recipeCategories: mockRecipeCategories,
            setRecipeDetail: () => { },
            setRecipeSummaries: () => { },
            setRecipeCategories: () => { },
        })
    }
}

export default meta;
type Story = StoryObj<typeof RecipesContainer>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const card1 = canvas.getByText('しらたき塩焼きそば');
        expect(card1).toBeInTheDocument();

        const card2 = canvas.getByText('鶏むね肉の照り焼き');
        expect(card2).toBeInTheDocument();

        const searchAccordion = canvas.getByText('検索');
        expect(searchAccordion).toBeInTheDocument();
    }
}