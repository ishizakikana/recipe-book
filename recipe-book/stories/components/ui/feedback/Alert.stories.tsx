import Alert from '@/components/ui/feedback/Alert';
import { Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta } from '@storybook/nextjs';
import { within } from '@testing-library/react';
import { disableAllArgTypes } from '../../../__utils__/utils';

const meta: Meta<typeof Alert> = {
    title: 'Components/UI/Feedback/Alert',
    component: Alert,
    argTypes: {
        children: {
            control: { type: 'text' },
            description: '内容',
            table: {
                category: 'base'
            }
        },
        severity: {
            options: ['success', 'info', 'warning', 'error'],
            control: { type: 'select' },
            description: '種類',
            table: {
                category: 'base',
                defaultValue: { summary: 'success' }
            }
        },
        visible: {
            control: false,
            description: '表示状態',
            table: {
                category: 'status'
            }
        }
    },
    args: {
        children: 'alert message',
        visible: true
    }
}

export default meta;
type Story = Meta<typeof Alert>;
type AlertArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import Alert from '@/components/ui/feedback/alert/Alert';

                <Alert>alert message</Alert>
                `.trim()
            }
        }
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const alert = canvas.getByText(String(args.children));
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(String(args.children));
    }
}

export const Severity: Story = {
    parameters: {
        docs: {
            description: {
                story: '種類'
            },
            source: {
                code: `
                import Alert from '@/components/ui/feedback/alert/Alert';

                <Alert severity='success'>Success Alert</Alert>
                <Alert severity='info'>Info Alert</Alert>
                <Alert severity='warning'>Warning Alert</Alert>
                <Alert severity='error'>Error Alert</Alert>
                `.trim()
            }
        }
    },
    render: (args) => (
        <Stack direction='row' gap={2}>
            <Alert {...args} severity='success'>Success Alert</Alert>
            <Alert {...args} severity='info'>Info Alert</Alert>
            <Alert {...args} severity='warning'>Warning Alert</Alert>
            <Alert {...args} severity='error'>Error Alert</Alert>
        </Stack>
    ),
    argTypes: disableAllArgTypes<AlertArgs>(meta.argTypes)
}