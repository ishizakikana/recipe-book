import { Alert } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

/**
 * スナックバー
 */
export default function Snackbar({
    open,
    message,
    severity,
    onClose,
}: {
    open?: boolean
    message?: string
    severity?: 'success' | 'info' | 'warning' | 'error'
    onClose?: () => void
}) {

    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={onClose}>
            <Alert
                severity={severity}
                onClose={onClose}>{message}</Alert>
        </MuiSnackbar>
    );
}