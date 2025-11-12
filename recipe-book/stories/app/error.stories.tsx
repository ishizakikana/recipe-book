import Error from '@/app/error';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';
import { fn } from 'storybook/internal/test';

const mockReset = fn();

const meta: Meta<typeof Error> = {
    title: 'App/Error',
    component: Error,
    argTypes: {
        error: {
            control: { type: 'object' },
            description: 'エラー情報',
            table: {
                category: 'data'
            }
        },
        reset: {
            control: false,
            description: 'リセットイベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        error: { name: 'error', message: 'error message' },
        reset: mockReset
    }
}

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const error = await canvas.findByRole('heading', { name: 'エラーが発生しました。' });
        expect(error).toBeInTheDocument();

        const message = await canvas.findByText('error message');
        expect(message).toBeInTheDocument();

        // 再試行ボタンクリックイベント
        const button = await canvas.findByRole('button', { name: '再試行' });
        await button.click();
        expect(mockReset).toHaveBeenCalled();
    }
}