'use client'
import Snackbar from '@/components/ui/feedback/snackbar/Snackbar';
import { Paper, Stack } from '@mui/material';
import { ListCategory, ListItem } from '@prisma/client';
import { useItemList } from '../hooks/useItemList';
import ListButtonContainer from './buttons/ListButtonContainer';
import ShoppingList from './list/ShoppingList';

/**
 * 買い物リストカード
 */
export default function ShoppingListCard({
    listCategories,
    initialListItems
}: {
    listCategories: ListCategory[],
    initialListItems: ListItem[]
}) {

    const {
        categorizedItems,
        error,
        create,
        update,
        updateAll,
        deleteAll,
        setError
    } = useItemList(listCategories, initialListItems);

    return (
        <Paper elevation={5}
            sx={{
                position: 'relative', display: 'flex', width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                height: '100%', pt: { xs: 2 }, pl: 4, pr: 3,
            }}>

            <Stack direction='column' gap={3} sx={{ width: '100%', py: 4 }}>
                <ListButtonContainer
                    listCategories={listCategories}
                    onCreate={create}
                    onUpdateAll={updateAll}
                    onDeleteAll={deleteAll} />

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