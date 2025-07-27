import { listCategoriesSample } from '@/stories/sample/ListCategory';
import type { Meta, StoryObj } from '@storybook/nextjs';
import CreateButton from './CreateButton';

const meta: Meta<typeof CreateButton> = {
    title: 'Features/List/Buttons/CreateButton',
    component: CreateButton,
    argTypes: {
        onCreate: {
            action: 'onDeleteAll',
            description: 'アイテム作成コールバック',
            table: {
                category: 'function'
            }
        },
        mobile: {
            control: 'boolean',
            description: 'モバイル表示かどうか',
            table: {
                category: 'props'
            }
        }
    },
    args: {
        listCategories: listCategoriesSample,
        mobile: false,
        onCreate: () => { },
    }
};

export default meta;
type Story = StoryObj<typeof CreateButton>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
<CreateButton
  onCreate={onCreate}
  mobile={false}
/>
                `.trim()
            }
        }
    }
};

export const Mobile: Story = {
    args: {
        mobile: true
    },
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            }
        }
    }
}