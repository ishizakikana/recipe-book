import Header from '@/components/features/common/header/components/Header';
import { User } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const mockUser: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

const meta: Meta<typeof Header> = {
    title: 'Components/Features/Common/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<Header user={user} />'
            }
        }
    },
    argTypes: {
        user: {
            description: 'ユーザー情報',
            table: {
                category: 'data'
            }
        }
    },
    args: {
        user: mockUser
    }
}

export default meta;
type Story = StoryObj<typeof Header>

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.getByText('RECIPE BOOK')).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument();
    }
}