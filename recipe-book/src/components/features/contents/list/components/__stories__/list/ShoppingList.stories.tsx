import { categorizedItemsSample } from "@/stories/sample/ListItem";
import { Meta, StoryObj } from "@storybook/nextjs";
import ShoppingList from '../../list/ShoppingList';

const meta: Meta<typeof ShoppingList> = {
    title: 'Features/List/List/ShoppingList',
    component: ShoppingList,
    argTypes: {
        categorizedItems: {
            control: false,
            description: 'カテゴリごとに分類されたアイテムリスト',
            table: {
                category: 'data'
            }
        },
        update: {
            control: false,
            description: 'アイテム更新メソッド',
            table: {
                category: 'function'
            }
        }
    },
    args: {
        categorizedItems: categorizedItemsSample
    }
}

export default meta;
type Story = StoryObj<typeof ShoppingList>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `<ShoppingList
                            categorizedItems={categorizedItems}
                            update={update} />`.trim()
            }
        }
    }
}