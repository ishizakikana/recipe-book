import { Meta, StoryObj } from '@storybook/nextjs';
import { expect, fn, userEvent, within } from 'storybook/test';
import OpenMenuButton from '../../../../../header/components/menu/open/OpenMenuButton';

const meta: Meta<typeof OpenMenuButton> = {
    title: 'Features/Common/Header/Menu/OpenMenuButton',
    component: OpenMenuButton,
    argTypes: {
        onClick: {
            description: 'クリックイベント',
            table: {
                category: 'event'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof OpenMenuButton>

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                <IconButton
                    icon={<MenuIcon />}
                    color='inherit'
                    aria-label='メニューを開く'
                    edge='start'
                    sx={{ mr: 2 }}
                    onClick={onClick} />
                `.trim()
            }
        }
    },
    args: {
        onClick: fn()
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: 'メニューを開く' });

        await userEvent.click(button);

        expect(args.onClick).toHaveBeenCalled();
    }
}