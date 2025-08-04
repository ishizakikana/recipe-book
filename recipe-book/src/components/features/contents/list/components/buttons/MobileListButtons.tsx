import IconButton from '@/components/ui/button/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@mui/material';
import { ListCategory } from '@prisma/client';
import { useState } from 'react';
import { CreateItemFormInput } from '../../types';
import BulkToggleStatusButton from './button/BulkToggleStatusButton';
import CreateButton from './button/create/CreateButton';
import DeleteButton from './button/DeleteButton';

/**
 * リストボタン群（モバイル用）
 */
export default function MobileListButtons({
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

    // メニュー開閉状態管理
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const onClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                icon={<MoreVertIcon />}
                ariaLabel='メニューを開く'
                color='ui'
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 2
                }}
                onClick={onOpen}
            />

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}>

                <CreateButton mobile
                    listCategories={listCategories}
                    create={create} />

                {[false, true].map((markAsDone, idx) => (
                    <BulkToggleStatusButton
                        key={idx}
                        mobile
                        markAsDone={markAsDone}
                        updateAll={updateAll} />
                ))}

                <DeleteButton mobile deleteAll={deleteAll} />
            </Menu>
        </>
    )
}