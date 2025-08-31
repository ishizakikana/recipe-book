import RecipeDeleteButton from "@/components/features/contents/recipe/components/detail/content/item/title/buttons/RecipeDeleteButton";
import RecipeContextProvider from "@/components/features/contents/recipe/providers/RecipeContextProvider";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof RecipeDeleteButton> = {
    title: 'Features/Recipe/Detail/Content/Item/Header/Buttons/RecipeDeleteButton',
    component: RecipeDeleteButton,
    parameters: {
        docs: {
            source: {
                code: '<RecipeDeleteButton recipeId={recipeId} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider recipeCategories={[]} initialRecipes={[]}>
                <Story />
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        recipeId: {
            control: false,
            description: 'レシピID',
            table: {
                category: 'props',
            }
        },
        recipeName: {
            control: 'text',
            description: 'レシピ名',
            table: {
                category: 'props',
            }
        }
    },
    args: {
        recipeId: 1,
        recipeName: 'レシピ1'
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDeleteButton>;

export const Default: Story = {};