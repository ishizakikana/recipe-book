import DeleteButton from '@/components/features/contents/list/components/buttons/button/DeleteButton';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { action } from 'storybook/internal/actions';
import { fn, } from 'storybook/test';

const mockDeleteAll = fn(async (onFinally) => {
    setTimeout(() => onFinally(), 1000);
    action('deleteAll')();
});

const meta: Meta<typeof DeleteButton> = {
    title: 'Features/List/Buttons/Button/DeleteButton',
    component: DeleteButton,
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={[]} initialListItems={[]}>
                <Story />
            </ListContextProvider>
        )
    ],
    argTypes: {
        mobile: {
            control: 'boolean',
            description: 'モバイル表示',
            table: {
                category: 'props'
            }
        },
        propDeleteAll: {
            description: 'storybookテスト用',
            table: {
                category: '-'
            }
        }
    },
    args: {
        propDeleteAll: mockDeleteAll
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
                code: '<DeleteButton />'
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
                code: '<DeleteButton mobile />'
            }
        }
    },
    args: {
        mobile: true
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByText('すべての完了済みを削除');

        await userEvent.click(button);

        expect(mockDeleteAll).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}