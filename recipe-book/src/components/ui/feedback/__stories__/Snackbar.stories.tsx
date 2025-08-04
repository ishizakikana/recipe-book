import { disableAllArgTypes } from '@/stories/utils';
import { Box, Stack } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Button from '../../button/Button';
import Snackbar from '../Snackbar';

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
    }
}

export const Servery: Story = {
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
    argTypes: disableAllArgTypes<SnackbarArgs>(meta.argTypes)
}