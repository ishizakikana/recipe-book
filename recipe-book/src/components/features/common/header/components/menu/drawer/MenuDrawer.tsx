'use client'
import { Drawer, Stack } from '@mui/material';
import { User } from '@prisma/client';
import MenuLinks from './items/MenuLinks';
import UserPanel from './items/UserPanel';

/**
 * メニュードロワー
 */
export default function MenuDrawer({
    user,
    drawerOpen,
    onClose,
}: {
    user: User,
    drawerOpen: boolean,
    onClose: () => void
}) {

    return (
        <nav>
            <Drawer
                variant='temporary'
                open={drawerOpen}
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
        </nav >
    )
}