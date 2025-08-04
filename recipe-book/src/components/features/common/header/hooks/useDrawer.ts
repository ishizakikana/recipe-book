import { useState } from 'react';

export function useDrawer() {

    //ドロワーの開閉状態
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    /**
     * ドロワー開閉状態切り替え
     * @returns {void}
     */
    const toggleDrawer = () => setDrawerOpen(prev => !prev);

    /**
     * ドロワー非表示
     * @returns {void}
     */
    const closeDrawer = () => setDrawerOpen(false);

    return {
        drawerOpen,
        closeDrawer,
        toggleDrawer
    }
}