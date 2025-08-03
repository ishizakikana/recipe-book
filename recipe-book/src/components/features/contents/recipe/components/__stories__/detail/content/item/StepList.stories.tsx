import { StepSummary } from '@/types/entity';
import { Meta, StoryObj } from '@storybook/nextjs';
import StepList from '../../../../detail/content/item/StepList';

const mockSteps: StepSummary[] = [
    { id: 1, stepNumber: 1, text: 'レシピ手順1', seasonings: [] },
    {
        id: 2, stepNumber: 2, text: 'レシピ手順2', seasonings: [
            { id: 1, name: '塩', volume: '少々' },
            { id: 2, name: 'にんにくチューブ', volume: '少々' },
        ]
    },
    { id: 3, stepNumber: 3, text: 'レシピ手順3', seasonings: [] },
]

const meta: Meta<typeof StepList> = {
    title: 'Features/Recipe/Detail/Container/Content/Item/StepList',
    component: StepList,
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
    parameters: {
        docs: {
            source: {
                code: '<StepList steps={steps} />'
            }
        }
    }
}