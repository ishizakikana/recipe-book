import { FormReturn } from '@/types/form';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { useForm } from 'react-hook-form';
import { fn, userEvent } from 'storybook/test';
import { RecipeSearchInput } from '../../../../type';
import SearchForm from '../../../search/form/SearchForm';

const categories = [
    { id: 4, name: '主菜', icon: 'meat', color: 'red' },
    { id: 3, name: '副菜', icon: 'seedling', color: 'teal' },
    { id: 1, name: '主食', icon: 'rice', color: 'orange' },
    { id: 2, name: '汁物', icon: 'soup', color: 'blue' }
]

const searchInput = { keyword: '', categoryIds: [] }

const mockOnSubmit = fn((e) => e.preventDefault());

const mockUseRecipeSearchForm = ({ searchInput }: { searchInput: RecipeSearchInput }): FormReturn<RecipeSearchInput> => {
    const methods = useForm<RecipeSearchInput>({
        defaultValues: searchInput,
    });

    return {
        ...methods,
        loading: false,
        submitError: '',
        onSubmit: (e: any) => {
            e.preventDefault();
            mockOnSubmit(e);
        },
    };
};

const meta: Meta<typeof SearchForm> = {
    title: 'Features/Recipe/Search/Form/SearchForm',
    component: SearchForm,
    parameters: {
        docs: {
            source: {
                code: '<SearchForm categories={categories} searchInput={searchInput} />'
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
        useRecipeSearchForm: {
            description: 'Storybook テスト用コールバック',
            table: {
                defaultValue: { summary: 'useRecipeSearchForm' },
                category: '_',
            }
        }
    },
    args: { categories, searchInput },
}

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {}

export const SubmitSuccess: Story = {
    parameters: {
        docs: {
            description: {
                story: 'フォーム送信成功テスト'
            }
        }
    },
    args: {
        useRecipeSearchForm: mockUseRecipeSearchForm,
        searchInput,
        categories
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const keyword = await canvas.findByRole('textbox', { name: 'キーワード' });
        await userEvent.type(keyword, 'test', { delay: 100 });

        const checkbox1 = canvas.getByRole('checkbox', { name: '主菜' });
        await userEvent.click(checkbox1);
        await userEvent.click(checkbox1, { delay: 100 });

        const submitButton = await canvas.findByRole('button', { name: '検索' });
        await userEvent.click(submitButton);
    }
}