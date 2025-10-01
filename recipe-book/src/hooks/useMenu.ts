import { useState } from 'react';

/**
 * メニュー開閉状態管理カスタムフック
 * 
 * @returns
 *  open: メニュー開閉状態
 *  anchorEl: メニューのアンカー要素
 *  onOpen: メニューを開く関数
 *  onClose: メニューを閉じる関数 
 */
export default function useMenu() {

    // 開閉状態管理
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const onClose = () => setAnchorEl(null);

    return { open, anchorEl, onOpen, onClose }
}