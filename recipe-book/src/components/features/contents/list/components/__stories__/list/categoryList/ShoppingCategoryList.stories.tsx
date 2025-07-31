import { categorizedItemsSample } from '@/stories/sample/ListItem';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import ShoppingCategoryList from '../../../list/categoryList/ShoppingCategoryList';

const meta: Meta<typeof ShoppingCategoryList> = {
    title: 'Features/List/List/Category/CategoryList',
    component: ShoppingCategoryList,
    parameters: {
        docs: {
            source: {
                code: `<ShoppingCategoryList
                                    category={category}
                                    items={items}
                                    update={update} />`.trim()
            }
        }
    },
    decorators: [
        (Story) => (
            <div style={{ listStyle: 'none' }}>
                <Story />
            </div>
        )
    ],
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
            description: 'リストアイテム更新関数',
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

export const Default: Story = {}

export const Variant: Story = {
    parameters: {
        docs: {
            description: {
                story: '種類'
            }
        }
    },
    render: () => (
        <Stack>
            {categorizedItemsSample.map((categoryItem, index) => (
                <ShoppingCategoryList
                    key={index}
                    category={categoryItem.category}
                    items={categoryItem.items}
                    update={(id, isDone, onFinally) => {
                        setTimeout(onFinally, 500);
                    }}
                />
            ))}
        </Stack>
    )
}