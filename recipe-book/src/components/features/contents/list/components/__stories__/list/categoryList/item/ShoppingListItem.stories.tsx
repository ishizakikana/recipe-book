import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { waitFor } from '@testing-library/react';
import { useState } from 'react';
import { fn } from 'storybook/test';
import ShoppingListItem from '../../../../list/categoryList/item/ShoppingListItem';

const listItem = { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false };
const mockUpdate = fn();

const meta: Meta<typeof ShoppingListItem> = {
    title: 'Features/List/List/Category/Item/ShoppingListItem',
    component: ShoppingListItem,
    parameters: {
        docs: {
            source: {
                code: `<ShoppingListItem
                            item={item}
                            update={update} />`.trim()
            }
        }
    },
    argTypes: {
        item: {
            control: false,
            description: 'リストアイテム',
            table: { category: 'data' }
        },
        update: {
            control: false,
            description: 'リストアイテム更新関数',
            table: { category: 'function' }
        }
    },
    args: {
        item: listItem,
        update: (id, isDone, onFinally) => {
            onFinally();
        }
    }
};

export default meta;
type Story = StoryObj<typeof ShoppingListItem>;

export const Default: Story = {}

export const Checked: Story = {
    parameters: {
        docs: {
            description: {
                story: 'チェック済み'
            }
        }
    },
    args: {
        item: { ...listItem, isDone: true }
    }
}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング状態'
            }
        }
    },
    args: {
        update: () => {
            // onFinallyを呼ばないことでローディング状態を維持
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkbox = await canvas.findByRole('checkbox');
        await userEvent.click(checkbox);
    }
}

export const ClickInteraction: Story = {
    render: () => {
        const [item, setItem] = useState(listItem);

        const update = (id: number, isDone: boolean, onFinally: () => void) => {
            setItem(prev => ({ ...prev, isDone }));
            mockUpdate(id, isDone);
            onFinally();
        };

        return (
            <ShoppingListItem
                item={item}
                update={update} />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'クリックテスト'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkbox = await canvas.findByRole('checkbox');

        await userEvent.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(mockUpdate).toHaveBeenCalledWith(listItem.id, true);
    }
}

export const IgnoreWhenLoading: Story = {
    render: () => {
        const [loading, setLoading] = useState(false);
        const [item, setItem] = useState(listItem);

        const update = (id: number, isDone: boolean, onFinally: () => void) => {
            if (loading) {
                console.log('loading');
                return; // すでに処理中の場合は何もしない
            }

            setLoading(true);
            setTimeout(() => {
                setItem(prev => ({ ...prev, isDone }));
                setLoading(false);
                onFinally();
            }, 500);
        };

        return (
            <ShoppingListItem item={item} update={update} />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'ローディング状態でのクリック無視'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkbox = await canvas.findByRole('checkbox');

        await userEvent.click(checkbox);
        await userEvent.click(checkbox);

        await waitFor(() => {
            expect(checkbox).not.toBeChecked();
        }, { timeout: 1000 });
    }
}