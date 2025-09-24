'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useItemList } from '../../../hooks/itemList/useItemList';
import ListButton from './ListButton';

/**
 * 削除ボタン
 */
export default function DeleteButton({
    mobile = false,
    propDeleteAll
}: {
    mobile?: boolean,
    propDeleteAll?: (onFinally: () => void) => Promise<void>
}) {

    const { deleteAll: contextDeleteAll } = useItemList();
    const deleteAll = propDeleteAll ?? contextDeleteAll;

    // ローディング管理
    const [loading, setLoading] = useState(false);

    // クリックイベント
    const onClick = async () => {
        setLoading(true);

        // すべての完了済みアイテムを削除
        deleteAll(() => setLoading(false));
    };

    return (
        <ListButton
            icon={<DeleteIcon />}
            mobile={mobile}
            loading={loading}
            onClick={onClick}>
            すべての完了済みを削除
        </ListButton>
    )
}
