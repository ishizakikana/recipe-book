import type { Meta, StoryObj } from '@storybook/nextjs';
import BulkToggleStatusButton from './BulkToggleStatusButton';

const meta: Meta<typeof BulkToggleStatusButton> = {
    title: 'Features/List/Buttons/BulkToggleStatusButton',
    component: BulkToggleStatusButton,
    argTypes: {
        markAsDone: {
            control: 'boolean',
            description: '完了状態に切り替えるかどうか',
            table: {
                category: 'props'
            }
        },
        mobile: {
            control: 'boolean',
            description: 'モバイル表示かどうか',
            table: {
                category: 'props'
            }
        },
        onUpdateAll: {
            action: 'onUpdateAll',
            description: 'アイテム更新コールバック',
            table: {
                category: 'function'
            }
        }
    },
    args: {
        markAsDone: false,
        mobile: false,
        onUpdateAll: (isDene, onFinally) => { onFinally() },
    }
};

export default meta;
type Story = StoryObj<typeof BulkToggleStatusButton>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
<BulkToggleStatusButton
    markAsDone={false}
    mobile={false}
    onUpdateAll={onUpdateAll}
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