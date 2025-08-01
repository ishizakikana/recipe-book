import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';
import CreateButton from '../../../../buttons/button/create/CreateButton';

const categories = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
]

const meta: Meta<typeof CreateButton> = {
    title: 'Features/List/Buttons/Button/Create/CreateButton',
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