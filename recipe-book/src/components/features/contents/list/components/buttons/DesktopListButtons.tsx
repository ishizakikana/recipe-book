'use client'

import { ButtonGroup, Stack } from '@mui/material';
import BulkToggleStatusButton from './button/BulkToggleStatusButton';
import CreateButton from './button/CreateButton';
import DeleteButton from './button/DeleteButton';

/**
 * リストボタン群（デスクトップ用）
 */
export default function DesktopListButtons() {

    return (
        <Stack width='100%' alignItems='center'>
            <ButtonGroup variant='outlined'>
                <CreateButton />

                {[false, true].map((markAsDone, idx) => (
                    <BulkToggleStatusButton
                        key={idx}
                        markAsDone={markAsDone} />
                ))}

                <DeleteButton />
            </ButtonGroup>
        </Stack>
    )
}