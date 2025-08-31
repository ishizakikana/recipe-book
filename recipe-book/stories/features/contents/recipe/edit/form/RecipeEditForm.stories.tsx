import RecipeEditForm from '@/components/features/contents/recipe/components/edit/form/RecipeEditForm'
import { useRecipeContext } from '@/components/features/contents/recipe/hooks/useRecipeContext'
import { useRecipeEditForm } from '@/components/features/contents/recipe/hooks/useRecipeEditForm'
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider'
import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit'
import { RecipeDetail, RecipeSummary } from '@/types/viewModel'
import { RecipeCategory } from '@prisma/client'
import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/nextjs'
import { screen, userEvent, waitFor, within } from '@storybook/testing-library'
import { FieldErrors, useForm } from 'react-hook-form'
import { mockReplace } from '../../../../../__mocks__/router'

const mockRecipeCategories: RecipeCategory[] = [
    { id: 1, name: '主食', icon: '', color: '' },
    { id: 2, name: '副菜', icon: '', color: '' },
    { id: 3, name: '汁物', icon: '', color: '' }
]

const mockRecipes: RecipeSummary[] = [
    {
        id: 1,
        name: 'レシピ1',
        categoryId: 1,
        category: { id: 1, name: '主食', icon: '', color: '' },
        imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
        shelfLife: '冷蔵保存3日',
        calories: 100,
        keywords: ['keyword1', 'keyword2'],
        visible: true
    },
    {
        id: 2,
        name: 'レシピ2',
        categoryId: 1,
        category: { id: 1, name: '主食', icon: '', color: '' },
        imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
        shelfLife: '冷蔵保存3日',
        calories: 100,
        keywords: ['keyword1', 'keyword2'],
        visible: true
    }
]

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    categoryId: 1,
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: '000101', name: '材料1', volume: '100g', recipeId: 1 },
        { id: '000102', name: '材料2', volume: '200g', recipeId: 1 }
    ],
    steps: [
        { id: 1, text: '手順1', seasonings: [], recipeId: 1, stepNumber: 1 },
        { id: 2, text: '手順2', seasonings: [], recipeId: 1, stepNumber: 2 },
        {
            id: 3, text: '手順3', seasonings: [
                { id: '000101', name: '調味料1', volume: '大さじ1', stepId: 3 },
                { id: '000102', name: '調味料2', volume: '小さじ1', stepId: 3 }
            ], recipeId: 1, stepNumber: 3
        }
    ]
}

const mockUseRecipeEditForm = (): ReturnType<typeof useRecipeEditForm> => {
    const { control, register, handleSubmit } = useForm<RecipeFormInput>({
        defaultValues: {
            id: 1,
            name: 'テストレシピ',
            categoryId: '0',
            imageUrl: 'no_image.jpg',
            shelfLife: '冷蔵保存3日',
            calories: 100,
            ingredients: 'テスト材料',
            steps: [{ text: '手順1', seasonings: '' }]
        }
    });

    return {
        control,
        categoryOptions: [
            { label: '主菜', value: '1' },
            { label: '副菜', value: '2' }
        ],
        register,
        handleSubmit,
        onUpdate: async () => true,
        submitError: null,
        formErrors: {} as FieldErrors<RecipeFormInput>,
        loading: false
    }
}

const mockUseRecipeContext = (): ReturnType<typeof useRecipeContext> => ({
    recipeCategories: mockRecipeCategories,
    recipeSummaries: mockRecipes,
    setRecipeSummaries: () => { },
    recipeDetail: mockRecipe,
    setRecipeDetail: () => { },
})

const meta: Meta<typeof RecipeEditForm> = {
    title: 'Features/Recipe/Edit/Form/RecipeEditForm',
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
            <RecipeContextProvider recipeCategories={mockRecipeCategories} initialRecipes={mockRecipes}>
                <Story />
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        useRecipeEditForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: 'useRecipeEditForm' }
            }
        },
        useRecipeContext: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: 'useRecipeContext' }
            }
        }
    },
    args: {
        useRecipeEditForm: mockUseRecipeEditForm,
        useRecipeContext: mockUseRecipeContext
    }
}

export default meta;
type Story = StoryObj<typeof RecipeEditForm>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 入力フォーム確認
        expect(await canvas.findByRole('textbox', { name: 'レシピ名' })).toBeInTheDocument();
        expect(await canvas.findByRole('combobox', { name: 'カテゴリー' })).toBeInTheDocument();
        expect(await canvas.findByRole('textbox', { name: '材料' })).toBeInTheDocument();
        expect(await canvas.findByRole('textbox', { name: '保存期間' })).toBeInTheDocument();
        expect(await canvas.findByRole('textbox', { name: 'カロリー' })).toBeInTheDocument();
        expect(await canvas.findByText('手順')).toBeInTheDocument();

        const imageInput = screen.getByLabelText('レシピ画像') as HTMLInputElement;
        await userEvent.upload(imageInput, new File(['dummy'], 'example.png', { type: 'image/png' }));
    }
}

export const SubmitSuccess: Story = {
    parameters: {
        docs: {
            description: {
                story: '更新成功'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm(),
            onUpdate: async () => true
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: '保存' });
        await userEvent.click(button);

        // リダイレクトされる
        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith('/recipe');
            expect(mockReplace).toHaveBeenCalledWith('/recipe/1');
        });

        // エラーが表示されない
        await waitFor(() => {
            expect(screen.queryByText('エラーが発生しました')).not.toBeInTheDocument();
        });
    }
}

export const SubmitError: Story = {
    parameters: {
        docs: {
            description: {
                story: '更新失敗'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm(),
            onUpdate: async () => false,
            submitError: 'エラーが発生しました'
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: '保存' });
        await userEvent.click(button);

        // エラーメッセージが表示される
        expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
    }
}

export const ValidationError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'バリデーションエラー'
            }
        }
    },
    args: {
        useRecipeEditForm: () => ({
            ...mockUseRecipeEditForm(),
            formErrors: {
                name: { type: 'required', message: '入力してください' },
            } as FieldErrors<RecipeFormInput>
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole('button', { name: '保存' });

        await userEvent.click(button);

        // バリデーションエラーメッセージが表示されることを確認
        expect(await canvas.findByText('入力してください')).toBeInTheDocument();
    }
}