import IconButton from '@/components/ui/button/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { disableAllArgTypes } from '../../__utils__/utils';

const meta: Meta<typeof IconButton> = {
    title: 'UI/Button/IconButton',
    component: IconButton,
    argTypes: {
        icon: {
            control: false,
            description: 'アイコン',
            table: {
                category: 'base'
            }
        },
        color: {
            options: ['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning', 'ui'],
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
        edge: {
            options: [false, 'start', 'end'],
            control: { type: 'select' },
            description: 'エッジ（paddingの打ち消し）',
            table: {
                category: 'base',
                defaultValue: { summary: 'false' }
            }
        },
        sx: {
            control: false,
            description: 'スタイルのカスタマイズ',
            table: {
                category: 'base'
            }
        },
        ariaLabel: {
            control: false,
            description: 'アクセシビリティラベル',
            table: {
                category: 'base'
            }
        },
        tooltip: {
            control: { type: 'boolean' },
            description: 'ツールチップの表示状態',
            table: {
                category: 'tooltip',
                defaultValue: { summary: 'false' }
            }
        },
        tipTitle: {
            control: { type: 'text' },
            description: 'ツールチップのタイトル',
            table: {
                category: 'tooltip'
            }
        },
        tipPlacement: {
            options: ['bottom', 'left', 'right', 'top'],
            control: { type: 'select' },
            description: 'ツールチップの配置',
            table: {
                category: 'tooltip',
                defaultValue: { summary: 'bottom' }
            }
        },
        tipOffset: {
            control: { type: 'object' },
            description: 'ツールチップの距離',
            table: {
                category: 'tooltip',
                defaultValue: { summary: '[0, 0]' }
            }
        },
        onClick: {
            control: false,
            action: 'clicked',
            description: 'クリックイベント',
            table: {
                category: 'event'
            }
        },
        onMouseDown: {
            control: false,
            action: 'mouseDown',
            description: 'マウスダウンイベント',
            table: {
                category: 'event'
            }
        },
        onMouseUp: {
            control: false,
            action: 'mouseUp',
            description: 'マウスアップイベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        icon: <DeleteIcon fontSize='inherit' />,
        color: 'ui',
    }
}

export default meta;
type Story = StoryObj<typeof IconButton>;
type IconButtonArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import IconButton from '@/components/ui/button/iconButton/IconButton';
                import DeleteIcon from '@mui/icons-material/Delete';
                
                <IconButton
                    icon={<DeleteIcon fontSize='inherit' />}
                    color='ui'
                    ariaLabel='Delete'
                />
                `.trim()
            }
        }
    }
};

export const Tooltip: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ツールチップ付き'
            },
            source: {
                code: `
                import IconButton from '@/components/ui/button/iconButton/IconButton';
                import DeleteIcon from '@mui/icons-material/Delete';
                
                <IconButton
                    icon={<DeleteIcon fontSize='inherit' />}
                    color='ui'
                    tooltip={true}
                    tipTitle='アイコンボタン'
                    tipPlacement='bottom'
                />
                `.trim()
            }
        }
    },
    args: {
        tooltip: true,
        tipTitle: 'アイコンボタン',
        tipPlacement: 'bottom',
    }
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: '大きさ'
            },
            source: {
                code: `
                import IconButton from '@/components/ui/button/iconButton/IconButton';
                import DeleteIcon from '@mui/icons-material/Delete';
                
                <Stack direction='row' alignItems='center' gap={2}>
                    <IconButton icon={<DeleteIcon fontSize='inherit' />} size='small' />
                    <IconButton icon={<DeleteIcon fontSize='inherit' />} size='medium' />
                    <IconButton icon={<DeleteIcon fontSize='inherit' />} size='large' />
                </Stack>
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' alignItems='center' gap={2}>
            <IconButton {...args} size='small' />
            <IconButton {...args} size='medium' />
            <IconButton {...args} size='large' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<IconButtonArgs>(meta.argTypes)
}