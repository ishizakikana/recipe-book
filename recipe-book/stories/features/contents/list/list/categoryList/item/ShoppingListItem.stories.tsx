import ShoppingListItem from '@/components/features/contents/list/components/list/categoryList/item/ShoppingListItem';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockItem = { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false };
const mockUpdate = fn((id: number, isDone: boolean, onFinally: () => void) => {
    setTimeout(() => { onFinally(); }, 1000);
});

const meta: Meta<typeof ShoppingListItem> = {
    title: 'Features/List/List/Category/Item/ShoppingListItem',
    component: ShoppingListItem,
    parameters: {
        docs: {
            source: {
                code: `
                <ShoppingListItem
                    item={item}
                    update={update} />`.trim()
            }
        }
    },
    argTypes: {
        item: {
            control: false,
            description: 'リストアイテム',
            table: { category: 'data' }
        },
        update: {
            control: false,
            description: 'リストアイテム更新関数',
            table: { category: 'function' }
        }
    },
    args: {
        item: mockItem,
        update: mockUpdate
    }
};

export default meta;
type Story = StoryObj<typeof ShoppingListItem>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkbox = await canvas.findByRole('checkbox');

        await userEvent.click(checkbox);
        await userEvent.click(checkbox);

        expect(mockUpdate).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}

export const Checked: Story = {
    parameters: {
        docs: {
            description: {
                story: 'チェック済み'
            }
        }
    },
    args: {
        item: { ...mockItem, isDone: true }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkbox = await canvas.findByRole('checkbox');

        await userEvent.click(checkbox);
        await userEvent.click(checkbox);

        expect(mockUpdate).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}