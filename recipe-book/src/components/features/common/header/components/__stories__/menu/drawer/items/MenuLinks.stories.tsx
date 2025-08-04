import { Meta, StoryObj } from '@storybook/nextjs';
import { expect, fn, userEvent, within } from 'storybook/test';
import MenuLinks from '../../../../menu/drawer/items/MenuLinks';

const meta: Meta<typeof MenuLinks> = {
    title: 'Features/Common/Header/Menu/Drawer/Items/MenuLinks',
    component: MenuLinks,
    globals: {
        backgrounds: { value: 'dark' }
    },
    argTypes: {
        onNavigation: {
            description: 'Storybook テスト用コールバック',
            table: {
                category: '_'
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
        onNavigation: fn()
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const recipeButton = await canvas.findByRole('button', { name: 'レシピ' });
        const calendarButton = await canvas.findByRole('button', { name: 'カレンダー' });
        const listButton = await canvas.findByRole('button', { name: '買い物リスト' });

        await userEvent.click(recipeButton);
        await userEvent.click(calendarButton);
        await userEvent.click(listButton);

        expect(args.onNavigation).toHaveBeenCalledWith('/recipe');
        expect(args.onNavigation).toHaveBeenCalledWith('/calendar');
        expect(args.onNavigation).toHaveBeenCalledWith('/list');
    }
}