import SearchAccordion from '@/components/features/contents/recipe/components/recipes/search/SearchAccordion';
import { RecipeContext } from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeCategory } from '@prisma/client';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/test';

const mockCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
    { id: 2, name: '副菜', icon: '', color: '' },
    { id: 3, name: '主菜', icon: '', color: '' },
]

const mockSetFormValue = fn();

const meta: Meta<typeof SearchAccordion> = {
    title: 'Features/Recipe/List/Search/SearchAccordion',
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
            <RecipeContext.Provider value={{ recipes: [], recipeCategories: mockCategories, setRecipes: () => { } }} >
                {Story()}
            </RecipeContext.Provider >
        )
    ],
    argTypes: {
        useRecipeSearchForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: 'useRecipeSearchForm' }
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof SearchAccordion>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button');
        await userEvent.click(button);

        const input = await canvas.findByRole('textbox', { name: 'キーワード' });
        expect(input).toBeInTheDocument();

        await userEvent.click(button);
    },
    args: {
        useRecipeSearchForm: () => ({
            form: { keyword: '', categoryIds: [] },
            isSearch: false,
            setFormValue: mockSetFormValue
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
            setFormValue: mockSetFormValue
        })
    }
}