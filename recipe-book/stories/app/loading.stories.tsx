import Loading from '@/app/loading';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const meta: Meta<typeof Loading> = {
    title: 'App/Loading',
    component: Loading
}

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const loading = await canvas.findByRole('progressbar');

        // 表示確認
        expect(loading).toBeInTheDocument();
    }
}