import { listCategoriesSample } from '@/stories/sample/ListCategory';
import type { Meta, StoryObj } from '@storybook/nextjs';
import MobileListButtons from './MobileListButtons';

const meta: Meta<typeof MobileListButtons> = {
    title: 'Features/List/Buttons/Mobile/MobileListButtons',
    component: MobileListButtons,
    argTypes: {
        listCategories: {
            control: false,
            description: 'カテゴリー一覧',
            table: {
                category: 'data'
            }
        },
        onCreate: {
            action: 'onCreate',
            description: 'アイテム作成時のコールバック',
            table: {
                category: 'function'
            }
        },
        onUpdateAll: {
            action: 'onUpdateAll',
            description: '全アイテム一括更新時のコールバック',
            table: {
                category: 'function'
            }
        },
        onDeleteAll: {
            action: 'onDeleteAll',
            description: '全アイテム一括削除時のコールバック',
            table: {
                category: 'function'
            }
        },
    },
    args: {
        listCategories: listCategoriesSample,
        onCreate: () => { },
        onUpdateAll: (_, onFinally) => { onFinally(); },
        onDeleteAll: (onFinally) => { onFinally(); },
    }
};

export default meta;
type Story = StoryObj<typeof MobileListButtons>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
import MobileListButtons from './MobileListButtons';

<MobileListButtons
  listCategories={listCategoriesSample}
  onCreate={onCreate}
  onUpdateAll={onUpdateAll}
  onDeleteAll={onDeleteAll}
/>
                `.trim()
            }
        }
    }
}