import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';
import ShoppingListCard from '../ShoppingListCard';

const mockCategories = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
    { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
    { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
]
const mockItems = [
    { id: 1, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
    { id: 2, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
    { id: 3, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false },
    { id: 4, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false },
    { id: 5, name: '醤油', volume: '500ml', categoryId: 5, recipeName: null, isDone: false }
]

const mockCategorizedItems = [
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

const mockSetError = fn();

const meta: Meta<typeof ShoppingListCard> = {
    title: 'Features/List/ShoppingListCard',
    component: ShoppingListCard,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<ShoppingListCard initialListItems={listItems} listCategories={listCategories} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <Stack width='100%' height='100%'>
                <Stack py={3} justifyContent='center' alignItems='center'>
                    <Story />
                </Stack>
            </Stack>
        )],
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
        useItemList: {
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
        listCategories: mockCategories,
        initialListItems: mockItems,
    }
}

export default meta;
type Story = StoryObj<typeof ShoppingListCard>

export const Desktop: Story = {
    parameters: {
        docs: {
            description: {
                story: 'デスクトップ'
            }
        }
    },
    play: async ({ canvasElement }) => {

        // 少し待ってからテスト開始（viewport適用を待つ）
        await new Promise(resolve => setTimeout(resolve, 1000));

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

        const backdrop = document.querySelector('[class*="MuiBackdrop - root"]');
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
        }
    },
    args: {
        useItemList: () => ({
            categorizedItems: mockCategorizedItems,
            error: '通信エラーが発生しました',
            create: async () => { },
            update: async () => { },
            updateAll: async () => { },
            deleteAll: async () => { },
            setError: mockSetError
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // スナックバーの表示確認
        const snackbar = canvas.getByText('通信エラーが発生しました');
        expect(snackbar).toBeInTheDocument();

        // 非表示ボタンクリック
        const closeButton = await canvas.findByRole('button', { name: 'Close' });
        await userEvent.click(closeButton);

        expect(mockSetError).toHaveBeenCalled();
    }
}