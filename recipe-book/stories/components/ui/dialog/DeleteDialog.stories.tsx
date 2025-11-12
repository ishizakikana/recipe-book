import Button from '@/components/ui/button/Button';
import DeleteDialog from '@/components/ui/dialog/DeleteDialog';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor } from '@storybook/testing-library';
import { within } from '@testing-library/react';
import { useState } from 'react';
import { disableAllArgTypes } from '../../../__utils__/utils';

const meta: Meta<typeof DeleteDialog> = {
    title: 'Components/UI/Dialog/DeleteDialog',
    component: DeleteDialog,
    argTypes: {
        open: {
            control: false,
            description: '開閉状態',
            table: {
                category: 'status',
                defaultValue: { summary: 'false' }
            }
        },
        target: {
            control: 'text',
            description: '削除対象',
            table: {
                category: 'props'
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
        error: {
            control: 'text',
            description: 'エラーメッセージ',
            table: {
                category: 'status'
            }
        },
        onDeleteButtonClick: {
            control: false,
            description: '削除ボタンクリックイベント',
            table: {
                category: 'event'
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
        target: 'コンテンツ',
    }
}

export default meta;
type Story = StoryObj<typeof DeleteDialog>;
type ModalArgs = typeof meta.args;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import DeleteDialog form '@/components/ui/dialog/DeleteDialog';
                
                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <DeleteDialog 
                            open={open} 
                            target='コンテンツ'
                            onClose={() => setOpen(false)} />
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
                <DeleteDialog
                    {...args}
                    open={open}
                    onClose={() => setOpen(false)} />
            </>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // ダイアログ表示
        const openButton = canvas.getByRole('button', { name: 'open' });
        await userEvent.click(openButton);
        const dialog = await screen.findByRole('dialog');

        // ダイアログ非表示（キャンセルボタン）
        const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(cancelButton);
        await waitFor(() => {
            expect(dialog).not.toBeVisible();
        });

        // ダイアログ非表示（背景クリック）
        await userEvent.click(openButton);
        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        }
        await waitFor(() => {
            expect(dialog).not.toBeVisible();
        });

        // ダイアログ非表示（Escキー）
        await userEvent.click(openButton);
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
            expect(dialog).not.toBeVisible();
        });
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
                import DeleteDialog from '@/components/ui/dialog/DeleteDialog';

                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <DeleteDialog 
                            open={open} 
                            target='コンテンツ'
                            loading
                            onClose={() => setOpen(false)} />
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
                <DeleteDialog
                    open={open}
                    target='コンテンツ'
                    loading
                    onClose={() => setOpen(false)} />
            </>
        );
    },
    argTypes: disableAllArgTypes<ModalArgs>(meta.argTypes)
}

export const Error: Story = {
    parameters: {
        docs: {
            source: {
                code: `
                import { useState } from 'react';
                import Button from '@/components/ui/button/button/Button';
                import DeleteDialog form '@/components/ui/dialog/DeleteDialog';
                
                const [open, setOpen] = useState(false);

                return (
                    <>
                        <Button onClick={() => setOpen(true)}>open</Button>

                        <DeleteDialog 
                            open={open} 
                            target='コンテンツ'
                            error='エラーが発生しました。'
                            onClose={() => setOpen(false)} />
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
                <DeleteDialog
                    {...args}
                    open={open}
                    error='エラーが発生しました。'
                    onClose={() => setOpen(false)} />
            </>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // ダイアログ表示
        const openButton = canvas.getByRole('button', { name: 'open' });
        await userEvent.click(openButton);
        const dialog = await screen.findByRole('dialog');

        // エラーメッセージ表示確認
        await waitFor(async () => {
            const errorMessage = await within(dialog).findByText('エラーが発生しました。');
            expect(errorMessage).toBeVisible();
        });
    }
}