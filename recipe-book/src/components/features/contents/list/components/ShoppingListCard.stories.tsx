import { listCategoriesSample } from "@/stories/sample/ListCategory";
import { listItemsSample } from "@/stories/sample/ListItem";
import { Meta, StoryObj } from "@storybook/nextjs";
import ShoppingListCard from "./ShoppingListCard";

const meta: Meta<typeof ShoppingListCard> = {
    title: 'Features/List/ShoppingListCard',
    component: ShoppingListCard,
    argTypes: {
        listCategories: {
            control: false,
            description: 'リストカテゴリー',
            table: {
                category: 'data'
            }
        },
        initialListItems: {
            control: false,
            description: 'リストアイテム',
            table: {
                category: 'data'
            }
        }
    },
    args: {
        listCategories: listCategoriesSample,
        initialListItems: listItemsSample
    }
}

export default meta;
type Story = StoryObj<typeof ShoppingListCard>

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<ShoppingListCard initialListItems={listItems} listCategories={listCategories} />'
            }
        }
    }
}