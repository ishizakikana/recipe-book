import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import ShoppingList from '../../list/ShoppingList';

const mockCategorizedItems = [
    {
        category: { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
        items: [
            { id: 4, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
            { id: 6, name: 'キャベツ', volume: '1玉', categoryId: 1, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 2, name: '肉', icon: 'bacon', color: 'red' },
        items: [
            { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 3, name: '魚', icon: 'fish', color: 'blue' },
        items: [
            { id: 2, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
        items: [
            { id: 3, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
        items: [
            { id: 8, name: '醤油', volume: '500ml', categoryId: 5, recipeName: null, isDone: false }
        ]
    }
]

const meta: Meta<typeof ShoppingList> = {
    title: 'Features/List/List/ShoppingList',
    component: ShoppingList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: `
                <ShoppingList
                    categorizedItems={categorizedItems}
                    update={update} />`.trim()
            }
        }
    },
    decorators: [
        (Story) => (
            <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                    <Story />
                </Stack>
            </Stack>
        )],
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
            description: 'リストアイテム更新関数',
            table: {
                category: 'function'
            }
        }
    },
    args: {
        categorizedItems: mockCategorizedItems
    }
}

export default meta;
type Story = StoryObj<typeof ShoppingList>;

export const Default: Story = {}

export const Empty: Story = {
    parameters: {
        docs: {
            description: {
                story: 'リストアイテムがないとき'
            }
        }
    },
    args: {
        categorizedItems: []
    }
}