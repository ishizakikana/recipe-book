import BackButton from '@/components/features/contents/recipe/components/edit/BackButton';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { Box } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent } from '@storybook/testing-library';
import { within } from '@testing-library/react';
import { mockPush } from '../../../../../__mocks__/router';

const meta: Meta<typeof BackButton> = {
    title: 'Components/Features/Recipe/Edit/BackButton',
    component: BackButton,
    parameters: {
        docs: {
            source: {
                code: '<BackButton />'
            }
        },
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider initialRecipes={[]} recipeCategories={[]}>
                <Box display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={80}
                    height={80}
                    position="relative">
                    <Story />
                </Box>
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        onClick: {
            control: false,
            description: 'storybookテスト用',
        },
    }
}

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        // 表示確認
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', '戻る');

        // クリック
        await userEvent.click(button);
        expect(mockPush).toHaveBeenCalledWith('/recipe');
    },
}