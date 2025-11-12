import IndexPage from '@/app/page';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const meta: Meta<typeof IndexPage> = {
    title: 'App/IndexPage',
    component: IndexPage
}

export default meta;
type Story = StoryObj<typeof IndexPage>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.getByText('RECIPE BOOK')).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: 'はじめる' })).toBeInTheDocument();
    }
}; 