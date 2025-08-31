import IngredientList from '@/components/features/contents/recipe/components/detail/content/item/IngredientList';
import { Box } from '@mui/material';
import { RecipeIngredient } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';

const mockIngredients: RecipeIngredient[] = [
    { id: '000101', name: '材料1', volume: '100g', recipeId: 1 },
    { id: '000102', name: '材料2', volume: '200g', recipeId: 1 },
    { id: '000103', name: '材料3', volume: null, recipeId: 1 }
]

const meta: Meta<typeof IngredientList> = {
    title: 'Features/Recipe/Detail/Content/Item/IngredientList',
    component: IngredientList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<IngredientList ingredients={ingredients} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <Box sx={{ px: 6, py: 2 }}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        ingredients: {
            control: false,
            description: '材料リスト',
            table: {
                category: 'data'
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