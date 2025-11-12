import TextBox from '@/components/ui/form/input/TextBox';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { disableAllArgTypes } from '../../../../__utils__/utils';

const meta: Meta<typeof TextBox> = {
    title: 'Components/UI/Form/Input/TextBox',
    component: TextBox,
    argTypes: {
        id: {
            control: false,
            description: 'ID',
            table: {
                category: 'base'
            }
        },
        name: {
            control: false,
            description: '名前',
            table: {
                category: 'base'
            }
        },
        label: {
            control: { type: 'text' },
            description: 'ラベル',
            table: {
                category: 'base'
            }
        },
        variant: {
            options: ['outlined', 'filled', 'standard'],
            control: { type: 'inline-radio' },
            description: '見た目',
            table: {
                category: 'base',
                defaultValue: { summary: 'outlined' }
            }
        },
        type: {
            options: ['text', 'email', 'password', 'search', 'tel', 'url'],
            control: { type: 'inline-radio' },
            description: '種類',
            table: {
                category: 'base',
                defaultValue: { summary: 'text' }
            }
        },
        size: {
            options: ['small', 'medium'],
            control: { type: 'inline-radio' },
            description: '大きさ',
            table: {
                category: 'base',
                defaultValue: { summary: 'medium' }
            }
        },
        width: {
            control: { type: 'number' },
            description: '横幅',
            table: {
                category: 'base'
            }
        },
        helperText: {
            control: { type: 'text' },
            description: 'ヘルパーテキスト',
            table: {
                category: 'base'
            }
        },
        multiline: {
            control: { type: 'boolean' },
            description: '入力ボックスをマルチラインにするか',
            table: {
                category: 'base'
            }
        },
        rows: {
            control: { type: 'number' },
            description: 'マルチラインの行数',
            table: {
                category: 'base'
            }
        },
        startAdornment: {
            control: false,
            description: '先頭に表示する装飾',
            table: {
                category: 'base'
            }
        },
        endAdornment: {
            control: false,
            description: '末尾に表示する装飾',
            table: {
                category: 'base'
            }
        },
        required: {
            control: { type: 'boolean' },
            description: '必須',
            table: {
                category: 'status'
            }
        },
        disabled: {
            control: { type: 'boolean' },
            description: '無効',
            table: {
                category: 'status'
            }
        },
        readOnly: {
            control: { type: 'boolean' },
            description: '読み取り専用',
            table: {
                category: 'status'
            }
        },
        error: {
            control: { type: 'boolean' },
            description: 'エラー',
            table: {
                category: 'status'
            }
        },
        value: {
            control: false,
            description: '値',
            table: {
                category: 'data'
            }
        },
        defaultValue: {
            control: false,
            description: '初期値',
            table: {
                category: 'data'
            }
        },
        ref: {
            control: false,
            description: '参照',
            table: {
                category: 'internal'
            }
        },
        onChange: {
            control: false,
            action: 'changed',
            description: '変更イベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        id: 'textbox',
        name: 'textbox',
        label: 'ラベル'
    }
}

export default meta;
type Story = StoryObj<typeof TextBox>;
type TextBoxArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox id='textbox' name='textbox' label='ラベル' />
                `.trim()
            }
        }
    }
}

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: '見た目'
            },
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox variant='outlined' label='Outlined' />
                <TextBox variant='filled' label='Filled' />
                <TextBox variant='standard' label='Standard' />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <TextBox {...args} variant='outlined' label='Outlined' />
            <TextBox {...args} variant='filled' label='Filled' />
            <TextBox {...args} variant='standard' label='Standard' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<TextBoxArgs>(meta.argTypes)
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: '大きさ'
            },
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox size='small' label='Small' />
                <TextBox size='medium' label='Medium' />
                <TextBox size='large' label='Large' />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <Stack gap={2}>
                <TextBox {...args} size='small' label='Small' />
                <TextBox {...args} size='medium' label='Medium' />
            </Stack>
            <Stack gap={2}>
                <TextBox {...args} size='small' variant='filled' label='Small' />
                <TextBox {...args} size='medium' variant='filled' label='Medium' />
            </Stack>
            <Stack gap={2}>
                <TextBox {...args} size='small' variant='standard' label='Small' />
                <TextBox {...args} size='medium' variant='standard' label='Medium' />
            </Stack>
        </Stack>
    ),
    argTypes: disableAllArgTypes<TextBoxArgs>(meta.argTypes)
}

export const Status: Story = {
    parameters: {
        docs: {
            description: {
                story: '状態（必須、無効、読み取り専用）'
            },
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox required label='Required' />
                <TextBox disabled label='Disabled' />
                <TextBox readOnly label='ReadOnly' />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <Stack gap={2}>
                <TextBox {...args} required label='Required' />
                <TextBox {...args} disabled label='Disabled' />
                <TextBox {...args} readOnly label='ReadOnly' />
            </Stack>
            <Stack gap={2}>
                <TextBox {...args} required variant='filled' label='Required' />
                <TextBox {...args} disabled variant='filled' label='Disabled' />
                <TextBox {...args} readOnly variant='filled' label='ReadOnly' />
            </Stack>
            <Stack gap={2}>
                <TextBox {...args} required variant='standard' label='Required' />
                <TextBox {...args} disabled variant='standard' label='Disabled' />
                <TextBox {...args} readOnly variant='standard' label='ReadOnly' />
            </Stack>
        </Stack>
    ),
    argTypes: disableAllArgTypes<TextBoxArgs>(meta.argTypes)
}

export const Error: Story = {
    parameters: {
        docs: {
            description: {
                story: 'エラー'
            },
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox error label='Error' helperText='This field is required.' />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <TextBox {...args} error label='Error' helperText='error message' />
            <TextBox {...args} error variant='filled' label='Error' helperText='error message' />
            <TextBox {...args} error variant='standard' label='Error' helperText='error message' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<TextBoxArgs>(meta.argTypes)
}

export const Multiline: Story = {
    parameters: {
        docs: {
            description: {
                story: 'マルチライン'
            },
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox multiline rows={4} label='Multiline' />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <TextBox {...args} multiline rows={4} label='Multiline' />
            <TextBox {...args} multiline rows={4} variant='filled' label='Multiline' />
            <TextBox {...args} multiline rows={4} variant='standard' label='Multiline' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<TextBoxArgs>(meta.argTypes)
}

export const Adornment: Story = {
    parameters: {
        docs: {
            description: {
                story: '装飾付き'
            },
            source: {
                code: `
                import TextBox from '@/components/ui/form/input/text/TextBox';

                <TextBox label='金額' startAdornment={<span>$</span>} />
                <TextBox label='重量' endAdornment={<span>kg</span>} />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <Stack gap={2}>
                <TextBox
                    {...args}
                    label='金額'
                    startAdornment={<span>$</span>} />
                <TextBox
                    {...args}
                    label='重量'
                    endAdornment={<span>kg</span>} />
            </Stack>
            <Stack gap={2}>
                <TextBox
                    {...args}
                    variant='filled'
                    label='金額'
                    startAdornment={<span>$</span>} />
                <TextBox
                    {...args}
                    variant='filled'
                    label='重量'
                    endAdornment={<span>kg</span>} />
            </Stack>
            <Stack gap={2}>
                <TextBox
                    {...args}
                    variant='standard'
                    label='金額'
                    startAdornment={<span>$</span>} />
                <TextBox
                    {...args}
                    variant='standard'
                    label='重量'
                    endAdornment={<span>kg</span>} />
            </Stack>
        </Stack>
    ),
    argTypes: disableAllArgTypes<TextBoxArgs>(meta.argTypes)
}