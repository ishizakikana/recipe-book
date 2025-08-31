import StepList from '@/components/features/contents/recipe/components/detail/content/item/StepList';
import { StepSummary } from '@/types/viewModel';
import { Box } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';

const mockSteps: StepSummary[] = [
    { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [], recipeId: 1 },
    {
        id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
            { id: '000101', name: '塩', volume: '少々', stepId: 2 },
            { id: '000102', name: 'にんにくチューブ', volume: '少々', stepId: 2 },
        ], recipeId: 1
    },
    { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [], recipeId: 1 },
]

const meta: Meta<typeof StepList> = {
    title: 'Features/Recipe/Detail/Content/Item/StepList',
    component: StepList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<StepList steps={steps} />'
            }
        }
    },
    decorators: [
        (Story) => (
            <Box px={2} py={6}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        steps: {
            control: false,
            description: '作業手順',
            table: {
                category: 'data',
                type: { summary: 'StepSummary[]' }
            }
        }
    },
    args: {
        steps: mockSteps
    }
}

export default meta;
type Story = StoryObj<typeof StepList>;

export const Default: Story = {}