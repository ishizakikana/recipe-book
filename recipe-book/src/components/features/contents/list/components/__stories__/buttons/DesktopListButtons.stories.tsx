import { listCategoriesSample } from '@/stories/sample/ListCategory';
import type { Meta, StoryObj } from '@storybook/nextjs';
import DesktopListButtons from '../../buttons/DesktopListButtons';

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
        listCategories: listCategoriesSample,
        create: () => { },
        updateAll: () => { },
        deleteAll: () => { },
    }
};

export default meta;
type Story = StoryObj<typeof DesktopListButtons>;

export const Default: Story = {}