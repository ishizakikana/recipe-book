import Button from '@/components/ui/button/button/Button';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
import { fn } from 'storybook/test';
import CreateItemModal from '../../../../buttons/button/create/CreateItemModal';

const mockCategories = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
]

const meta: Meta<typeof CreateItemModal> = {
    title: 'Features/List/Buttons/Button/Create/CreateItemModal',
    component: CreateItemModal,
    parameters: {
        docs: {
            description: {
                component: 'リストアイテム新規作成モーダル',
            },
        },
    },
    args: {
        open: true,
        listCategories: mockCategories,
        create: fn(),
        onClose: fn(),
    },
    argTypes: {
        open: {
            control: 'boolean',
            description: 'モーダルの開閉状態',
            table: {
                category: 'props'
            }
        },
        listCategories: {
            control: false,
            description: 'カテゴリー一覧',
            table: {
                category: 'data'
            }
        },
        create: {
            action: 'create',
            description: 'リストアイテム新規作成関数',
            table: {
                category: 'function'
            }
        },
        onClose: {
            action: 'close',
            description: 'モーダル非表示イベント',
            table: {
                category: 'event'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof CreateItemModal>;

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        const onClose = () => setOpen(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>項目を追加</Button>
                <CreateItemModal {...args} open={open} onClose={onClose} />
            </>
        )
    }
}

export const SubmitSuccess: Story = {
    parameters: {
        docs: {
            description: {
                story: 'フォーム送信成功テスト'
            }
        }
    },
    play: async ({ args }) => {
        const dialog = screen.getByRole('dialog');

        const categorySelect = within(dialog).getByRole('combobox', { name: 'カテゴリー' });
        await userEvent.click(categorySelect);
        const option = await screen.findByRole('option', { name: 'A' });
        await userEvent.click(option);

        const nameInput = within(dialog).getByRole('textbox', { name: 'アイテム名' });
        await userEvent.type(nameInput, 'test item', { delay: 100 });

        const volumeInput = within(dialog).getByRole('textbox', { name: '数量' });
        await userEvent.type(volumeInput, '100g');

        // フォーム送信
        const submitButton = within(dialog).getByRole('button', { name: '登録' });
        await userEvent.click(submitButton);

        // モーダル画面非表示イベントが呼ばれることを確認
        await expect(args.onClose).toHaveBeenCalled();
    }
}

export const SubmitError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'フォーム送信失敗テスト'
            }
        }
    },
    args: {
        create: () => {
            throw new Error('サーバーでエラーが発生しました。');
        }
    },
    play: async () => {
        const dialog = screen.getByRole('dialog');

        const categorySelect = within(dialog).getByRole('combobox', { name: 'カテゴリー' });
        await userEvent.click(categorySelect);
        const option = await screen.findByRole('option', { name: 'A' });
        await userEvent.click(option);

        const nameInput = within(dialog).getByRole('textbox', { name: 'アイテム名' });
        await userEvent.type(nameInput, 'test item', { delay: 100 });

        // フォーム送信
        const submitButton = within(dialog).getByRole('button', { name: '登録' });
        await userEvent.click(submitButton);

        // エラーメッセージが表示されることを確認
        expect(screen.getByText('サーバーでエラーが発生しました。')).toBeInTheDocument();
    }
}

export const ValidationError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'フォームバリデーションエラーテスト'
            }
        }
    },
    play: async () => {
        const dialog = screen.getByRole('dialog');

        // フォーム送信
        const submitButton = within(dialog).getByRole('button', { name: '登録' });
        await userEvent.click(submitButton);

        // バリデーションエラーメッセージが表示されることを確認
        expect(within(dialog).getByText('入力してください')).toBeInTheDocument();
    }
}