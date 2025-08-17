import DesktopListButtons from '@/components/features/contents/list/components/buttons/DesktopListButtons';
import { ListCategory } from '@prisma/client';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, within } from '@storybook/testing-library';

const mockCategories: ListCategory[] = [
    { id: 1, name: 'A', icon: '', color: '' },
    { id: 2, name: 'B', icon: '', color: '' },
    { id: 3, name: 'C', icon: '', color: '' },
]

const meta: Meta<typeof DesktopListButtons> = {
    title: 'Features/List/Buttons/DesktopListButtons',
    component: DesktopListButtons,
    parameters: {
        docs: {
            source: {
                code: `<DesktopListButtons
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
type Story = StoryObj<typeof DesktopListButtons>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const addButton = canvas.getByRole('button', { name: '項目を追加' });
        await userEvent.click(addButton);

        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
    }
}