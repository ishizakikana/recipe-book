import SelectBox from '@/components/ui/form/SelectBox';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { disableAllArgTypes } from '../../__utils__/utils';

const meta: Meta<typeof SelectBox> = {
    title: 'UI/Form/SelectBox',
    component: SelectBox,
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
            description: 'ラベル',
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
        size: {
            options: ['small', 'medium'],
            control: { type: 'inline-radio' },
            description: 'サイズ',
            table: {
                category: 'base',
                defaultValue: { summary: 'medium' }
            }
        },
        width: {
            control: { type: 'number' },
            description: '幅',
            table: {
                category: 'base'
            }
        },
        helperText: {
            control: { type: 'text' },
            description: 'ヘルパーテキスト',
            table: {
                category: 'base'
            }
        },
        required: {
            control: { type: 'boolean' },
            description: '必須',
            table: {
                category: 'state',
            }
        },
        disabled: {
            control: { type: 'boolean' },
            description: '無効',
            table: {
                category: 'state'
            }
        },
        error: {
            control: { type: 'boolean' },
            description: 'エラー',
            table: {
                category: 'state'
            }
        },
        value: {
            control: false,
            description: '選択値',
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
        options: {
            control: false,
            description: '選択肢',
            table: {
                category: 'data'
            }
        },
        disableDefaultOption: {
            control: { type: 'boolean' },
            description: 'デフォルトオプション無効化',
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
        id: 'fruit',
        name: 'fruit',
        label: 'fruit',
        width: '200px',
        options: [
            { value: '1', label: 'Apple' },
            { value: '2', label: 'Banana' },
            { value: '3', label: 'Orange' },
        ]
    }
}

export default meta;
type Story = StoryObj<typeof SelectBox>;
type SelectBoxArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
            import SelectBox from '@components/ui/form/select/SelectBox';

            const items = [
                { value: '1', label: 'Apple' },
                { value: '2', label: 'Banana' },
                { value: '3', label: 'Orange' },
            ];

            return (           
                <SelectBox
                    id='fruit'
                    name='fruit'
                    label='fruit'
                    width='200px'
                    items={items} />
            );
            `.trim(),
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
            import SelectBox from '@components/ui/form/select/SelectBox';

            const items = [
                { value: '1', label: 'Apple' },
                { value: '2', label: 'Banana' },
                { value: '3', label: 'Orange' },
            ];

            return (           
                <Stack direction='row' spacing={2}>
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        variant='outlined' />
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        variant='filled' />
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        variant='standard' />
                </Stack>
            );
            `.trim(),
            },
        },
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <SelectBox {...args} variant='outlined' />
            <SelectBox {...args} variant='filled' />
            <SelectBox {...args} variant='standard' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<SelectBoxArgs>(meta.argTypes)
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'サイズ'
            },
            source: {
                code: `
            import SelectBox from '@components/ui/form/select/SelectBox';

            const items = [
                { value: '1', label: 'Apple' },
                { value: '2', label: 'Banana' },
                { value: '3', label: 'Orange' },
            ];

            return (           
                <Stack direction='row' spacing={2}>
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        size='small' />
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        size='medium' />
                </Stack>
            );
            `.trim(),
            },
        },
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <SelectBox {...args} size='small' />
            <SelectBox {...args} size='medium' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<SelectBoxArgs>(meta.argTypes)
}

export const Status: Story = {
    parameters: {
        docs: {
            description: {
                story: '状態（必須、無効）'
            },
            source: {
                code: `
            import SelectBox from '@components/ui/form/select/SelectBox';

            const items = [
                { value: '1', label: 'Apple' },
                { value: '2', label: 'Banana' },
                { value: '3', label: 'Orange' },
            ];

            return (           
                <Stack direction='row' spacing={2}>
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        required />
                    <SelectBox
                        id='fruit'
                        name='fruit'
                        label='fruit'
                        width='200px'
                        items={items}
                        disabled />
                </Stack>
            );
            `.trim(),
            },
        },
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <SelectBox {...args} required />
            <SelectBox {...args} disabled />
        </Stack>
    ),
    argTypes: disableAllArgTypes<SelectBoxArgs>(meta.argTypes)
}

export const Error: Story = {
    parameters: {
        docs: {
            description: {
                story: 'エラー'
            },
            source: {
                code: `
                import SelectBox from '@components/ui/form/select/SelectBox';

                const items = [
                    { value: '1', label: 'Apple' },
                    { value: '2', label: 'Banana' },
                    { value: '3', label: 'Orange' },
                ];

                return (           
                    <Stack direction='row' spacing={2}>
                        <SelectBox
                            id='fruit'
                            name='fruit'
                            label='fruit'
                            width='200px'
                            items={items}
                            error
                            helperText='error message' />
                    </Stack>
                );
                `.trim(),
            },
        },
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <SelectBox
                {...args}
                error
                helperText='error message' />
        </Stack>
    ),
    argTypes: disableAllArgTypes<SelectBoxArgs>(meta.argTypes)
}