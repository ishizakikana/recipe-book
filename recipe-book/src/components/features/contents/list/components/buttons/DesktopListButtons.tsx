'use client'

import { ButtonGroup, Stack } from '@mui/material';
import { ListCategory } from '@prisma/client';
import { CreateItemFormInput } from '../../types';
import BulkToggleStatusButton from './button/BulkToggleStatusButton';
import CreateButton from './button/create/CreateButton';
import DeleteButton from './button/DeleteButton';

/**
 * リストボタン群（デスクトップ用）
 */
export default function DesktopListButtons({
    listCategories,
    create,
    updateAll,
    deleteAll
}: {
    listCategories: ListCategory[],
    create: (item: CreateItemFormInput) => void,
    updateAll: (isDone: boolean, onFinally: () => void) => void
    deleteAll: (onFinally: () => void) => void
}) {

    return (
        <Stack width='100%' alignItems='center'>
            <ButtonGroup variant='outlined'>
                <CreateButton
                    create={create}
                    listCategories={listCategories} />

                {[false, true].map((markAsDone, idx) => (
                    <BulkToggleStatusButton
                        key={idx}
                        markAsDone={markAsDone}
                        updateAll={updateAll} />
                ))}

                <DeleteButton deleteAll={deleteAll} />
            </ButtonGroup>
        </Stack>
    )
}