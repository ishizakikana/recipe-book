import RecipeEditCard from '@/components/features/contents/recipe/components/edit/RecipeEditCard';
import { RecipeContext } from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeDetail } from '@/types/entity';
import { RecipeCategory } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';

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

const mockCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
    { id: 2, name: '副菜', icon: '', color: '' },
    { id: 3, name: '主菜', icon: '', color: '' },
]

const meta: Meta<typeof RecipeEditCard> = {
    title: 'Features/Recipe/Edit/RecipeEditCard',
    component: RecipeEditCard,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditCard recipe={recipe} recipeCategories={recipeCategories} />'
            }
        },
    },
    decorators: [
        (Story) => (
            <RecipeContext.Provider value={{ recipes: [], recipeCategories: mockCategories, setRecipes: () => { } }}>
                {Story()}
            </RecipeContext.Provider>
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
type Story = StoryObj<typeof RecipeEditCard>;

export const Default: Story = {}