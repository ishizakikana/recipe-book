import ShoppingList from '@/components/features/contents/list/components/list/ShoppingList';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';

const mockListCategories = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
    { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
    { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
]

const mockListItems = [
    { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
    { id: 2, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false },
    { id: 3, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false },
    { id: 4, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
    { id: 5, name: '玉ねぎ', volume: '1個', categoryId: 1, recipeName: null, isDone: true }
]

const meta: Meta<typeof ShoppingList> = {
    title: 'Features/List/List/ShoppingList',
    component: ShoppingList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<ShoppingList />'
            }
        }
    },
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={mockListItems}>
                <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                    <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider >
        )
    ]
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
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={[]}>
                <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                    <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider >
        )
    ],
    args: {
        categorizedItems: []
    }
}