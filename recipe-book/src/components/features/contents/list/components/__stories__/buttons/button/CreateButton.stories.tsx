import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';
import CreateButton from '../../../buttons/button/CreateButton';

const categories = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
]

const meta: Meta<typeof CreateButton> = {
    title: 'Features/List/Buttons/Button/CreateButton',
    component: CreateButton,
    args: {
        listCategories: categories,
        mobile: false,
        create: fn()
    },
    argTypes: {
        listCategories: {
            control: false,
            description: 'カテゴリー一覧',
            table: {
                category: 'data'
            }
        },
        mobile: {
            control: 'boolean',
            description: 'モバイル表示',
            table: {
                category: 'props'
            }
        },
        create: {
            action: 'create',
            description: 'リストアイテム新規作成関数',
            table: {
                category: 'function'
            }
        },
    },
    parameters: {
        docs: {
            source: {
                code: '<CreateButton listCategories={listCategories} create={create} />'
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof CreateButton>;

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
    args: {
        mobile: true
    },
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            },
            source: {
                code: '<CreateButton mobile listCategories={listCategories} create={create} />'
            }
        }
    }
}

export const ClickInteraction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'クリックテスト'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: '項目を追加' });

        await userEvent.click(button);

        // モーダルが開くことを確認
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);

        // モーダルが閉じることを確認
        await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
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
    args: {
        create: (data) => {
            return true;
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: '項目を追加' }));

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

        // モーダルが閉じることを確認
        await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
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
        create: (data) => {
            throw new Error('サーバーでエラーが発生しました。');
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: '項目を追加' }));

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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: '項目を追加' }));

        const dialog = screen.getByRole('dialog');

        // フォーム送信
        const submitButton = within(dialog).getByRole('button', { name: '登録' });
        await userEvent.click(submitButton);

        // バリデーションエラーメッセージが表示されることを確認
        expect(within(dialog).getByText('入力してください')).toBeInTheDocument();
    }
}