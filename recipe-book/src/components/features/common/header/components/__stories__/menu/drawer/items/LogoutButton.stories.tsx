import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect, fn, userEvent, within } from 'storybook/test';
import LogoutButton from '../../../../menu/drawer/items/LogoutButton';

const meta: Meta<typeof LogoutButton> = {
    title: 'Features/Common/Header/Menu/Drawer/Items/LogoutButton',
    component: LogoutButton,
    argTypes: {
        onLogout: {
            description: 'Storybook テスト用コールバック',
            table: {
                category: '_'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<LogoutButton />'
            }
        }
    },
    args: {
        onLogout: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { 'name': 'ログアウト' });

        await userEvent.click(button);

        expect(args.onLogout).toHaveBeenCalled();
    },
}
