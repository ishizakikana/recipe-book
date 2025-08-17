import Checkbox from '@/components/ui/form/Checkbox';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { disableAllArgTypes } from '../../__utils__/utils';

const meta: Meta<typeof Checkbox> = {
    title: 'UI/Form/Checkbox',
    component: Checkbox,
    argTypes: {
        id: {
            control: false,
            description: 'ID',
            table: {
                category: 'base'
            }
        },
        checked: {
            control: { type: 'boolean' },
            description: '状態',
            table: {
                category: 'status',
            }
        },
        loading: {
            control: { type: 'boolean' },
            description: 'ローディング',
            table: {
                category: 'status',
            }
        },
        onChange: {
            control: false,
            action: 'changed',
            description: '変更イベント',
            table: {
                category: 'event'
            }
        },
    },
}

export default meta;
type Story = StoryObj<typeof Checkbox>;
type CheckboxArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import { useState } from 'react';
                import Checkbox from '@/components/ui/form/checkbox/Checkbox';

                const [checked, setChecked] = useState(false);

                return ()
                    <Checkbox 
                        id='checkbox'
                        checked={checked}
                        onChange={(event, isChecked) => setChecked(isChecked)} />
                );
                `.trim()
            }
        }
    },
    render: (args) => (
        <Checkbox {...args} id='checkbox' />
    )
}

export const Status: Story = {
    parameters: {
        docs: {
            description: {
                story: '状態（チェック済み、未チェック、ローディング）'
            },
            source: {
                code: `
                import Checkbox from '@/components/ui/form/checkbox/Checkbox';

                <Checkbox id='checkbox-checked' checked />
                <Checkbox id='checkbox-unchecked' />
                <Checkbox id='checkbox-loading' loading />
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <Checkbox {...args} id='checkbox-checked' checked />
            <Checkbox {...args} id='checkbox-unchecked' />
            <Checkbox {...args} id='checkbox-loading' loading />
        </Stack>
    ),
    argTypes: disableAllArgTypes<CheckboxArgs>(meta.argTypes)
}

