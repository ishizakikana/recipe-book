import IngredientList from '@/components/features/contents/recipe/components/detail/content/item/IngredientList';
import { RecipeIngredient } from '@/types/viewModel';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const mockIngredients: RecipeIngredient[] = [
    { id: '000101', name: 'レシピ材料1', volume: '100g', recipeId: 1 },
    { id: '000102', name: 'レシピ材料2', volume: '200g', recipeId: 1 },
    { id: '000103', name: 'レシピ材料3', volume: '300g', recipeId: 1 },
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

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const ingredient = await canvas.findAllByRole('listitem', { name: 'ingredients-item' });

        expect(ingredient).toHaveLength(3);
    }
}

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
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 材料リストが存在しないこと
        const ingredients = await canvas.queryAllByRole('listitem', { name: 'ingredients-item' });
        expect(ingredients).toHaveLength(0);
    }
}