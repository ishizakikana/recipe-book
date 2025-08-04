import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { useState } from 'react';
import ShoppingListCard from '../ShoppingListCard';

const listCategories = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
    { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
    { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
]
const listItems = [
    { id: 1, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
    { id: 2, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
    { id: 3, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false },
    { id: 4, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false },
    { id: 5, name: '醤油', volume: '500ml', categoryId: 5, recipeName: null, isDone: false }
]

const categorizedItems = [
    {
        category: { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
        items: [
            { id: 1, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 2, name: '肉', icon: 'bacon', color: 'red' },
        items: [
            { id: 2, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false }
        ]
    }
]

const meta: Meta<typeof ShoppingListCard> = {
    title: 'Features/List/ShoppingListCard',
    component: ShoppingListCard,
    parameters: {
        docs: {
            source: {
                code: '<ShoppingListCard initialListItems={listItems} listCategories={listCategories} />'
            }
        }
    },
    argTypes: {
        listCategories: {
            control: false,
            description: 'リストカテゴリー',
            table: {
                category: 'data'
            }
        },
        initialListItems: {
            control: false,
            description: 'リストアイテム',
            table: {
                category: 'data'
            }
        },
        useItemListHook: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: {
                    summary: 'useItemList'
                }
            }
        }
    },
    args: {
        listCategories: listCategories,
        initialListItems: listItems,
    }
}

export default meta;
type Story = StoryObj<typeof ShoppingListCard>

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const addButton = canvas.getByRole('button', { name: '項目を追加' });
        await userEvent.click(addButton);

        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
    }
}

export const Mobile: Story = {
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            }
        },
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    globals: {
        viewport: { value: 'mobile1', isRotated: false }
    },
    play: async ({ canvasElement }) => {

        // 少し待ってからテスト開始（viewport適用を待つ）
        await new Promise(resolve => setTimeout(resolve, 1000));

        const canvas = within(canvasElement);
        const menuButton = await canvas.findByRole('button', { name: 'メニューを開く' });
        await userEvent.click(menuButton);
        const addButton = await screen.findByText('項目を追加');
        await userEvent.click(addButton);

        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
    }
}

export const Empty: Story = {
    parameters: {
        docs: {
            description: {
                story: 'リストアイテムがないとき'
            }
        }
    },
    args: {
        initialListItems: []
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const addButton = await canvas.findByRole('button', { name: '項目を追加' });
        await userEvent.click(addButton);

        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
    }
}

export const Error: StoryObj<typeof ShoppingListCard> = {
    parameters: {
        docs: {
            description: {
                story: 'エラー時'
            }
        },
        testTimeout: 10000
    },
    render: () => {

        const [error, setError] = useState<string | null>('通信エラーが発生しました');

        const mockUseItemList = () => ({
            categorizedItems,
            error,
            create: async () => { },
            update: async () => { },
            updateAll: async () => { },
            deleteAll: async () => { },
            setError
        })

        return (
            <ShoppingListCard
                listCategories={listCategories}
                initialListItems={listItems}
                useItemListHook={mockUseItemList}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const snackbar = canvas.getByText('通信エラーが発生しました');

        expect(snackbar).toBeInTheDocument();

        await waitFor(() => {
            expect(snackbar).not.toBeInTheDocument();
        }, { timeout: 5500 });
    },
}