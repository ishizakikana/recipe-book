'use client'
import Snackbar from '@/components/ui/feedback/snackbar/Snackbar';
import { Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ListCategory, ListItem } from '@prisma/client';
import { useItemList } from '../hooks/useItemList';
import DesktopListButtons from './buttons/DesktopListButtons';
import MobileListButtons from './buttons/MobileListButtons';
import ShoppingList from './list/ShoppingList';

/**
 * 買い物リストカード
 */
export default function ShoppingListCard({
    listCategories,
    initialListItems,
    useItemListHook = useItemList
}: {
    listCategories: ListCategory[]
    initialListItems: ListItem[]
    useItemListHook?: typeof useItemList
}) {

    // スマホ判定
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        categorizedItems,
        error,
        create,
        update,
        updateAll,
        deleteAll,
        setError
    } = useItemListHook(listCategories, initialListItems);

    const buttonsProps = { listCategories, create, updateAll, deleteAll };

    return (
        <Paper elevation={5}
            sx={{
                position: 'relative', display: 'flex', width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                height: '100%', pt: { xs: 2 }, pl: 4, pr: 3,
            }}>

            <Stack direction='column' gap={3} sx={{ width: '100%', py: 4 }}>
                {mobile
                    ? <MobileListButtons {...buttonsProps} />
                    : <DesktopListButtons {...buttonsProps} />
                }

                <ShoppingList
                    categorizedItems={categorizedItems}
                    update={update} />

                <Snackbar
                    open={!!error}
                    message={error ? error : ''}
                    severity='error'
                    onClose={() => setError(null)} />
            </Stack>

        </Paper>
    )
}