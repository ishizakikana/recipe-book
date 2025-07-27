'use client';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import ListButton from '../ListButton';

/**
 * リストアイテム完了状態一括切り替えボタン
 */
export default function BulkToggleStatusButton({
    markAsDone = false,
    mobile,
    onUpdateAll
}: {
    markAsDone?: boolean
    mobile: boolean
    onUpdateAll: (isDone: boolean, onFinally: () => void) => void
}) {

    // ローディング管理
    const [loading, setLoading] = useState(false);

    // クリックイベント
    const onClick = async () => {
        if (loading) return; // すでに処理中の場合は何もしない
        setLoading(true);

        // すべてのアイテムの完了状態を更新
        onUpdateAll(markAsDone, () => setLoading(false));
    }

    return (
        <ListButton
            text={markAsDone ? 'すべて完了済み' : 'すべて未完了'}
            icon={markAsDone ? <CheckIcon /> : <UndoIcon />}
            loading={loading}
            mobile={mobile}
            onClick={onClick} />
    )
}