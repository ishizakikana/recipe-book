import RecipeDetailDialog from '@/components/features/contents/recipe/components/detail/RecipeDetailDialog';
import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { RecipeContextType } from '@/components/features/contents/recipe/types/context';
import { RecipeDetail } from '@/types/viewModel';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent } from '@storybook/testing-library';
import { fn, within } from 'storybook/test';

const mockSetRecipeDetail = fn();
const mockOnClose = fn();

const mockRecipe: RecipeDetail = {
    id: 1,
    name: 'レシピ1',
    categoryId: 1,
    categoryId: 1,
    category: { id: 1, name: '主食', icon: '', color: '' },
    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
    shelfLife: '冷蔵保存3日',
    calories: 100,
    ingredients: [
        { id: '000101', name: 'レシピ材料1', volume: '100g', recipeId: 1 },
        { id: '000102', name: 'レシピ材料2', volume: '200g', recipeId: 1 },
        { id: '000103', name: 'レシピ材料3', volume: '300g', recipeId: 1 },
    ],
    steps: [
        { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [], recipeId: 1 },
        {
            id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
                { id: '00010201', name: '塩', volume: '少々' },
                { id: '00010202', name: 'にんにくチューブ', volume: '少々' },
            ],
            recipeId: 1
        },
        { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [], recipeId: 1 },
    ]
}

const mockRecipeContext: RecipeContextType = {
    recipeDetail: mockRecipe,
    recipeCategories: [],
    recipeSummaries: [],
    setRecipeDetail: mockSetRecipeDetail,
    setRecipeSummaries: fn()
}

const mockUseRecipeModal = () => ({
    open: true,
    onClose: mockOnClose
})

const meta: Meta<typeof RecipeDetailDialog> = {
    title: 'Features/Recipe/Detail/RecipeDetailDialog',
    component: RecipeDetailDialog,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<RecipeDetailDialog initialValue={recipe} />'
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
        initialValue: {
            initialValue: {
                control: false,
                description: 'レシピ初期情報',
                table: {
                    category: 'data',
                    type: { summary: 'RecipeDetail' }
                }
            },
            useRecipeModal: {
                control: false,
                description: 'Storybookテスト用',
                table: {
                    category: '-',
                }
            },
            useRecipeContext: {
                control: false,
                description: 'Storybookテスト用',
                table: {
                    category: '-',
                }
            }
        },
        args: {
            initialValue: mockRecipe,
            useRecipeModal: mockUseRecipeModal,
        }
    }

export default meta;
    type Story = StoryObj<typeof RecipeDetailDialog>

export const Default: Story = {
        play: async () => {

            // コンテキストの値と初期値の id が一致するとき、コンテキストの値を変更しない
            expect(mockSetRecipeDetail).not.toHaveBeenCalled();

            // ダイアログ非表示処理が呼び出されたかどうか
            const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
            if (backdrop) {
                await userEvent.click(backdrop);
            } else {
                throw new Error('Backdrop not found');
            }

            expect(mockOnClose).toHaveBeenCalled();
        }
    }

export const Loading: Story = {
        parameters: {
            docs: {
                description: {
                    story: 'ローディング'
                }
            }
        },
        args: {
            initialValue: mockRecipe,
            useRecipeModal: mockUseRecipeModal,
            useRecipeContext: () => ({
                ...mockRecipeContext,
                recipeDetail: {
                    id: 999,
                    name: 'レシピ1',
                    categoryId: 0,
                    category: { id: 0, name: '主食', icon: '', color: '' },
                    imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.jpg',
                    shelfLife: '冷蔵保存3日',
                    calories: 100,
                    ingredients: [],
                    steps: []
                }
            })
        },
        play: async ({ canvasElement }) => {
            const canvas = within(canvasElement);
            const loading = await canvas.findByRole('progressbar');

            // 表示チェック
            expect(loading).toBeInTheDocument();

            // コンテキストの値と初期値の id が一致しないとき、コンテキストの値を変更する
            expect(mockSetRecipeDetail).toHaveBeenCalled();
        },
    }
