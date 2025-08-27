'use client'
import IconButton from '@/components/ui/button/IconButton';
import { useDialog } from '@/hooks/useDialog';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Stack } from '@mui/material';
import { User } from '@prisma/client';
import { useCloseOnNavigation } from '../../hooks/useCloseOnNavigation';
import MenuLinks from './items/MenuLinks';
import UserPanel from './items/UserPanel';

/**
 * メニュー
 */
export default function Menu({
    user
}: {
    user: User
}) {
    const { open, onOpen, onClose } = useDialog();
    useCloseOnNavigation(onClose);

    return (
        <>
            <IconButton
                icon={<MenuIcon />}
                color='inherit'
                ariaLabel='メニューを開く'
                edge='start'
                sx={{ mr: 2 }}
                onClick={onOpen} />

            <nav>
                <Drawer
                    variant='temporary'
                    open={open}
                    ModalProps={{ keepMounted: true }}
                    sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}
                    onClose={onClose}>

                    <Stack
                        justifyContent='space-between'
                        sx={{ height: '100%', p: 2, bgcolor: 'primary.main' }}>

                        <MenuLinks />
                        <UserPanel user={user} />
                    </Stack>
                </Drawer>
            </nav>
        </>
    )
}