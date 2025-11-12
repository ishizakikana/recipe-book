import StartButton from '@/components/features/index/components/StartButton';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { mockPush } from '../../../__mocks__/router';

const meta: Meta<typeof StartButton> = {
    title: 'Components/Features/Index/StartButton',
    component: StartButton,
    parameters: {
        docs: {
            source: {
                code: '<StartButton />'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof StartButton>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // クリック
        const button = await canvas.findByRole('button', { name: 'はじめる' });
        await userEvent.click(button);
        expect(mockPush).toHaveBeenCalledWith('/login');
    }
}