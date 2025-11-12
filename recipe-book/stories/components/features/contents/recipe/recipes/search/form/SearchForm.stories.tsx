import SearchForm from '@/components/features/contents/recipe/components/recipes/search/form/SearchForm';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeSearchInput } from '@/components/features/contents/recipe/types/search';
import { RecipeCategory } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
import { fn } from 'storybook/test';

const mockSetFormValue = fn();

const mockCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
    { id: 2, name: '副菜', icon: '', color: '' },
    { id: 3, name: '主菜', icon: '', color: '' },
]

const meta: Meta<typeof SearchForm> = {
    title: 'Components/Features/Recipe/Recipes/Search/Form/SearchForm',
    component: SearchForm,
    parameters: {
        docs: {
            source: {
                code: '<SearchForm form={form} setFormValue={setFormValue} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider initialRecipes={[]} recipeCategories={mockCategories} >
                {Story()}
            </RecipeContextProvider >
        )
    ],
    argTypes: {
        form: {
            control: false,
            description: 'フォーム入力値',
            table: {
                category: 'base'
            }
        },
        setFormValue: {
            control: false,
            description: 'フォーム入力値更新処理',
            table: {
                category: 'function'
            }
        }
    },
    args: {
        form: { keyword: '', categoryIds: [] },
        setFormValue: mockSetFormValue
    }
}

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
    render: () => {
        const [form, setForm] = useState<RecipeSearchInput>({ keyword: '', categoryIds: [] });

        const handleSetFormValue = (key: string, value: string | number[]) => {
            setForm((prev) => ({ ...prev, [key]: value }));
        };

        return <SearchForm form={form} setFormValue={handleSetFormValue} />;
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示・入力確認
        const keywordInput = canvas.getByRole('textbox', { name: 'キーワード' });
        expect(keywordInput).toBeInTheDocument();
        await userEvent.type(keywordInput, 'テスト');
        expect(keywordInput).toHaveValue('テスト');

        const checkbox1 = canvas.getByRole('checkbox', { name: mockCategories[0].name });
        expect(checkbox1).toBeInTheDocument();
        await userEvent.click(checkbox1);
        expect(checkbox1).toBeChecked();
        await userEvent.click(checkbox1);
        expect(checkbox1).not.toBeChecked();
    },
}