import { useState } from 'react';

/**
 * ダイアログ開閉状態管理カスタムフック
 * 
 * @returns
 *  open: ダイアログ開閉状態
 *  onOpen: ダイアログを開く関数 
 *  onClose: ダイアログを閉じる関数
 */
export function useDialog() {

    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return { open, onOpen, onClose }
}