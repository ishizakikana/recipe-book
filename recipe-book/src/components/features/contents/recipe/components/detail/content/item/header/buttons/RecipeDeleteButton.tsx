'use client'

import IconButton from '@/components/ui/button/IconButton';
import DeleteDialog from '@/components/ui/dialog/DeleteDialog';
import { useDialog } from '@/hooks/useDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// TODO 削除処理

/**
 * レシピ削除ボタン
 */
export default function RecipeDeleteButton({
    recipeId,
    recipeName,
    onDelete,
}: {
    recipeId: number
    recipeName: string
    onDelete?: () => boolean
}) {
    const router = useRouter();
    const { open, onOpen, onClose } = useDialog();

    // 削除ボタンクリックイベント
    const onDeleteButtonClick = () => {
        const result = onDelete?.();

        if (result) {
            onClose();
        } else {

        }
    }

    return (
        <>
            <IconButton
                icon={<DeleteIcon />}
                color='ui'
                tooltip
                tipTitle='削除'
                tipPlacement='top'
                tipOffset={[0, -8]}
                onClick={onOpen} />

            <DeleteDialog
                open={open}
                target={recipeName}
                onDeleteButtonClick={onDeleteButtonClick}
                onClose={onClose} />
        </>
    )
}