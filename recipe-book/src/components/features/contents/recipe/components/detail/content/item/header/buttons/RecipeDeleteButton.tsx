'use client'

import IconButton from '@/components/ui/button/IconButton';
import Modal from '@/components/ui/dialog/FormDialog';
import { useDialog } from '@/hooks/useDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

/**
 * レシピ削除ボタン
 */
export default function RecipeDeleteButton({
    recipeId,
    recipeName
}: {
    recipeId: number
    recipeName: string
}) {
    const router = useRouter();
    const { open, onOpen, onClose } = useDialog();

    // 削除ボタンクリックイベント

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

            <Modal
                open={open}
                title='レシピ削除'
                onClose={onClose}>

                <DialogContent>
                    <Typography variant='body1'>{recipeName} を削除しますか?</Typography>
                </DialogContent>
            </Modal>
        </>
    )
}