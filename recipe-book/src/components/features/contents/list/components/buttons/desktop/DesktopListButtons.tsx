'use client'

import { ButtonGroup, Stack } from '@mui/material';
import { ListCategory } from '@prisma/client';
import { CreateFormInput } from '../../../type';
import BulkToggleStatusButton from '../buttons/bulkToggleStatus/BulkToggleStatusButton';
import CreateButton from '../buttons/create/CreateButton';
import DeleteButton from '../buttons/delete/DeleteButton';

/**
 * リストボタン群（デスクトップ用）
 */
export default function DesktopListButtons({
    listCategories,
    onCreate,
    onUpdateAll,
    onDeleteAll
}: {
    listCategories: ListCategory[],
    onCreate: (item: CreateFormInput) => void,
    onUpdateAll: (isDone: boolean, onFinally: () => void) => void
    onDeleteAll: (onFinally: () => void) => void
}) {

    return (
        <Stack width='100%' alignItems='center'>
            <ButtonGroup variant='outlined'>
                <CreateButton
                    onCreate={onCreate}
                    listCategories={listCategories}
                    mobile={false} />

                {[false, true].map((markAsDone, idx) => (
                    <BulkToggleStatusButton
                        key={idx}
                        markAsDone={markAsDone}
                        onUpdateAll={onUpdateAll}
                        mobile={false} />
                ))}

                <DeleteButton
                    onDeleteAll={onDeleteAll}
                    mobile={false}
                />
            </ButtonGroup>
        </Stack>
    )
}