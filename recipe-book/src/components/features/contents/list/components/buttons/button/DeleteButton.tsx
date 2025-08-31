'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ListButton from '../../../../../../ui/button/ListButton';
import { useItemList as defaultUseItemList } from '../../../hooks/useItemList';

/**
 * 削除ボタン
 */
export default function DeleteButton({
    mobile = false,
    useItemList = defaultUseItemList
}: {
    mobile?: boolean
    useItemList?: typeof defaultUseItemList
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
