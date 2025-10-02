import RecipeEditCard from '@/components/features/contents/recipe/components/edit/RecipeEditCard';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
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

const meta: Meta<typeof RecipeEditCard> = {
    title: 'Features/Recipe/Edit/RecipeEditCard',
    component: RecipeEditCard,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditCard />'
            }
        },
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider initialRecipes={[]} recipeCategories={[]}>
                <Story />
            </RecipeContextProvider>
        )
    ],
}



export default meta;
type Story = StoryObj<typeof RecipeEditCard>;

export const Default: Story = {}