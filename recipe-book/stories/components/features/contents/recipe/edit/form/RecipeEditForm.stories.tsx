import RecipeEditForm from '@/components/features/contents/recipe/components/edit/form/RecipeEditForm'
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider'
import { RecipeFormInput, schema } from '@/components/features/contents/recipe/types/edit'
import { RecipeDetail } from '@/types/viewModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/nextjs'
import { userEvent } from '@storybook/testing-library'
import { waitFor, within } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { fn } from 'storybook/internal/test'
import { mockReplace } from '../../../../../../__mocks__/router'

const mockOnUpdate = fn();

const mockRecipeFormInput: RecipeFormInput = {
    id: 1,
    name: 'レシピ1',
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    categoryId: '1',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: 'レシピ材料1 100g',
    steps: [{ id: 1, text: 'レシピ手順1', seasonings: '' }]
}

const mockUseRecipeEditForm = (input: RecipeFormInput = mockRecipeFormInput) => {
    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RecipeFormInput>({
        resolver: zodResolver(schema),
        defaultValues: input
    });
    const categoryOptions = [
        { label: '主食', value: '1' },
        { label: '副菜', value: '2' },
        { label: '主菜', value: '3' }
    ];

    return {
        control,
        categoryOptions: categoryOptions,
        register,
        handleSubmit,
        onUpdate: mockOnUpdate,
        submitError: null,
        formErrors: errors,
        loading: isSubmitting
    }
}

const meta: Meta<typeof RecipeEditForm> = {
    title: 'Components/Features/Recipe/Edit/Form/RecipeEditForm',
    component: RecipeEditForm,
    parameters: {
        docs: {
            source: {
                code: '<RecipeEditForm />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider recipeCategories={[]} initialRecipes={[]}>
                <Story />
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        useRecipeContext: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: '-' }
            }
        },
        useRecipeEditForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: '-' }
            }
        }
    },
    args: {
        useRecipeContext: () => ({
            recipeDetail: { id: 1 } as RecipeDetail,
            recipeSummaries: [],
            recipeCategories: [],
            setRecipeDetail: () => { },
            setRecipeSummaries: () => { }
        })
    }
}

export default meta;
type Story = StoryObj<typeof RecipeEditForm>;

export const Default: Story = {
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm()
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const recipeNameInput = canvas.getByRole('textbox', { name: 'レシピ名' });
        const imageInput = canvas.getByLabelText('レシピ画像');
        const categorySelect = canvas.getByRole('combobox', { name: 'カテゴリー' });
        const shelfLifeInput = canvas.getByRole('textbox', { name: '保存期間' });
        const caloriesInput = canvas.getByRole('textbox', { name: 'カロリー' });
        const ingredientsInput = canvas.getByRole('textbox', { name: '材料' });

        expect(recipeNameInput).toHaveValue(mockRecipeFormInput.name);
        expect(categorySelect).toHaveTextContent('主食');
        expect(shelfLifeInput).toHaveValue(mockRecipeFormInput.shelfLife);
        expect(caloriesInput).toHaveValue(mockRecipeFormInput.calories?.toString());
        expect(ingredientsInput).toHaveValue(mockRecipeFormInput.ingredients);
    }
}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm(),
            loading: true
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        mockOnUpdate.mockClear();

        // 保存ボタンが無効化されていること
        const submitButton = canvas.getByRole('button', { name: '保存' });
        expect(submitButton).toBeDisabled();
        expect(mockOnUpdate).not.toHaveBeenCalledWith(mockRecipeFormInput);
    }
}

export const SubmitSuccess: Story = {
    parameters: {
        docs: {
            description: {
                story: 'フォーム送信成功テスト'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm(),
            onUpdate: mockOnUpdate.mockImplementation(() => Promise.resolve(true)),
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        mockOnUpdate.mockClear();
        mockReplace.mockClear();

        const submitButton = canvas.getByRole('button', { name: '保存' });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnUpdate).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockReplace).toHaveBeenCalledWith('/recipe');
            expect(mockReplace).toHaveBeenCalledWith(`/recipe/${mockRecipeFormInput.id}`);
        });
    }
}

export const SubmitError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'フォーム送信失敗テスト'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm(),
            onUpdate: mockOnUpdate.mockImplementation(() => Promise.resolve(false)),
            submitError: '更新に失敗しました。時間をおいて再度お試しください。'
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        mockOnUpdate.mockClear();
        mockReplace.mockClear();

        const submitButton = canvas.getByRole('button', { name: '保存' });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnUpdate).toHaveBeenCalledWith(mockRecipeFormInput);
            expect(mockReplace).not.toHaveBeenCalled();
        });
    }
}

export const ValidationError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'バリデーションエラーテスト'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm({} as RecipeFormInput),
        }),
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        mockOnUpdate.mockClear();

        // フォーム入力
        const recipeNameInput = canvas.getByRole('textbox', { name: 'レシピ名' });      // レシピ名未入力
        await userEvent.clear(recipeNameInput);
        const categorySelect = canvas.getByRole('combobox', { name: 'カテゴリー' });        // カテゴリ未選択
        const shelfLifeInput = canvas.getByRole('textbox', { name: '保存期間' });       // 保存期間 11文字入力
        await userEvent.type(shelfLifeInput, '12345678901', { delay: 100 });

        const submitButton = canvas.getByRole('button', { name: '保存' });
        await userEvent.click(submitButton);

        // 表示確認
        const recipeNameHelperId = recipeNameInput.getAttribute('aria-describedby');
        const recipeNameHelper = recipeNameHelperId ? canvas.getByText((_, element) => element?.id === recipeNameHelperId) : null;
        expect(recipeNameHelper).toHaveTextContent('入力してください');

        const categoryHelper = categorySelect.closest('.MuiFormControl-root')?.querySelector('.MuiFormHelperText-root');
        expect(categoryHelper).toHaveTextContent('選択してください');

        const shelfLifeHelperId = shelfLifeInput.getAttribute('aria-describedby');
        const shelfLifeHelper = shelfLifeHelperId ? canvas.getByText((_, element) => element?.id === shelfLifeHelperId) : null;
        expect(shelfLifeHelper).toHaveTextContent('10文字以下で入力してください');

        // 更新関数が呼び出されていないこと
        expect(mockOnUpdate).not.toHaveBeenCalled();
    }
}
