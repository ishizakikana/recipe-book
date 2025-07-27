import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ListButton from '../ListButton';

/**
 * 削除ボタン
 */
export default function DeleteButton({
    onDeleteAll,
    mobile,
}: {
    onDeleteAll: (onFinally: () => void) => void
    mobile: boolean
}) {

    // ローディング管理
    const [loading, setLoading] = useState(false);

    // クリックイベント
    const onClick = async () => {
        if (loading) return; // すでに処理中の場合は何もしない
        setLoading(true);

        // すべての完了済みアイテムを削除
        onDeleteAll(() => setLoading(false));
    };

    return (
        <ListButton
            text={'すべての完了済みを削除'}
            icon={<DeleteIcon />}
            mobile={mobile}
            loading={loading}
            onClick={onClick} />
    )
}
