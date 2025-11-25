import RecipeEditCard from '@/components/features/contents/recipe/components/edit/RecipeEditCard';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof RecipeEditCard> = {
    title: 'Components/Features/Recipe/Edit/RecipeEditCard',
    component: RecipeEditCard,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditCard />'
            }
        },
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider initialRecipes={[]} recipeCategories={[]}>
                <Story />
            </RecipeContextProvider>
        )
    ],
}



export default meta;
type Story = StoryObj<typeof RecipeEditCard>;

export const Default: Story = {}