'use client';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { useItemList } from '../../../hooks/itemList/useItemList';
import ListButton from './ListButton';

/**
 * リストアイテム完了状態一括切り替えボタン
 */
export default function BulkToggleStatusButton({
    markAsDone = false,
    mobile = false,
    propUpdateAll
}: {
    markAsDone?: boolean
    mobile?: boolean
    propUpdateAll?: (isDone: boolean, onFinally: () => void) => Promise<void>
}) {

    const { updateAll: contextUpdateAll } = useItemList();
    const updateAll = propUpdateAll ?? contextUpdateAll;

    // ローディング管理
    const [loading, setLoading] = useState(false);

    // クリックイベント
    const onClick = async () => {
        setLoading(true);

        // すべてのアイテムの完了状態を更新
        await updateAll(markAsDone, () => setLoading(false));
    }

    return (
        <ListButton
            icon={markAsDone ? <CheckIcon /> : <UndoIcon />}
            loading={loading}
            mobile={mobile}
            onClick={onClick}>
            {markAsDone ? 'すべて完了済み' : 'すべて未完了'}
        </ListButton>
    )
}