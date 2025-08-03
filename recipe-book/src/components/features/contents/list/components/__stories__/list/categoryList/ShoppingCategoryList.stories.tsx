import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { CategorizedItem } from '../../../../types';
import ShoppingCategoryList from '../../../list/categoryList/ShoppingCategoryList';

const mockItems: CategorizedItem[] = [
    {
        category: { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
        items: [
            { id: 1, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
            { id: 2, name: 'キャベツ', volume: '1玉', categoryId: 1, recipeName: null, isDone: false },
            { id: 3, name: '鮭', volume: '３切れ', categoryId: 1, recipeName: null, isDone: false },
        ]
    },
    {
        category: { id: 2, name: '肉', icon: 'bacon', color: 'red' },
        items: [
            { id: 4, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
            { id: 5, name: '牛肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
        ]
    }
]

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
        category: mockItems[0].category,
        items: mockItems[0].items,
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
            {mockItems.map((categoryItem, index) => (
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