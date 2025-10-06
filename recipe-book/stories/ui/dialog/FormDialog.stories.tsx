import Button from '@/components/ui/button/Button';
import FormDialog from '@/components/ui/dialog/FormDialog';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor } from '@storybook/testing-library';
import { useState } from 'react';
import { disableAllArgTypes } from '../../__utils__/utils';

const meta: Meta<typeof FormDialog> = {
    title: 'UI/Dialog/FormDialog',
    component: FormDialog,
    argTypes: {
        children: {
            control: { type: 'text' },
            description: '内容',
            table: {
                category: 'base'
            }
        },
        title: {
            control: { type: 'text' },
            description: 'タイトル',
            table: {
                category: 'base'
            }
        },
        slotProps: {
            control: false,
            description: 'スロットプロパティ',
            table: {
                category: 'base',
                type: { summary: 'slotProps' }
            }
        },
        open: {
            control: false,
            description: '開閉状態',
            table: {
                category: 'status',
                defaultValue: { summary: 'false' }
            }
        },
        loading: {
            control: { type: 'boolean' },
            description: '送信ボタンのローディング状態',
            table: {
                category: 'status',
                defaultValue: { summary: 'false' }
            }
        },
        disableBackDropClick: {
            control: { type: 'boolean' },
            description: 'バックドロップクリック有効状態',
            table: {
                category: 'status',
                defaultValue: { summary: 'false' }
            }
        },
        disableEscapeKeyDown: {
            control: { type: 'boolean' },
            description: 'Escキー有効状態',
            table: {
                category: 'status',
                defaultValue: { summary: 'false' }
            }
        },
        hasSubmitButton: {
            control: { type: 'boolean' },
            description: '登録ボタンの表示/非表示',
            table: {
                category: 'status',
                defaultValue: { summary: 'true' }
            }
        },
        hasCancelButton: {
            control: { type: 'boolean' },
            description: 'キャンセルボタンの表示/非表示',
            table: {
                category: 'status',
                defaultValue: { summary: 'true' }
            }
        },
        onClose: {
            control: false,
            action: 'closed',
            description: 'モーダル非表示イベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        title: 'Modal',
        children: 'content',
    }
}

export default meta;
type Story = StoryObj<typeof FormDialog>;
type ModalArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import FormDialog form '@/components/ui/dialog/FormDialog';
                
                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <FormDialog 
                            open={open} 
                            title='Modal'
                            onClose={() => setOpen(false)}>
                            content
                        </FormDialog>
                    </>
                );
                `.trim(),
            }
        }
    },
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>open</Button>
                <FormDialog
                    {...args}
                    open={open}
                    onClose={() => setOpen(false)}>
                    {args.children}
                </FormDialog>
            </>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = canvasElement as HTMLElement;

        // ダイアログ表示
        const openButton = canvas.querySelector('button');
        await userEvent.click(openButton!);

        // ダイアログ非表示（キャンセルボタン）
        const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(cancelButton);
        await waitFor(() => {
            expect(screen.queryByText('Modal')).not.toBeVisible();
        });

        // ダイアログ非表示（バックドロップクリック）
        await userEvent.click(openButton!);
        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
        await waitFor(() => {
            expect(screen.queryByText('Modal')).not.toBeVisible();
        });

        // ダイアログ非表示（Escキー）
        await userEvent.click(openButton!);
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
            expect(screen.queryByText('Modal')).not.toBeVisible();
        });
    }
}

export const ReadOnly: Story = {
    parameters: {
        docs: {
            description: {
                story: '読み取り専用モーダル'
            },
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import Modal from '@/components/ui/dialog/Modal';

                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <Modal 
                            open={open} 
                            title='Read Only Modal'
                            hasSubmitButton={false}
                            hasCancelButton={false}
                            onClose={() => setOpen(false)}>
                            read only content
                        </Modal>
                    </>
                );
                `.trim(),
            }
        }
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>open</Button>
                <FormDialog
                    open={open}
                    title='Read Only Modal'
                    hasSubmitButton={false}
                    hasCancelButton={false}
                    onClose={() => setOpen(false)}>
                    read only content
                </FormDialog>
            </>
        );
    },
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes)
}

export const Blocking: Story = {
    parameters: {
        docs: {
            description: {
                story: 'バックドロップクリックとEscキーを無効にしたモーダル'
            },
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import Modal from '@/components/ui/dialog/Modal';

                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <Modal 
                            open={open} 
                            title='Blocking Modal'
                            disableBackDropClick
                            disableEscapeKeyDown
                            onClose={() => setOpen(false)}>
                            blocking content
                        </Modal>
                    </>
                );
                `.trim(),
            }
        }
    },
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>open</Button>
                <FormDialog
                    open={open}
                    title='Blocking Modal'
                    disableBackDropClick
                    disableEscapeKeyDown
                    onClose={() => setOpen(false)}>
                    blocking content
                </FormDialog>
            </>
        );
    },
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes),
    play: async ({ canvasElement }) => {
        const canvas = canvasElement as HTMLElement;

        // ダイアログ表示
        const openButton = canvas.querySelector('button');
        await userEvent.click(openButton!);

        // バックドロップクリックで非表示にならない
        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
        expect(screen.queryByText('Blocking Modal')).toBeInTheDocument();

        // Escキーで非表示にならない
        await userEvent.keyboard('{Escape}');
        expect(screen.queryByText('Blocking Modal')).toBeInTheDocument();

        // キャンセルボタンで非表示
        const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(cancelButton);

        await new Promise(resolve => setTimeout(resolve, 500));
        expect(screen.queryByText('Blocking Modal')).not.toBeInTheDocument();
    }
}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング状態のモーダル'
            },
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import Modal from '@/components/ui/dialog/Modal';

                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <Modal 
                            open={open} 
                            title='Loading Modal'
                            loading
                            onClose={() => setOpen(false)}>
                            loading content
                        </Modal>
                    </>
                );
                `.trim(),
            }
        }
    },
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>open</Button>
                <FormDialog
                    open={open}
                    title='Loading Modal'
                    loading
                    onClose={() => setOpen(false)}>
                    loading content
                </FormDialog>
            </>
        );
    },
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes)
}