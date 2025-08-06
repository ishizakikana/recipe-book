import { User } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import Menu from '../../../../header/components/menu/Menu';

const mockUser: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

const meta: Meta<typeof Menu> = {
    title: 'Features/Common/Header/Menu',
    component: Menu,
    argTypes: {
        user: {
            description: 'ユーザー情報'
        }
    },
    args: {
        user: mockUser
    },
    parameters: {
        docs: {
            source: {
                code: '<Menu user={user} />'
            }
        }
    },
}

export default meta;
type Story = StoryObj<typeof Menu>

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const openButton = await canvas.findByRole('button', { name: 'メニューを開く' });
        await userEvent.click(openButton);

        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
    }
}