import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';
import MenuLinks from '../../../menu/items/MenuLinks';

const mockNavigateTo = fn((path: string) => { });
const mockUseNavigation = () => ({
    navigateTo: mockNavigateTo,
    navigateAppend: fn()
});

const meta: Meta<typeof MenuLinks> = {
    title: 'Features/Common/Header/Menu/Items/MenuLinks',
    component: MenuLinks,
    globals: {
        backgrounds: { value: 'dark' }
    },
    argTypes: {
        useNavigation: {
            control: false,
            description: 'Storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: 'useNavigation' }
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof MenuLinks>

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<MenuLinks />'
            }
        }
    },
    args: {
        useNavigation: mockUseNavigation
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const recipeButton = await canvas.findByRole('button', { name: 'レシピ' });
        const calendarButton = await canvas.findByRole('button', { name: 'カレンダー' });
        const listButton = await canvas.findByRole('button', { name: '買い物リスト' });

        await userEvent.click(recipeButton);
        await userEvent.click(calendarButton);
        await userEvent.click(listButton);

        expect(mockNavigateTo).toHaveBeenCalledWith('/recipe');
        expect(mockNavigateTo).toHaveBeenCalledWith('/calendar');
        expect(mockNavigateTo).toHaveBeenCalledWith('/list');
    }
}