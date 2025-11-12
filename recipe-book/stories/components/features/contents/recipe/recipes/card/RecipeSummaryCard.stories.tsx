import RecipeSummaryCard from '@/components/features/contents/recipe/components/recipes/card/RecipeSummaryCard';
import { RecipeSummary } from '@/types/viewModel';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { mockPush } from '../../../../../../__mocks__/router';

const mockRecipe: RecipeSummary = {
    id: 1,
    name: 'しらたき塩焼きそば',
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/huftga6tcppne7md6q70.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    categoryId: 1,
    category: { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    keywords: [],
    visible: true
}

const meta: Meta<typeof RecipeSummaryCard> = {
    title: 'Components/Features/Recipe/Recipes/Card/RecipeSummaryCard',
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

        // 表示確認
        const recipeName = canvas.getByText(mockRecipe.name);
        expect(recipeName).toBeInTheDocument();

        const image = await canvas.findByRole('img');
        expect(image).toHaveAttribute('src', 'https://res.cloudinary.com/drf6p5cyv/image/upload/huftga6tcppne7md6q70.jpg');
        expect(image).toHaveAttribute('alt', 'しらたき塩焼きそばの画像');

        const categoryChip = canvas.getByText(mockRecipe.category.name);
        expect(categoryChip).toBeInTheDocument();

        const shelfLife = canvas.getByText(mockRecipe.shelfLife as string);
        expect(shelfLife).toBeInTheDocument();

        image.click();
        expect(mockPush).toHaveBeenCalledWith('/recipe/1');
    }
}