import RecipeSummaryCard from '@/components/features/contents/recipe/components/recipes/RecipeSummaryCard';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { mockPush } from '../../../../__mocks__/router';

// todo visible

const mockRecipe = {
    id: 1,
    name: 'しらたき塩焼きそば',
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/huftga6tcppne7md6q70.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    category: { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    keywords: [],
    visible: true
}

const meta: Meta<typeof RecipeSummaryCard> = {
    title: 'Features/Recipe/List/RecipeSummaryCard',
    component: RecipeSummaryCard,
    parameters: {
        docs: {
            source: {
                code: '<RecipeCard recipe={recipe} />'
            }
        }
    },
    argTypes: {
        recipe: {
            control: false,
            description: 'レシピ情報',
            table: {
                category: 'data',
                type: { summary: 'RecipeSummary' },
            }
        }
    },
    args: {
        recipe: mockRecipe
    }
}

export default meta;
type Story = StoryObj<typeof RecipeSummaryCard>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const image = await canvas.findByRole('img');
        expect(image).toHaveAttribute('src', 'https://res.cloudinary.com/drf6p5cyv/image/upload/huftga6tcppne7md6q70.jpg');
        image.click();

        expect(mockPush).toHaveBeenCalledWith('/recipe/1');
    }
}