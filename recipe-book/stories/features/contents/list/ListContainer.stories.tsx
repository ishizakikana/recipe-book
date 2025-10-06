import ListContainer from '@/components/features/contents/list/components/ListContainer';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { useState } from 'react';

// モックデータ
const mockListCategories = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
]

const mockListItems = [
    { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
    { id: 2, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false },
    { id: 3, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false },
    { id: 4, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
    { id: 5, name: 'キャベツ', volume: '1玉', categoryId: 1, recipeName: null, isDone: false },
]

const meta: Meta<typeof ListContainer> = {
    title: 'Features/List/ListContainer',
    component: ListContainer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<ListContainer />'
            }
        }
    },
    globals: {
        viewport: { value: 'desktop', isRotated: false }
    },
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={mockListItems}>
                <Stack width='100vh' height='100%'>
                    <Stack py={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider>
        )
    ],
    argTypes: {
        propError: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '-'
            }
        },
        propSetError: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '-'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof ListContainer>

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

        // 表示確認
        expect(canvas.getByRole('group', { name: 'リスト操作ボタン' })).toBeInTheDocument();
        expect(canvas.getByRole('list', { name: '買い物リスト' })).toBeInTheDocument();

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
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={mockListItems}>
                <Stack width='50vh' height='100%'>
                    <Stack py={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider>
        )
    ],
    play: async ({ canvasElement }) => {

        // 少し待ってからテスト開始（viewport適用を待つ）
        await new Promise(resolve => setTimeout(resolve, 1000));

        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument();
        expect(canvas.getByRole('list', { name: '買い物リスト' })).toBeInTheDocument();

        const menuButton = await canvas.findByRole('button', { name: 'メニューを開く' });
        await userEvent.click(menuButton);
        const addButton = await screen.findByText('項目を追加');
        await userEvent.click(addButton);
        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
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
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={[]}>
                <Stack width='100%' height='100%'>
                    <Stack py={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider>
        )
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.getByText('アイテムがありません')).toBeInTheDocument();

        const addButton = await canvas.findByRole('button', { name: '項目を追加' });
        await userEvent.click(addButton);
        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
    }
}

export const Error: StoryObj<typeof ListContainer> = {
    parameters: {
        docs: {
            description: {
                story: 'エラー時'
            }
        }
    },
    render: () => {
        const [error, setError] = useState<string | null>('エラーが発生しました。');

        return <ListContainer propError={error} propSetError={setError} />
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // スナックバーの表示確認
        const snackbar = canvas.getByText('エラーが発生しました。');
        expect(snackbar).toBeInTheDocument();

        await new Promise(resolve => setTimeout(resolve, 1000));

        // 非表示ボタンクリック
        const closeButton = await canvas.findByRole('button', { name: 'Close' });
        await userEvent.click(closeButton);
        await waitFor(() => {
            const el = canvas.queryByText('エラーが発生しました。');
            expect(el).not.toBeInTheDocument();
        });
    }
}