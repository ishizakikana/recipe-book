import ShoppingList from '@/components/features/contents/list/components/list/ShoppingList';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';

const mockListCategories = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
]

const mockListItems = [
    { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false },
    { id: 2, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false },
    { id: 3, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false },
    { id: 4, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
    { id: 5, name: 'キャベツ', volume: '1玉', categoryId: 1, recipeName: null, isDone: false },
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

}

export default meta;
type Story = StoryObj<typeof ShoppingList>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockListCategories} initialListItems={mockListItems}>
                <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                    <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider>
        )
    ],
}

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
            <ListContextProvider listCategories={[]} initialListItems={[]}>
                <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                    <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                        <Story />
                    </Stack>
                </Stack>
            </ListContextProvider>
        )
    ],
}