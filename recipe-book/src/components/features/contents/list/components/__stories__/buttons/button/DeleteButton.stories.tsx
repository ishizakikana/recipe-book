import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn, } from 'storybook/test';
import DeleteButton from '../../../buttons/button/DeleteButton';

const mockDeleteAll = fn((onFinally) => {
    setTimeout(() => onFinally(), 1000);
});

const meta: Meta<typeof DeleteButton> = {
    title: 'Features/List/Buttons/Button/DeleteButton',
    component: DeleteButton,
    argTypes: {
        mobile: {
            control: 'boolean',
            description: 'モバイル表示',
            table: {
                category: 'props'
            }
        },
        deleteAll: {
            action: 'deleteAll',
            description: '全リストアイテム削除関数',
            table: {
                category: 'function'
            }
        }
    },
    args: {
        deleteAll: mockDeleteAll
    }
}

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Desktop: Story = {
    parameters: {
        docs: {
            description: {
                story: 'デスクトップ'
            },
            source: {
                code: '<DeleteButton deleteAll={deleteAll} />'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: 'すべての完了済みを削除' });

        await userEvent.click(button);

        expect(mockDeleteAll).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}

export const Mobile: Story = {
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            },
            source: {
                code: '<DeleteButton mobile deleteAll={deleteAll} />'
            }
        }
    },
    args: {
        mobile: true
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByText('すべての完了済みを削除');

        await userEvent.click(button);

        expect(mockDeleteAll).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}