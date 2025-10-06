import StepList from '@/components/features/contents/recipe/components/detail/content/item/StepList';
import { RecipeStepSummary } from '@/types/viewModel';
import { Box } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';

const mockSteps: RecipeStepSummary[] = [
    { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [] },
    {
        id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
            { id: '00010201', name: '塩', volume: '少々' },
            { id: '00010202', name: 'にんにくチューブ', volume: '少々' },
        ],
    },
    { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [] },
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

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const steps = await canvas.findAllByRole('listitem', { name: 'step-item' });
        expect(steps).toHaveLength(3);
        mockSteps.forEach(step => {
            expect(canvas.getByText(step.text)).toBeInTheDocument();
            step.seasonings.forEach(seasoning => {
                expect(canvas.getByText(`${seasoning.name} - ${seasoning.volume}`)).toBeInTheDocument();
            });
        });
    },
}