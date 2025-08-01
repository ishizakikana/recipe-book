import { recipeDetailSample } from '@/stories/sample/RecipeDetail';
import { Meta, StoryObj } from '@storybook/nextjs';
import RecipeDetailCard from '../../detail/RecipeDetailCard';

const meta: Meta<typeof RecipeDetailCard> = {
    title: 'Features/Recipe/Detail/RecipeDetailCard',
    component: RecipeDetailCard,
    parameters: {
        docs: {
            source: {
                code: '<RecipeDetailCard recipe={recipe} />'
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
            }
        }
    },
    args: {
        recipe: recipeDetailSample
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDetailCard>;

export const Default: Story = {}