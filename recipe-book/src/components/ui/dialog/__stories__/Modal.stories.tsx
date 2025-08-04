import { disableAllArgTypes } from '@/stories/utils';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent } from '@storybook/testing-library';
import { useState } from 'react';
import Button from '../../button/Button';
import Modal from '../Modal';

const meta: Meta<typeof Modal> = {
    title: 'UI/Dialog/Modal',
    component: Modal,
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
                category: 'base'
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
        title: 'modal',
        children: 'content',
    }
}

export default meta;
type Story = StoryObj<typeof Modal>;
type ModalArgs = typeof meta.args;

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>open</Button>
                <Modal
                    {...args}
                    open={open}
                    onClose={() => setOpen(false)}>
                    {args.children}
                </Modal>
            </>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import Modal form '@/components/ui/dialog/Modal';
                
                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <Modal 
                            open={open} 
                            title='Modal'
                            onClose={() => setOpen(false)}>
                            content
                        </Modal>
                    </>
                );
                `.trim(),
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = canvasElement as HTMLElement;
        const button = canvas.querySelector('button');

        await userEvent.click(button!);

        const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(cancelButton);
    }
}

export const ReadOnly: Story = {
    render: () => {
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
    },
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
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes)
}

export const Blocking: Story = {
    render: () => {
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
    },
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
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes),
    play: async ({ canvasElement }) => {
        const canvas = canvasElement as HTMLElement;
        const button = canvas.querySelector('button');

        await userEvent.click(button!);

        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
        expect(screen.queryByText('Blocking Modal')).toBeInTheDocument();

        await userEvent.keyboard('{Escape}');
        expect(screen.queryByText('Blocking Modal')).toBeInTheDocument();

        const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(cancelButton);

        await new Promise(resolve => setTimeout(resolve, 500));
        expect(screen.queryByText('Blocking Modal')).not.toBeInTheDocument();
    }
}

export const Loading: Story = {
    render: () => {
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
    },
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
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes)
}