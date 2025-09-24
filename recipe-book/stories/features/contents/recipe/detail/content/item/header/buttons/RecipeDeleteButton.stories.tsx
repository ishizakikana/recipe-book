import RecipeDeleteButton from '@/components/features/contents/recipe/components/detail/content/item/header/buttons/RecipeDeleteButton';
import RecipeEditButton from "@/components/features/contents/recipe/components/detail/content/item/header/buttons/RecipeEditButton";
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "@storybook/testing-library";
import { mockPush } from "../../../../../../../../__mocks__/router";

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
    argTypes: {
        recipeId: {
            control: false,
            description: 'レシピID',
            table: {
                category: 'props',
                type: { summary: 'number' }
            }
        },
        recipeName: {
            control: 'text',
            description: 'レシピ名',
            table: {
                category: 'props',
                type: { summary: 'string' }
            }
        }
    },
    args: {
        recipeId: 1,
        recipeName: 'レシピ名'
    }
}

export default meta;
type Story = StoryObj<typeof RecipeEditButton>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        expect(mockPush).toHaveBeenCalled();
    }
}