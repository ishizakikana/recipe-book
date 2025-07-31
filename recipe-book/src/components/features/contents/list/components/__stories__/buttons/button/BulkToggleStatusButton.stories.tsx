import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';
import BulkToggleStatusButton from '../../../buttons/button/BulkToggleStatusButton';

const meta: Meta<typeof BulkToggleStatusButton> = {
    title: 'Features/List/Buttons/Button/BulkToggleStatusButton',
    component: BulkToggleStatusButton,
    args: {
        markAsDone: false,
        mobile: false,
        updateAll: fn((isDone, onFinally) => {
            setTimeout(() => onFinally(), 1000);
        })
    },
    argTypes: {
        markAsDone: {
            control: 'boolean',
            description: '完了状態に切り替えるかどうか',
            table: {
                category: 'props'
            }
        },
        mobile: {
            control: 'boolean',
            description: 'モバイル表示',
            table: {
                category: 'props'
            }
        },
        updateAll: {
            action: 'updateAll',
            description: '全リストアイテム更新関数',
            table: {
                category: 'function'
            }
        }
    },
    parameters: {
        docs: {
            source: {
                code: `<BulkToggleStatusButton
                            markAsDone={false}
                            updateAll={updateAll} />`.trim()
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof BulkToggleStatusButton>;

export const Desktop: Story = {
    parameters: {
        docs: {
            description: {
                story: 'デスクトップ'
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <BulkToggleStatusButton {...args} />
            <BulkToggleStatusButton {...args} markAsDone />
        </Stack>
    )
}

export const Mobile: Story = {
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            },
            source: {
                code: `<BulkToggleStatusButton
                            markAsDone={false}
                            mobile
                            updateAll={updateAll} />`.trim()
            }
        }
    },
    args: {
        mobile: true
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <BulkToggleStatusButton {...args} mobile />
            <BulkToggleStatusButton {...args} markAsDone mobile />
        </Stack>
    )
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
        const button = await canvas.findByRole('button', { name: 'すべて未完了' });

        await userEvent.click(button);

        expect(args.updateAll).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}