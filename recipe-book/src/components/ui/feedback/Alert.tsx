import { Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { ReactNode } from 'react';

/**
 * アラート
 */
export default function Alert({
    children,
    severity,
    visible
}: {
    children: ReactNode
    severity?: 'success' | 'info' | 'warning' | 'error'
    visible?: boolean
}) {

    if (!visible) return null;

    return (
        <Box mb={3}>
            <MuiAlert
                severity={severity}>
                {children}
            </MuiAlert>
        </Box>
    );
}