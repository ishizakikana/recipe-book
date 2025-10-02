import SearchAccordion from '@/components/features/contents/recipe/components/recipes/search/SearchAccordion';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeCategory } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { waitFor } from '@testing-library/react';
import { fn } from 'storybook/test';
'@/components/features/contents/recipe/providers/RecipeContextProvider';

const mockCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
    { id: 2, name: '副菜', icon: '', color: '' },
    { id: 3, name: '主菜', icon: '', color: '' },
]

const mockSetFormValue = fn();

const meta: Meta<typeof SearchAccordion> = {
    title: 'Features/Recipe/Recipes/Search/SearchAccordion',
    component: SearchAccordion,
    parameters: {
        docs: {
            source: {
                code: `<SearchAccordion  />`
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
        useRecipeSearchForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: '_' }
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof SearchAccordion>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // アコーディオン展開
        const button = canvas.getByRole('button');
        await userEvent.click(button);

        // 表示確認
        const input = await canvas.findByRole('textbox', { name: 'キーワード' });
        expect(input).toBeInTheDocument();

        // アコーディオン折りたたみ
        await userEvent.click(button);
        await waitFor(() => expect(input).not.toBeVisible());
    },
    args: {
        useRecipeSearchForm: () => ({
            form: { keyword: '', categoryIds: [] },
            isSearch: false,
            setFormValue: mockSetFormValue,
            search: () => { }
        })
    }
}

export const Expanded: Story = {
    parameters: {
        docs: {
            description: {
                story: '展開'
            }
        }
    },
    args: {
        useRecipeSearchForm: () => ({
            form: { keyword: 'test', categoryIds: [1] },
            isSearch: true,
            setFormValue: mockSetFormValue,
            search: () => { }
        })
    }
}