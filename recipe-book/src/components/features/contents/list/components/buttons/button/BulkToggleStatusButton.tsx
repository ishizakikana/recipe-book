'use client';
import { useItemList as defaultUseItemList } from '@/components/features/contents/list/hooks/useItemList';
import ListButton from '@/components/ui/button/ListButton';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

/**
 * リストアイテム完了状態一括切り替えボタン
 */
export default function BulkToggleStatusButton({
    markAsDone = false,
    mobile = false,
    useItemList = defaultUseItemList
}: {
    markAsDone?: boolean
    mobile?: boolean
    useItemList?: typeof defaultUseItemList
}) {

    const { updateAll } = useItemList();

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