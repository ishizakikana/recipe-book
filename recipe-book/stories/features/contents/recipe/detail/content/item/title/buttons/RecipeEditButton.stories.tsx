import RecipeEditButton from "@/components/features/contents/recipe/components/detail/content/item/title/buttons/RecipeEditButton";
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "@storybook/testing-library";
import { mockPush } from "../../../../../../../../__mocks__/router";

const meta: Meta<typeof RecipeEditButton> = {
    title: 'Features/Recipe/Detail/Content/Item/Header/Buttons/RecipeEditButton',
    component: RecipeEditButton,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditButton recipeId={recipeId} />'
            }
        }
    },
    argTypes: {
        recipeId: {
            control: false,
            description: 'レシピID',
            table: {
                category: 'props',
            }
        }
    },
    args: {
        recipeId: 1
    }
}

export default meta;
type Story = StoryObj<typeof RecipeEditButton>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        expect(mockPush).toHaveBeenCalledWith('/recipe/1/edit');
    }
}