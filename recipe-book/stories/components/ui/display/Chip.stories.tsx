import Chip from '@/components/ui/display/Chip';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';
import { disableAllArgTypes } from '../../../__utils__/utils';

const meta: Meta<typeof Chip> = {
    title: 'Components/UI/Display/Chip',
    component: Chip,
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'ラベル',
            table: {
                category: 'base'
            }
        },
        color: {
            options: ['red', 'blue', 'teal', 'orange', 'brown', 'blueGrey'],
            control: { type: 'select' },
            description: '色',
            table: {
                category: 'base'
            }
        }
    },
    args: {
        label: 'chip',
    }
}

export default meta;
type Story = StoryObj<typeof Chip>;
type ChipArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import Chip from '@/components/ui/display/chip/Chip';

                <Chip label='chip' />
                `.trim()
            }
        }
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const chip = canvas.getByText(args.label);
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveTextContent(args.label);
    }
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: {
                story: '色'
            },
            source: {
                code: `
                import Chip from '@/components/ui/display/chip/Chip';

                <Stack direction='row' gap={2}>
                    <Chip label='red' color='red' />
                    <Chip label='blue' color='blue' />
                    <Chip label='teal' color='teal' />
                    <Chip label='orange' color='orange' />
                    <Chip label='brown' color='brown' />
                    <Chip label='blueGrey' color='blueGrey' />
                </Stack>
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <Chip {...args} label='red' color='red' />
            <Chip {...args} label='blue' color='blue' />
            <Chip {...args} label='teal' color='teal' />
            <Chip {...args} label='orange' color='orange' />
            <Chip {...args} label='brown' color='brown' />
            <Chip {...args} label='blueGrey' color='blueGrey' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<ChipArgs>(meta.argTypes)
}