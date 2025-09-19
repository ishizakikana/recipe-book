'use client'
import IconButton from '@/components/ui/button/IconButton';
import useMenu from '@/hooks/useMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@mui/material';
import BulkToggleStatusButton from './button/BulkToggleStatusButton';
import CreateButton from './button/CreateButton';
import DeleteButton from './button/DeleteButton';

/**
 * リストボタン群（モバイル用）
 */
export default function MobileListButtons() {

    const { open, anchorEl, onOpen, onClose } = useMenu();

    return (
        <>
            <IconButton
                icon={<MoreVertIcon />}
                ariaLabel='メニューを開く'
                color='ui'
                sx={{ position: 'absolute', top: 10, right: 2 }}
                onClick={onOpen} />

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}>

                <CreateButton mobile />

                {[false, true].map((markAsDone, idx) => (
                    <BulkToggleStatusButton
                        key={idx}
                        mobile
                        markAsDone={markAsDone} />
                ))}

                <DeleteButton mobile />
            </Menu>
        </>
    )
}