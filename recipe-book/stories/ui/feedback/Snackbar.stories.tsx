import Button from '@/components/ui/button/Button';
import Snackbar from '@/components/ui/feedback/Snackbar';
import { Box, Stack } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/react';
import { useState } from 'react';
import { disableAllArgTypes } from '../../__utils__/utils';

const meta: Meta<typeof Snackbar> = {
    title: 'UI/Feedback/Snackbar',
    component: Snackbar,
    argTypes: {
        message: {
            control: { type: 'text' },
            description: 'メッセージ',
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
                defaultValue: { summary: 'info' }
            }
        },
        open: {
            control: false,
            description: '表示状態',
            table: {
                category: 'status',
            }
        },
        onClose: {
            action: 'closed',
            description: '非表示イベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        message: 'snackbar message'
    }
}

export default meta;
type Story = StoryObj<typeof Snackbar>;
type SnackbarArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import Snackbar from '@/components/ui/feedback/snackbar/Snackbar';

                const [open, setOpen] = useState(false);

                return ()
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>
                        <Snackbar
                            open={open}
                            message='snackbar message'
                            onClose={() => setOpen(false)} />
                    </>    
                );
                `.trim()
            }
        }
    },
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <Box sx={{ position: 'relative', width: '100vh', height: '150px' }}>
                <Button onClick={() => setOpen(true)}>open</Button>
                <Snackbar
                    {...args}
                    open={open}
                    onClose={() => setOpen(false)} />
            </Box>
        )
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        const button = canvas.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('open');

        // スナックバー非表示
        expect(canvas.queryByText(String(args.message))).not.toBeInTheDocument();

        // ボタンクリックでスナックバー表示
        await button.click();
        const snackbar = await canvas.findByText(String(args.message));
        expect(snackbar).toBeInTheDocument();
        expect(snackbar).toHaveTextContent(String(args.message));

        // スナックバーが自動で非表示になるのを待つ
        await new Promise((resolve) => setTimeout(resolve, 6000));
        expect(canvas.queryByText(String(args.message))).not.toBeInTheDocument();
    }
}

export const Servery: Story = {
    parameters: {
        docs: {
            description: {
                story: '種類'
            },
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import Snackbar from '@/components/ui/feedback/snackbar/Snackbar';

                const [successOpen, setSuccessOpen] = useState(false);
                const [infoOpen, setInfoOpen] = useState(false);
                const [warningOpen, setWarningOpen] = useState(false);
                const [errorOpen, setErrorOpen] = useState(false);

                return (
                    <Box sx={{ position: 'relative', width: '100vh', height: '150px' }}>
                        <Stack direction='row' justifyContent='center' gap={2}>
                            <Button color='success' onClick={() => setSuccessOpen(true)}>Success</Button>
                            <Button color='info' onClick={() => setInfoOpen(true)}>Info</Button>
                            <Button color='warning' onClick={() => setWarningOpen(true)}>Warning</Button>
                            <Button color='error' onClick={() => setErrorOpen(true)}>Error</Button>
                        </Stack>

                        <Snackbar
                            open={successOpen}
                            message='success message'
                            severity='success'
                            onClose={() => setSuccessOpen(false)} />

                        <Snackbar
                            open={infoOpen}
                            message='info message'
                            severity='info'
                            onClose={() => setInfoOpen(false)} />

                        <Snackbar
                            open={warningOpen}
                            message='warning message'
                            severity='warning'
                            onClose={() => setWarningOpen(false)} />

                        <Snackbar
                            open={errorOpen}
                            message='error message'
                            severity='error'
                            onClose={() => setErrorOpen(false)} />
                    </Box>
                );
                `.trim()
            }
        }
    },
    render: () => {
        const [successOpen, setSuccessOpen] = useState(false);
        const [infoOpen, setInfoOpen] = useState(false);
        const [warningOpen, setWarningOpen] = useState(false);
        const [errorOpen, setErrorOpen] = useState(false);

        return (
            <Box sx={{ position: 'relative', width: '100vh', height: '150px' }}>

                <Stack direction='row' justifyContent='center' gap={2}>
                    <Button color='success' onClick={() => setSuccessOpen(true)}>Success</Button>
                    <Button color='info' onClick={() => setInfoOpen(true)}>Info</Button>
                    <Button color='warning' onClick={() => setWarningOpen(true)}>Warning</Button>
                    <Button color='error' onClick={() => setErrorOpen(true)}>Error</Button>
                </Stack>

                <Snackbar
                    open={successOpen}
                    message='success message'
                    severity='success'
                    onClose={() => setSuccessOpen(false)} />

                <Snackbar
                    open={infoOpen}
                    message='info message'
                    severity='info'
                    onClose={() => setInfoOpen(false)} />

                <Snackbar
                    open={warningOpen}
                    message='warning message'
                    severity='warning'
                    onClose={() => setWarningOpen(false)} />

                <Snackbar
                    open={errorOpen}
                    message='error message'
                    severity='error'
                    onClose={() => setErrorOpen(false)} />
            </Box>
        )
    },
    argTypes: disableAllArgTypes<SnackbarArgs>(meta.argTypes)
}