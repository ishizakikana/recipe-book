import { Meta, StoryObj } from "@storybook/nextjs";
import RecipeEditButton from "./RecipeEditButton";

const meta: Meta<typeof RecipeEditButton> = {
    title: 'Features/Recipe/Detail/Container/Content/Item/RecipeTitle/EditButton',
    component: RecipeEditButton,
}

export default meta;
type Story = StoryObj<typeof RecipeEditButton>;

export const Default: Story = {}