import Button from '@/components/ui/button/button/Button';
import { recipeDetailSample } from '@/stories/sample/RecipeDetail';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import RecipeDetailDialog from '../../detail/RecipeDetailDialog';

const meta: Meta<typeof RecipeDetailDialog> = {
    title: 'Features/Recipe/Detail/RecipeDetailDialog',
    component: RecipeDetailDialog,
    argTypes: {
        recipe: {
            control: false,
            description: 'レシピ情報',
            table: {
                category: 'data',
                type: { summary: 'RecipeDetail' }
            }
        },
        open: {
            control: false,
            description: 'Storybook テスト用コールバック',
            table: {
                category: '-',
            }
        }
    },
    args: {
        recipe: recipeDetailSample,
        open: false
    }
}

export default meta;
type Story = StoryObj<typeof RecipeDetailDialog>

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>レシピ詳細を表示</Button>
                <RecipeDetailDialog recipe={args.recipe} open={open} />
            </>
        )
    },
    parameters: {
        docs: {
            source: {
                code: `
                const [open, setOpen] = useState(false);

                <Button onClick={() => setOpen(true)}>レシピ詳細を表示</Button>
                <RecipeDetailDialog recipe={recipe} open={open} onClose={() => setOpen(false)} />
                `
            }
        }
    }
}