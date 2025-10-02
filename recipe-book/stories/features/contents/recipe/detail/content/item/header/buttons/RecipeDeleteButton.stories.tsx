import RecipeDeleteButton from '@/components/features/contents/recipe/components/detail/content/item/header/buttons/RecipeDeleteButton';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "@storybook/testing-library";
import { screen, waitFor } from '@testing-library/react';
import { fn } from 'storybook/test';

const mockOnDelete = fn(() => true);

const meta: Meta<typeof RecipeDeleteButton> = {
    title: 'Features/Recipe/Detail/Content/Item/Header/Buttons/RecipeDeleteButton',
    component: RecipeDeleteButton,
    parameters: {
        docs: {
            source: {
                code: '<RecipeDeleteButton recipeId={recipeId} recipeName={recipeName} />'
            }
        }
    },
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
        onDelete: {
            control: false,
            description: 'storybookテスト用',
            table: { category: '_' }
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

        // ダイアログが表示される
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
    }
}

export const SubmitSuccess: Story = {
    args: {
        onDelete: mockOnDelete
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        // ダイアログが表示される
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // 削除ボタンクリック
        const deleteButton = screen.getByRole('button', { name: '削除' });
        await userEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalled();

        // ダイアログが非表示になる
        await waitFor(() =>
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        );
    }
}

export const SubmitError: Story = {
    args: {
        onDelete: mockOnDelete.mockImplementationOnce(() => false),
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));

        // ダイアログを開く
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // 削除ボタンクリック
        const deleteButton = screen.getByRole('button', { name: '削除' });
        await userEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalled();

        // エラーメッセージが表示される
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
            expect(screen.queryByRole('dialog')).toBeInTheDocument();
        });
    }
}