import { ListCategory } from '@prisma/client';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import MobileListButtons from '../../buttons/MobileListButtons';

const mockCategories: ListCategory[] = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
]

const meta: Meta<typeof MobileListButtons> = {
    title: 'Features/List/Buttons/MobileListButtons',
    component: MobileListButtons,
    parameters: {
        docs: {
            source: {
                code: `<MobileListButtons
                            listCategories={listCategoriesSample}
                            create={create}
                            updateAll={updateAll}
                            deleteAll={deleteAll} />
                        `.trim()
            }
        }
    },
    argTypes: {
        listCategories: {
            control: false,
            description: 'カテゴリー一覧',
            table: {
                category: 'data'
            }
        },
        create: {
            action: 'create',
            description: 'リストアイテム追加関数',
            table: {
                category: 'function'
            }
        },
        updateAll: {
            action: 'updateAll',
            description: '全リストアイテム更新関数',
            table: {
                category: 'function'
            }
        },
        deleteAll: {
            action: 'deleteAll',
            description: '全リストアイテム削除関数',
            table: {
                category: 'function'
            }
        },
    },
    args: {
        listCategories: mockCategories,
        create: () => { },
        updateAll: () => { },
        deleteAll: () => { },
    }
};

export default meta;
type Story = StoryObj<typeof MobileListButtons>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const addButton = canvas.getByRole('button', { name: 'メニューを開く' });
        userEvent.click(addButton);

        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
    }
}

export const ClickInteraction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ボタンクリックテスト'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const menuButton = await canvas.findByRole('button', { name: 'メニューを開く' });

        await userEvent.click(menuButton);

        const menuItem = await screen.findByRole('menuitem', { name: '項目を追加' });
        expect(menuItem).toBeInTheDocument();

        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        } else {
            throw new Error('Backdrop not found');
        }

        await waitFor(() => {
            expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
        })
    }
};