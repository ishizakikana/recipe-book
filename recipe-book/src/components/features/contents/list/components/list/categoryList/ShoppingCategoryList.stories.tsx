import { categorizedItemsSample } from "@/stories/sample/ListItem";
import { Meta, StoryObj } from "@storybook/nextjs";
import ShoppingCategoryList from "./ShoppingCategoryList";

const meta: Meta<typeof ShoppingCategoryList> = {
    title: 'Features/List/List/Category/CategoryList',
    component: ShoppingCategoryList,
    argTypes: {
        category: {
            control: false,
            description: 'カテゴリー',
            table: {
                category: 'data'
            }
        },
        items: {
            control: false,
            description: 'リストアイテム',
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
        category: categorizedItemsSample[0].category,
        items: categorizedItemsSample[0].items,
    }
}

export default meta;
type Story = StoryObj<typeof ShoppingCategoryList>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `<ShoppingCategoryList
                                    key={category.id}
                                    category={category}
                                    items={items}
                                    update={update} />`.trim()
            }
        }
    }
}