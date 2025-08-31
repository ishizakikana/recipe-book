import BulkToggleStatusButton from '@/components/features/contents/list/components/buttons/button/BulkToggleStatusButton';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockUpdateAll = fn(async (isDone, onFinally) => {
    await setTimeout(() => onFinally(), 1000);
})

const mockUseItemList = () => ({
    create: fn(),
    update: fn(),
    updateAll: mockUpdateAll,
    deleteAll: fn(),
})

const meta: Meta<typeof BulkToggleStatusButton> = {
    title: 'Features/List/Buttons/Button/BulkToggleStatusButton',
    component: BulkToggleStatusButton,
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={[]} initialListItems={[]}>
                <Story />
            </ListContextProvider>
        )
    ],
    argTypes: {
        markAsDone: {
            control: 'boolean',
            description: '完了状態に切り替え',
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
        useItemList: {
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: 'useItemList' }
            }
        }
    },
    args: {
        useItemList: mockUseItemList
    }
}

export default meta;
type Story = StoryObj<typeof BulkToggleStatusButton>;

export const Desktop: Story = {
    parameters: {
        docs: {
            description: {
                story: 'デスクトップ'
            },
            source: {
                code: '<BulkToggleStatusButton />'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: 'すべて未完了' });

        await userEvent.click(button);

        expect(mockUpdateAll).toHaveBeenCalledTimes(1);

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
                code: '<BulkToggleStatusButton mobile />'
            }
        }
    },
    args: {
        mobile: true
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByText('すべて未完了');

        await userEvent.click(button);

        expect(mockUpdateAll).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}

export const MarkAsDone: Story = {
    parameters: {
        docs: {
            description: {
                story: '完了状態に切り替え'
            },
            source: {
                code: '<BulkToggleStatusButton markAsDone />'
            }
        }
    },
    args: {
        markAsDone: true
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <BulkToggleStatusButton {...args} />
            <BulkToggleStatusButton {...args} mobile />
        </Stack>
    )
}

export const MarkAsUnDone: Story = {
    parameters: {
        docs: {
            description: {
                story: '未完了状態に切り替え'
            },
            source: {
                code: '<BulkToggleStatusButton />'
            }
        }
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <BulkToggleStatusButton {...args} />
            <BulkToggleStatusButton {...args} mobile />
        </Stack>
    )
}