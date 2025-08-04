import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';
import StartButton from '../StartButton';

const mockOnNavigation = fn();

const meta: Meta<typeof StartButton> = {
    title: 'Features/Index/StartButton',
    component: StartButton,
    argTypes: {
        onNavigation: {
            description: 'Storybook テスト用コールバック',
            table: {
                category: '_'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof StartButton>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<StartButton />'
            }
        }
    },
    args: {
        onNavigation: mockOnNavigation
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: 'はじめる' });

        await userEvent.click(button);

        expect(mockOnNavigation).toHaveBeenCalledWith('/login');
    }
};