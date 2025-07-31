import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn, } from 'storybook/test';
import DeleteButton from '../../../buttons/button/DeleteButton';

const meta: Meta<typeof DeleteButton> = {
    title: 'Features/List/Buttons/Button/DeleteButton',
    component: DeleteButton,
    args: {
        deleteAll: fn((onFinally) => {
            setTimeout(() => onFinally(), 1000);
        }),
        mobile: false
    },
    argTypes: {
        deleteAll: {
            action: 'deleteAll',
            description: '全リストアイテム削除関数',
            table: {
                category: 'function'
            }
        },
        mobile: {
            control: 'boolean',
            description: 'モバイル表示かどうか',
            table: {
                category: 'props'
            }
        }
    },
    parameters: {
        docs: {
            source: {
                code: '<DeleteButton deleteAll={deleteAll} />'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Desktop: Story = {
    parameters: {
        docs: {
            description: {
                story: 'デスクトップ'
            }
        }
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
}

export const ClickInteraction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'クリックテスト'
            }
        }
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: 'すべての完了済みを削除' });

        await userEvent.click(button);

        expect(args.deleteAll).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}