import LogoutButton from '@/components/features/common/header/components/menu/items/LogoutButton';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockLogout = fn();
const mockUseLogout = () => ({ logout: mockLogout });

const meta: Meta<typeof LogoutButton> = {
    title: 'Features/Common/Header/Menu/Items/LogoutButton',
    component: LogoutButton,
    argTypes: {
        useLogout: {
            control: false,
            description: 'Storybookテスト用',
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
        useLogout: mockUseLogout
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { 'name': 'ログアウト' });

        await userEvent.click(button);

        expect(mockLogout).toHaveBeenCalled();
    },
}
