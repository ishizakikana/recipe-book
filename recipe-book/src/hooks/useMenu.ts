import { useState } from 'react';

export default function useMenu() {

    // 開閉状態管理
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const onClose = () => setAnchorEl(null);

    return { open, anchorEl, onOpen, onClose }
}