'use client'

import { User } from '@prisma/client';
import { useDrawer } from '../../hooks/useDrawer';
import MenuDrawer from './drawer/MenuDrawer';
import OpenMenuButton from './open/OpenMenuButton';

/**
 * メニュー
 */
export default function Menu({
    user
}: {
    user: User
}) {
    const { drawerOpen, toggleDrawer } = useDrawer();

    return (
        <>
            <OpenMenuButton
                onClick={toggleDrawer} />

            <MenuDrawer
                user={user}
                drawerOpen={drawerOpen}
                onClose={toggleDrawer} />
        </>
    )
}