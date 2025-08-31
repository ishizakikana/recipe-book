import Button from '@/components/ui/button/Button';
import IconButton from '@/components/ui/button/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent, DialogTitle, ModalProps, SlotProps } from '@mui/material';
import Dialog, { DialogBackdropSlotPropsOverrides, DialogContainerSlotPropsOverrides, DialogOwnerState, DialogPaperSlotPropsOverrides, DialogRootSlotPropsOverrides } from '@mui/material/Dialog';
import { ElementType, JSX, ReactNode } from 'react';

/**
 * モーダル
 */
export default function FormModal({
    children,
    open,
    title,
    hasSubmitButton = true,
    hasCancelButton = true,
    disableBackDropClick = false,
    disableEscapeKeyDown = false,
    loading,
    slotProps,
    onClose
}: {
    children?: ReactNode
    open: boolean;
    title?: string;
    hasSubmitButton?: boolean;
    hasCancelButton?: boolean;
    disableBackDropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    loading?: boolean;
    slotProps?: {
        root?: SlotProps<
            ElementType<ModalProps, keyof JSX.IntrinsicElements>,
            DialogRootSlotPropsOverrides,
            DialogOwnerState
        >;
        backdrop?: SlotProps<
            'div',
            DialogBackdropSlotPropsOverrides,
            DialogOwnerState
        >;
        container?: SlotProps<
            'div',
            DialogContainerSlotPropsOverrides,
            DialogOwnerState
        >;
        transition?: SlotProps<
            typeof import('@mui/material/Fade').default,
            object,
            DialogOwnerState
        >;
        paper?: SlotProps<
            'div',
            DialogPaperSlotPropsOverrides,
            DialogOwnerState
        >;
    };
    onClose?: () => void;
}) {

    // 非表示イベント
    const handleClose = (
        e: object,
        reason: 'backdropClick' | 'escapeKeyDown'
    ) => {

        // 外側クリック無効フラグが有効なとき、バックドロップのクリックイベントを無効化
        if (disableBackDropClick && reason === 'backdropClick') return;

        // ESCキー無効フラグが有効なとき、ESCキーイベントを無効化
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') return;

        onClose?.();
    }

    return (
        <Dialog open={open} onClose={handleClose} slotProps={slotProps}>
            <DialogTitle
                sx={{ px: 2, py: 1.5, borderBottom: '1px solid #ccc' }}
                color={'ui.contrastText'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                {title}
                <IconButton
                    color={'ui'}
                    icon={<CloseIcon />}
                    onClick={onClose} />
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                {children}
            </DialogContent>

            {(hasSubmitButton || hasCancelButton) && (
                <DialogActions
                    sx={{ px: 2, py: 1, borderTop: '1px solid #ccc' }}>

                    {hasCancelButton && (
                        <Button
                            color={'ui'}
                            variant='text'
                            onClick={onClose}>
                            キャンセル
                        </Button>
                    )}

                    {hasSubmitButton && (
                        <Button
                            variant='text'
                            type='submit'
                            loading={loading}>
                            登録
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
}