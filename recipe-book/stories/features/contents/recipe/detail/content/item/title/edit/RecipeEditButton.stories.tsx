import RecipeEditButton from "@/components/features/contents/recipe/components/detail/content/item/title/edit/RecipeEditButton";
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "@storybook/testing-library";
import { mockPush } from "../../../../../../../../__mocks__/router";

const meta: Meta<typeof RecipeEditButton> = {
    title: 'Features/Recipe/Detail/Content/Item/Header/Edit/RecipeEditButton',
    component: RecipeEditButton,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditButton />'
            }
        }
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