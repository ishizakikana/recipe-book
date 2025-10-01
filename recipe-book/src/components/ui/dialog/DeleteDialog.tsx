import Button from '@/components/ui/button/Button';
import IconButton from '@/components/ui/button/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { ReactNode } from 'react';

/**
 * 削除モーダル
 */
export default function DeleteDialog({
    open,
    target,
    loading,
    onDeleteButtonClick,
    onClose
}: {
    open: boolean;
    target?: ReactNode;
    loading?: boolean;
    onDeleteButtonClick?: () => void;
    onClose?: () => void;
}) {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{ px: 2, py: 1.5, borderBottom: '1px solid #ccc' }}
                color={'ui.contrastText'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                削除
                <IconButton
                    color={'ui'}
                    icon={<CloseIcon />}
                    onClick={onClose} />
            </DialogTitle>

            <DialogContent sx={{ mx: 3, my: 4, p: 0 }}>
                <Typography variant='body1'>
                    {target} を削除しますか?
                </Typography>
            </DialogContent>

            <DialogActions
                sx={{ px: 2, py: 1, borderTop: '1px solid #ccc' }}>
                <Button
                    color={'ui'}
                    variant='text'
                    onClick={onClose}>
                    キャンセル
                </Button>

                <Button
                    variant='text'
                    color='error'
                    onClick={onDeleteButtonClick}
                    loading={loading}>
                    削除
                </Button>
            </DialogActions>
        </Dialog>
    );
}