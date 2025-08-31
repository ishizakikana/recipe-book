
import RecipeDetailCard from '@/components/features/contents/recipe/components/detail/RecipeDetailCard';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeDetail, RecipeSummary } from '@/types/viewModel';
import { Stack } from '@mui/material';
import { RecipeCategory } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';

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

const meta: Meta<typeof RecipeDetailCard> = {
    title: 'Features/Recipe/Detail/RecipeDetailCard',
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
            <RecipeContextProvider recipeCategories={mockRecipeCategories} initialRecipes={mockRecipes}>
                <Stack width='100%' height='100%'>
                    <Stack p={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </RecipeContextProvider>
        )],
    argTypes: {
        initialValue: {
            control: false,
            description: 'レシピ情報初期値',
            table: {
                category: 'data',
                type: { summary: 'RecipeDetail' }
            }
        }
    },
    args: {
        initialValue: mockRecipe
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDetailCard>;

export const Default: Story = {}