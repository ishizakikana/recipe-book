import { Box, Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import ShoppingCategoryList from '../../../list/categoryList/ShoppingCategoryList';

const mockCategories = [
    { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
    { id: 2, name: '肉', icon: 'bacon', color: 'red' },
    { id: 3, name: '魚', icon: 'fish', color: 'blue' },
    { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
    { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
]
const mockItems = [
    { id: 1, name: 'アイテム1', volume: '100g', categoryId: 1, recipeName: null, isDone: false },
    { id: 2, name: 'アイテム2', volume: '200g', categoryId: 1, recipeName: null, isDone: false }
]

const meta: Meta<typeof ShoppingCategoryList> = {
    title: 'Features/List/List/Category/CategoryList',
    component: ShoppingCategoryList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: `
                <ShoppingCategoryList
                    category={category}
                    items={items}
                    update={update} />`.trim()
            }
        }
    },
    decorators: [
        (Story) => (
            <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                    <Box sx={{ listStyle: 'none', width: '100%' }}>
                        <Story />
                    </Box>
                </Stack>
            </Stack>
        )],
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
        category: mockCategories[0],
        items: mockItems,
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
            {mockCategories.map((category, index) => (
                <ShoppingCategoryList
                    key={index}
                    category={category}
                    items={mockItems}
                    update={(id, isDone, onFinally) => {
                        setTimeout(onFinally, 500);
                    }}
                />
            ))}
        </Stack>
    )
}