import RecipeUpdateForm from '@/components/features/contents/recipe/components/edit/form/RecipeUpdateForm'
import { RecipeDetail } from '@/types/entity'
import { RecipeCategory } from '@prisma/client'
import { Meta, StoryObj } from '@storybook/nextjs'

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

const meta: Meta<typeof RecipeUpdateForm> = {
    title: 'Features/Recipe/Edit/Form/RecipeUpdateForm',
    component: RecipeUpdateForm,
    parameters: {
        docs: {
            source: {
                code: '<RecipeUpdateForm recipe={recipe} recipeCategories={recipeCategories} />'
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
            },
        },
        recipeCategories: {
            control: false,
            description: 'レシピカテゴリー情報',
            table: {
                category: 'data',
                type: { summary: 'RecipeCategory[]' }
            }
        },
        useRecipeEditForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                type: { summary: '() => FormReturn<RecipeUpdateFormInput>' }
            }
        }
    },
    args: {
        recipe: mockRecipe,
        recipeCategories: mockCategories,
        useRecipeEditForm: undefined
    }
}

export default meta;
type Story = StoryObj<typeof RecipeUpdateForm>;

export const Default: Story = {}