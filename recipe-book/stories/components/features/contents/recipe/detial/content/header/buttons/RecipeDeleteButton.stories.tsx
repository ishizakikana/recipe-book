import RecipeDeleteButton from '@/components/features/contents/recipe/components/detail/content/item/header/buttons/RecipeDeleteButton';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeDetail } from '@/types/viewModel';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "@storybook/testing-library";
import { screen, waitFor } from '@testing-library/react';
import { fn } from 'storybook/test';

const mockOnDelete = fn();

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: '000101', name: 'レシピ材料1', volume: '100g' },
        { id: '000102', name: 'レシピ材料2', volume: '200g' },
        { id: '000103', name: 'レシピ材料3', volume: '300g' },
    ],
    steps: [
        { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [] },
        {
            id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
                { id: '00010201', name: '塩', volume: '少々' },
                { id: '00010202', name: 'にんにくチューブ', volume: '少々' },
            ],
        },
        { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [] },
    ]
}

const meta: Meta<typeof RecipeDeleteButton> = {
    title: 'Components/Features/Recipe/Detail/Content/Item/Header/Buttons/RecipeDeleteButton',
    component: RecipeDeleteButton,
    parameters: {
        docs: {
            source: {
                code: '<RecipeDeleteButton recipeId={recipeId} recipeName={recipeName} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <RecipeContextProvider recipeCategories={[]} initialRecipes={[]}>
                <Stack width='100%' height='100%'>
                    <Stack p={3} justifyContent='center' alignItems='center'>
                        <Story />
                    </Stack>
                </Stack>
            </RecipeContextProvider>
        )
    ],
    argTypes: {
        recipeId: {
            control: false,
            description: 'レシピID',
            table: {
                category: 'props',
                type: { summary: 'number' }
            }
        },
        recipeName: {
            control: 'text',
            description: 'レシピ名',
            table: {
                category: 'props',
                type: { summary: 'string' }
            }
        },
        useRecipeDeleteForm: {
            control: false,
            description: 'storybookテスト用',
            table: {
                category: '_',
                defaultValue: { summary: 'useRecipeDeleteForm' }
            }
        }
    },
    args: {
        recipeId: 1,
        recipeName: 'レシピ名',
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDeleteButton>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        // クリックでダイアログ表示
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // キャンセルボタンクリックでダイアログ非表示
        const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(cancelButton);
        await waitFor(() => expect(dialog).not.toBeVisible());
    }
}

export const SubmitSuccess: Story = {
    args: {
        useRecipeDeleteForm: () => ({
            loading: false,
            error: null,
            onDelete: mockOnDelete.mockImplementationOnce(() => true)
        })
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        // ダイアログを開く
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // 削除ボタンクリック
        const deleteButton = screen.getByRole('button', { name: '削除' });
        await userEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalledWith(args.recipeId);

        // ダイアログが非表示になる
        await waitFor(() => expect(dialog).not.toBeVisible());
    }
}

export const SubmitError: Story = {
    args: {
        useRecipeDeleteForm: () => ({
            loading: false,
            error: 'エラーが発生しました',
            onDelete: mockOnDelete.mockImplementationOnce(() => false)
        })
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        // ダイアログを開く
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // 削除ボタンクリック
        const deleteButton = screen.getByRole('button', { name: '削除' });
        await userEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalledWith(args.recipeId);

        // ダイアログが非表示にならない
        await waitFor(() => expect(dialog).toBeVisible());
    }
}