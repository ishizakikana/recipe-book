import SearchForm from '@/components/features/contents/recipe/components/recipes/search/form/SearchForm';
import { RecipeContext } from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeSearchInput } from '@/components/features/contents/recipe/types/search';
import { RecipeCategory } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';

const mockCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
    { id: 2, name: '副菜', icon: '', color: '' },
    { id: 3, name: '主菜', icon: '', color: '' },
]

const meta: Meta<typeof SearchForm> = {
    title: 'Features/Recipe/List/Search/Form/SearchForm',
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
            <RecipeContext.Provider value={{ recipes: [], recipeCategories: mockCategories, setRecipes: () => { } }} >
                {Story()}
            </RecipeContext.Provider >
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
        setFormValue: () => { }
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

        const keywordInput = canvas.getByLabelText('キーワード') as HTMLInputElement;
        await userEvent.type(keywordInput, 'テスト');
        expect(keywordInput.value).toBe('テスト');

        const categoryCheckboxes = mockCategories.map(c =>
            canvas.getByLabelText(c.name) as HTMLInputElement
        );

        // チェック
        for (const checkbox of categoryCheckboxes) {
            await userEvent.click(checkbox);
            expect(checkbox.checked).toBe(true);
        }

        // チェック解除
        for (const checkbox of categoryCheckboxes) {
            await userEvent.click(checkbox);
            expect(checkbox.checked).toBe(false);
        }
    },
}