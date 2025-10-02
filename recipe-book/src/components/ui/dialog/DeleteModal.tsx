
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../button/Button";
import Alert from "../feedback/Alert";

export default function DeleteModal({
    open,
    targetName,
    loading,
    error,
    onDelete,
    onClose
}: {
    open: boolean;
    targetName: string;
    loading?: boolean;
    error?: string | null;
    onDelete: () => void;
    onClose: () => void;
}) {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{ px: 2, py: 1.5, borderBottom: '1px solid #ccc' }}>
                削除
            </DialogTitle>

            <DialogContent sx={{ mt: 3, mb: 1 }}>
                <Alert severity="error" visible={!!error}>
                    {error}
                </Alert>

                {targetName} を削除しますか？
                この操作は取り消せません。
            </DialogContent>

            <DialogActions
                sx={{ px: 2, py: 1, borderTop: '1px solid #ccc' }}>
                <Button variant='text' color='inherit' onClick={onClose} disabled={loading}>
                    キャンセル
                </Button>
                <Button variant='text' color='error' loading={loading} onClick={onDelete}>
                    削除
                </Button>
            </DialogActions>
        </Dialog>
    )
}