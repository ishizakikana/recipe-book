import FloatingButton from '@/components/ui/button/FloatingButton';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { fn } from 'storybook/internal/test';
import { disableAllArgTypes } from '../../../__utils__/utils';

const mockOnClick = fn();

const meta: Meta<typeof FloatingButton> = {
    title: 'Components/UI/Button/FloatingButton',
    component: FloatingButton,
    decorators: [
        (Story) => (
            <Box display="flex"
                alignItems="center"
                justifyContent="center"
                width={800}
                height={60}
                position="relative">
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        children: {
            control: false,
            description: '子要素',
            table: {
                category: 'base'
            }
        },
        extended: {
            control: { type: 'boolean' },
            description: '拡張',
            table: {
                category: 'base',
                defaultValue: { summary: 'false' }
            }
        },
        color: {
            options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
            control: { type: 'select' },
            description: '色',
            table: {
                category: 'base',
                defaultValue: { summary: 'primary' }
            }
        },
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'inline-radio' },
            description: '大きさ',
            table: {
                category: 'base',
                defaultValue: { summary: 'medium' }
            }
        },
        top: {
            control: { type: 'text' },
            description: '上からの位置',
            table: {
                category: 'base'
            }
        },
        bottom: {
            control: { type: 'text' },
            description: '下からの位置',
            table: {
                category: 'base'
            }
        },
        left: {
            control: { type: 'text' },
            description: '左からの位置',
            table: {
                category: 'base'
            }
        },
        right: {
            control: { type: 'text' },
            description: '右からの位置',
            table: {
                category: 'base'
            }
        },
        tooltip: {
            control: false,
            description: 'ツールチップ',
            table: {
                category: 'base'
            }
        },
        onClick: {
            control: false,
            action: 'clicked',
            description: 'クリックイベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        children: <AddIcon />,
        onClick: mockOnClick
    }
}

export default meta;
type Story = StoryObj<typeof FloatingButton>;
type ButtonArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<FloatingButton>Button</FloatingButton>'
            }
        }
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        // 表示確認
        expect(button).toBeInTheDocument();

        // クリック
        await userEvent.click(button);
        expect(args.onClick).toHaveBeenCalled();
    }
}

export const Extended: Story = {
    parameters: {
        docs: {
            description: {
                story: '拡張'
            },
            source: {
                code: '<FloatingButton extended>extended</FloatingButton>'
            }
        }
    },
    args: {
        children: 'extended',
        extended: true,
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
                import FloatingButton from '@/components/ui/button/button/FloatingButton';

                <Stack direction='row' alignItems='center' gap={2}>
                    <FloatingButton color='primary'><AddIcon /></FloatingButton>
                    <FloatingButton color='secondary'><AddIcon /></FloatingButton>
                    <FloatingButton color='error'><AddIcon /></FloatingButton>
                    <FloatingButton color='warning'><AddIcon /></FloatingButton>
                    <FloatingButton color='info'><AddIcon /></FloatingButton>
                    <FloatingButton color='success'><AddIcon /></FloatingButton>
                    <FloatingButton color='inherit'><AddIcon /></FloatingButton>
                </Stack>
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2} height={'100%'}>
            <FloatingButton {...args} color='primary' left={165}><AddIcon /></FloatingButton>
            <FloatingButton {...args} color='secondary' left={235}><AddIcon /></FloatingButton>
            <FloatingButton {...args} color='error' left={305}><AddIcon /></FloatingButton>
            <FloatingButton {...args} color='warning' left={375}><AddIcon /></FloatingButton>
            <FloatingButton {...args} color='info' left={445}><AddIcon /></FloatingButton>
            <FloatingButton {...args} color='success' left={515}><AddIcon /></FloatingButton>
            <FloatingButton {...args} color='inherit' left={585}><AddIcon /></FloatingButton>
        </Stack>
    ),
    argTypes: disableAllArgTypes<ButtonArgs>(meta.argTypes)
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: '大きさ'
            },
            source: {
                code: `
                import FloatingButton from '@/components/ui/button/button/FloatingButton';
                
                <Stack direction='row' alignItems='center' gap={2}>
                    <FloatingButton size='small'><AddIcon /></FloatingButton>
                    <FloatingButton size='medium'><AddIcon /></FloatingButton>
                    <FloatingButton size='large'><AddIcon /></FloatingButton>
                </Stack>
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' alignItems='center' gap={2} height={'100%'}>
            <FloatingButton {...args} size='small' left={300}><AddIcon /></FloatingButton>
            <FloatingButton {...args} size='medium' left={370}><AddIcon /></FloatingButton>
            <FloatingButton {...args} size='large' left={450}><AddIcon /></FloatingButton>
        </Stack>
    ),
    argTypes: disableAllArgTypes<ButtonArgs>(meta.argTypes)
}

export const Tooltip: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ツールチップ'
            },
            source: {
                code: '<FloatingButton tooltip={{ title: "tooltip" }}><AddIcon /></FloatingButton>'
            }
        }
    },
    args: {
        tooltip: { title: 'tooltip' }
    }
}