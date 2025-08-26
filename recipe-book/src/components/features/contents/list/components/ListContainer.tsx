'use client'
import { useListContext } from '@/components/features/contents/list/hooks/useListContext';
import Snackbar from '@/components/ui/feedback/Snackbar';
import { Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import DesktopListButtons from './buttons/DesktopListButtons';
import MobileListButtons from './buttons/MobileListButtons';
import ShoppingList from './list/ShoppingList';

/**
 * 買い物リストカード
 */
export default function ListContainer() {

    // スマホ判定
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { error, setError } = useListContext();

    return (
        <Paper elevation={5}
            sx={{
                position: 'relative', display: 'flex', width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                height: '100%', pt: { xs: 2 }, pl: 4, pr: 3,
            }}>

            <Stack direction='column' gap={3} sx={{ width: '100%', py: 4 }}>
                {mobile ? <MobileListButtons /> : <DesktopListButtons />}

                <ShoppingList />

                <Snackbar
                    open={!!error}
                    message={error ? error : ''}
                    severity='error'
                    onClose={() => setError(null)} />
            </Stack>
        </Paper>
    )
}