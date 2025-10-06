import IngredientList from '@/components/features/contents/recipe/components/detail/content/item/IngredientList';
import { RecipeIngredient } from '@/types/viewModel';
import { Box } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const mockIngredients: RecipeIngredient[] = [
    { id: '000101', name: 'レシピ材料1', volume: '100g' },
    { id: '000102', name: 'レシピ材料2', volume: '200g' },
    { id: '000103', name: 'レシピ材料3', volume: '300g' },
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

        // 表示確認
        mockIngredients.forEach(ingredient => {
            expect(canvas.getByText(ingredient.name)).toBeInTheDocument();

            if (ingredient.volume) {
                expect(canvas.getByText(ingredient.volume)).toBeInTheDocument();
            }
        });
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

        // 材料リストが存在しない
        expect(canvas.queryByRole('list', { name: '材料リスト' })).not.toBeInTheDocument();
    }
}