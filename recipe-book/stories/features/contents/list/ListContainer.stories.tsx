import ListContainer from '@/components/features/contents/list/components/ListContainer';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { Stack } from '@mui/material';
import { ListCategory, ListItem } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockListCategories: ListCategory[] = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
    { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
    { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
]

const mockListItems: ListItem[] = [
    { id: 1, name: 'にんじん', volume: '2本', recipeName: null, categoryId: 1, isDone: false },
    { id: 2, name: 'キャベツ', volume: '1個', recipeName: null, categoryId: 1, isDone: false },
    { id: 3, name: '豚バラ肉', volume: '300g', recipeName: null, categoryId: 2, isDone: false },
    { id: 4, name: '牛ひき肉', volume: '200g', recipeName: null, categoryId: 2, isDone: true },
    { id: 5, name: '鮭', volume: '2切れ', recipeName: null, categoryId: 3, isDone: false },
]

const mockSetError = fn();

const meta: Meta<typeof ListContainer> = {
    title: 'Features/List/ListContainer',
    component: ListContainer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<ListContainer initialListItems={listItems} listCategories={listCategories} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={mockListItems}>
                <Stack width='100%' height='100%'>
                    <Stack py={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider>
        )
    ]
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
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={mockListItems}
                mockError={'エラーが発生しました'} mockSetError={mockSetError}>
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

        // スナックバーの表示確認
        const snackbar = canvas.getByText('エラーが発生しました');
        expect(snackbar).toBeInTheDocument();

        // 非表示ボタンクリック
        const closeButton = await canvas.findByRole('button', { name: 'Close' });
        await userEvent.click(closeButton);

        expect(mockSetError).toHaveBeenCalled();
    }
}