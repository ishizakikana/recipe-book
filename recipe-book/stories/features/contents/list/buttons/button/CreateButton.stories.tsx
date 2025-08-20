import CreateButton from '@/components/features/contents/list/components/buttons/button/CreateButton';
import { ItemFormInput } from '@/components/features/contents/list/types/itemFormInput';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { useForm } from 'react-hook-form';

const mockCategories = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
];

const mockUseCreateItemForm = () => {
    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ItemFormInput>();

    return {
        control,
        register,
        handleSubmit,
        categories: [{ label: 'A', value: '1' }, { label: 'B', value: '2' }, { label: 'C', value: '3' }],
        submitError: null,
        errors,
        isSubmitting,
        onCreate: () => true
    }
}

const meta: Meta<typeof CreateButton> = {
    title: 'Features/List/Buttons/Button/CreateButton',
    component: CreateButton,
    parameters: {
        docs: {
            source: {
                code: '<CreateButton listCategories={listCategories} create={create} />'
            }
        }
    },
    args: {
        listCategories: mockCategories,
        create: () => { }
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
        useCreateItemForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: {
                    summary: 'useCreateItemForm'
                }
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
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: '項目を追加' });
        await userEvent.click(button);

        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
    }
}

export const Mobile: Story = {
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            },
            source: {
                code: '<CreateButton mobile listCategories={listCategories} create={create} />'
            }
        }
    },
    args: {
        mobile: true
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByText('項目を追加');
        await userEvent.click(button);

        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
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
        useCreateItemForm: mockUseCreateItemForm,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // モーダル画面を表示
        const button = await canvas.findByRole('button', { name: '項目を追加' });
        await userEvent.click(button);

        // フォーム入力
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

        // モーダル画面が非表示になることを確認
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // モーダル画面を表示
        const button = await canvas.findByRole('button', { name: '項目を追加' });
        await userEvent.click(button);

        // フォーム入力
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

        // モーダル画面を表示
        const button = await canvas.findByRole('button', { name: '項目を追加' });
        await userEvent.click(button);

        // フォーム送信
        const dialog = screen.getByRole('dialog');
        const submitButton = within(dialog).getByRole('button', { name: '登録' });
        await userEvent.click(submitButton);

        // バリデーションエラーメッセージが表示されることを確認
        expect(within(dialog).getByText('入力してください')).toBeInTheDocument();
    }
}