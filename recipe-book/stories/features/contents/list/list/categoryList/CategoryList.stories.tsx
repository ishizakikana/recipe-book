import CategoryList from '@/components/features/contents/list/components/list/categoryList/CategoryList';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { Box, Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

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

const meta: Meta<typeof CategoryList> = {
    title: 'Features/List/List/Category/CategoryList',
    component: CategoryList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<CategoryList category={category} items={items} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={mockCategories} initialListItems={mockItems}>
                <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
                    <Stack py={3} justifyContent='center' alignItems='center' width='60%'>
                        <Box sx={{ listStyle: 'none', width: '100%' }}>
                            <Story />
                        </Box>
                    </Stack>
                </Stack>
            </ListContextProvider>
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
    },
    args: {
        category: mockCategories[0],
        items: mockItems,
    }
}

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.getByText(mockCategories[0].name)).toBeInTheDocument();
        mockItems.forEach(item => {
            expect(canvas.getByText(item.name)).toBeInTheDocument();
            expect(canvas.getByText(item.volume)).toBeInTheDocument();
        })
    }
}

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
                <CategoryList
                    key={index}
                    category={category}
                    items={mockItems} />
            ))}
        </Stack>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        mockCategories.forEach(category => {
            expect(canvas.getByText(category.name)).toBeInTheDocument();
        })
        mockItems.forEach(item => {
            expect(canvas.getAllByText(item.name).length).toBe(mockCategories.length);
            expect(canvas.getAllByText(item.volume).length).toBe(mockCategories.length);
        })
    }
}