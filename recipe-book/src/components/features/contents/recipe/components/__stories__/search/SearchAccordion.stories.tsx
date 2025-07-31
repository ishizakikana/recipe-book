import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import SearchAccordion from '../../search/SearchAccordion';

const categories = [
    { id: 4, name: '主菜', icon: 'meat', color: 'red' },
    { id: 3, name: '副菜', icon: 'seedling', color: 'teal' },
    { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    { id: 2, name: '汁物', icon: 'soup', color: 'blue' }
]

const searchInput = { keyword: '', categoryIds: [] }

const meta: Meta<typeof SearchAccordion> = {
    title: 'Features/Recipe/Search/SearchAccordion',
    component: SearchAccordion,
    parameters: {
        docs: {
            source: {
                code: `<SearchAccordion categories={categories} searchInput={searchInput} />`
            }
        }
    },
    argTypes: {
        categories: {
            control: false,
            description: 'カテゴリ一覧',
            table: {
                category: 'data'
            }
        },
        searchInput: {
            control: false,
            description: '検索条件',
            table: {
                category: 'data'
            }
        },
    },
    args: { categories, searchInput },
}

export default meta;
type Story = StoryObj<typeof SearchAccordion>;

export const Default: Story = {}

export const Expanded: Story = {
    parameters: {
        docs: {
            description: {
                story: '展開'
            }
        }
    },
    args: {
        searchInput: { keyword: 'キーワード', categoryIds: [1, 2] }
    }
}

export const ClickInteraction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'クリックテスト'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button');
        await userEvent.click(button);

        const input = await canvas.findByRole('textbox', { name: 'キーワード' });
        expect(input).toBeInTheDocument();
    }
}