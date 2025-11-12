import ListItem from '@/components/features/contents/list/components/list/categoryList/item/ListItem';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { action } from 'storybook/internal/actions';
import { fn } from 'storybook/test';

const mockItem = { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false };

const mockUpdate = fn(async (id: number, isDone: boolean, onFinally: () => void) => {
    setTimeout(() => { onFinally(); }, 1000);
    action('update')(id, isDone);
});

const meta: Meta<typeof ListItem> = {
    title: 'Components/Features/List/List/Category/Item/ListItem',
    component: ListItem,
    parameters: {
        docs: {
            source: {
                code: '<ListItem item={item} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={[]} initialListItems={[]}>
                <Story />
            </ListContextProvider>
        )
    ],
    argTypes: {
        item: {
            control: false,
            description: 'リストアイテム',
            table: { category: 'data' }
        },
        propUpdate: {
            control: false,
            description: 'storybookテスト用',
            table: { category: '-' }
        }
    },
    args: {
        item: mockItem,
        propUpdate: mockUpdate
    }
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // クリック
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

        // クリック
        const checkbox = await canvas.findByRole('checkbox');
        await userEvent.click(checkbox);
        await userEvent.click(checkbox);
        expect(mockUpdate).toHaveBeenCalledTimes(1);

        await new Promise(resolve => setTimeout(resolve, 1100));
    }
}