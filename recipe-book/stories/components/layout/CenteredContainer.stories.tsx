import CenteredContainer from '@/components/layout/CenteredContainer';
import { Box, Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof CenteredContainer> = {
    title: 'Components/Layout/Container/Center',
    component: CenteredContainer,
    argTypes: {
        children: {
            control: false,
            description: '子要素',
            table: {
                category: 'base'
            }
        },
        direction: {
            options: ['row', 'column'],
            control: 'inline-radio',
            description: '子要素の並ぶ向き',
            table: {
                category: 'base',
                defaultValue: { summary: 'column' },
            },
        },
        gap: {
            control: 'number',
            description: '子要素同士のパディング',
            table: {
                category: 'base'
            }
        },
        sx: {
            control: false,
            description: 'カスタムスタイル',
            table: {
                category: 'base'
            }
        }
    },
    args: {
        children: (
            <>
                <Box sx={{ width: '60px', height: '60px', bgcolor: 'red.light' }}>box1</Box>
                <Box sx={{ width: '60px', height: '60px', bgcolor: 'blue.light' }}>box2</Box>
            </>
        ),
    }
}

export default meta;
type Story = StoryObj<typeof CenteredContainer>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
            <CenteredContainer>
                <Box sx={{ width: '60px', height: '60px', bgcolor: 'red.light' }}>box1</Box>
                <Box sx={{ width: '60px', height: '60px', bgcolor: 'blue.light' }}>box2</Box>
            </CenteredContainer>
            `.trim()
            }
        }
    }
}

export const Direction: Story = {
    render: (args) => (
        <Stack direction='row' gap={5}>
            <CenteredContainer direction='column' sx={{ border: 'solid 1px #333', p: 2 }}>
                {args.children}
            </CenteredContainer>
            <CenteredContainer direction='row' sx={{ border: 'solid 1px #333', p: 2 }}>
                {args.children}
            </CenteredContainer>
        </Stack>
    ),
}