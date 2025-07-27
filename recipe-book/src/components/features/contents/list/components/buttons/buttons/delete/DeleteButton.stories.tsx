import type { Meta, StoryObj } from '@storybook/nextjs';
import DeleteButton from './DeleteButton';

const meta: Meta<typeof DeleteButton> = {
    title: 'Features/List/Buttons/DeleteButton',
    component: DeleteButton,
    argTypes: {
        onDeleteAll: {
            action: 'onDeleteAll',
            description: '完了済みアイテム削除コールバック',
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
        onDeleteAll: (onFinally) => { onFinally(); },
        mobile: false
    }
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
import DeleteButton from './DeleteButton';

<DeleteButton
  onDeleteAll={onDeleteAll}
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