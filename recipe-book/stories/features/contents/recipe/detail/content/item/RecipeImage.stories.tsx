import RecipeImage from '@/components/features/contents/recipe/components/detail/content/item/RecipeImage';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const meta: Meta<typeof RecipeImage> = {
    title: 'Features/Recipe/Detail/Content/Item/RecipeImage',
    component: RecipeImage,
    parameters: {
        docs: {
            source: {
                code: '<RecipeImage imageUrl={imageUrl} recipeName={recipeName} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <Stack width='400px' height='230px'>
                <Story />
            </Stack >
        ),
    ],
    argTypes: {
        imageUrl: {
            control: false,
            description: 'レシピ画像URL',
            table: {
                category: 'data',
                type: { summary: 'string' }
            }
        },
        recipeName: {
            control: false,
            description: 'レシピ名',
            table: {
                category: 'data',
                type: { summary: 'string' }
            }
        }
    },
    args: {
        imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
        recipeName: 'レシピ1'
    }
}

export default meta;
type Story = StoryObj<typeof RecipeImage>

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const image = await canvas.findByRole('img', { name: 'レシピ1の画像' });

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', expect.stringContaining('https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg'));
    }
}