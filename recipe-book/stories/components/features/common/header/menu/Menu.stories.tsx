import Menu from '@/components/features/common/header/components/menu/Menu';
import { User } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { screen } from '@testing-library/react';

const mockUser: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

const meta: Meta<typeof Menu> = {
    title: 'Components/Features/Common/Header/Menu',
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

        // メニューを開く
        const openButton = await canvas.findByRole('button', { name: 'メニューを開く' });
        await userEvent.click(openButton);

        // 表示確認
        expect(await screen.findByRole('navigation', { name: 'メニューリンクリスト' })).toBeVisible();
        expect(await screen.findByRole('button', { name: 'ログアウト' })).toBeVisible();
        expect(await screen.findByText('test user')).toBeVisible();

        // バックドロップをクリックしてメニューを閉じる
        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
    }
}