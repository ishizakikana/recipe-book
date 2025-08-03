import RecipeEditButton from "@/components/features/contents/recipe/components/detail/content/item/title/edit/RecipeEditButton";
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "@storybook/testing-library";
import { fn } from 'storybook/test';

const mockNavigateAppend = fn();

const meta: Meta<typeof RecipeEditButton> = {
    title: 'Features/Recipe/Detail/Content/Item/Header/Edit/RecipeEditButton',
    component: RecipeEditButton,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditButton />'
            }
        }
    },
    argTypes: {
        useNavigation: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: {
                    summary: 'useNavigation'
                }
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof RecipeEditButton>;

export const Default: Story = {}

export const ClickInteraction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'クリックテスト'
            }
        }
    },
    args: {
        useNavigation: () => ({
            navigateTo: () => { },
            navigateAppend: mockNavigateAppend
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        expect(mockNavigateAppend).toHaveBeenCalled();
    }
}