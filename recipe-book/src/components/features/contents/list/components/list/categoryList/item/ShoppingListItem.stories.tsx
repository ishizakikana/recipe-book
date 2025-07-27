import { listItemsSample } from "@/stories/sample/ListItem";
import { Meta, StoryObj } from "@storybook/nextjs";
import ShoppingListItem from "./ShoppingListItem";

const meta: Meta<typeof ShoppingListItem> = {
    title: "Features/List/List/Category/Item/ShoppingListItem",
    component: ShoppingListItem,
    argTypes: {
        item: {
            control: false,
            description: "リストアイテム",
            table: { category: "data" }
        },
        update: {
            control: false,
            description: "リストアイテム更新メソッド",
            table: { category: "function" }
        }
    },
    args: {
        item: listItemsSample[0],
        update: (id, isDone, onFinally) => {
            setTimeout(onFinally, 500);
        }
    }
};

export default meta;
type Story = StoryObj<typeof ShoppingListItem>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `<ShoppingListItem
    item={item}
    update={update}
/>`
            }
        }
    }
};

export const Checked: Story = {
    args: {
        item: { ...listItemsSample[0], isDone: true }
    },
    parameters: {
        docs: {
            source: {
                code: `<ShoppingListItem
    item={{ ...item, isDone: true }}
    update={update}
/>`
            }
        }
    }
};

export const Loading: Story = {
    args: {
        update: () => {
            // onFinallyを呼ばないことでローディング状態を維持
        }
    },
    parameters: {
        docs: {
            source: {
                code: `<ShoppingListItem
    item={item}
    update={() => {/* ローディング状態 */}}
/>`
            }
        }
    }
}