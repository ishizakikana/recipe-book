import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ListButton from './ListButton';

/**
 * 削除ボタン
 */
export default function DeleteButton({
    mobile = false,
    deleteAll
}: {
    mobile?: boolean
    deleteAll: (onFinally: () => void) => void
}) {

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
            text={'すべての完了済みを削除'}
            icon={<DeleteIcon />}
            mobile={mobile}
            loading={loading}
            onClick={onClick} />
    )
}
