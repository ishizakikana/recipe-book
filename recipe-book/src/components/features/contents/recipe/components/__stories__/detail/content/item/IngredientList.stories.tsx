import { RecipeIngredient } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';
import IngredientList from '../../../../detail/content/item/IngredientList';

const mockIngredients: RecipeIngredient[] = [
    { id: 1, name: '砂糖', volume: '大さじ1', recipeId: 1, order: 1 },
    { id: 2, name: '醤油', volume: '大さじ1', recipeId: 1, order: 2 },
    { id: 3, name: 'みりん', volume: '大さじ1', recipeId: 1, order: 3 },
]

const meta: Meta<typeof IngredientList> = {
    title: 'Features/Recipe/Detail/Content/Item/IngredientList',
    component: IngredientList,
    parameters: {
        docs: {
            source: {
                code: '<IngredientList ingredients={ingredients} />'
            }
        }
    },
    argTypes: {
        ingredients: {
            control: false,
            description: '材料リスト',
            table: {
                category: 'data',
                type: { summary: '{ id: number, name: string, volume: string | null }[]' }
            }
        }
    },
    args: {
        ingredients: mockIngredients
    }
}

export default meta;
type Story = StoryObj<typeof IngredientList>;

export const Default: Story = {}

export const Empty: Story = {
    parameters: {
        docs: {
            description: {
                story: '空の材料リスト'
            }
        }
    },
    args: {
        ingredients: undefined
    }
}