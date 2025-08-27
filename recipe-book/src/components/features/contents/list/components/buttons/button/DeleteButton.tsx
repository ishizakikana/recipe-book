'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useItemList } from '../../../hooks/useItemList';
import ListButton from './ListButton';

/**
 * 削除ボタン
 */
export default function DeleteButton({
    mobile = false,
}: {
    mobile?: boolean
}) {

    const { deleteAll } = useItemList();

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
