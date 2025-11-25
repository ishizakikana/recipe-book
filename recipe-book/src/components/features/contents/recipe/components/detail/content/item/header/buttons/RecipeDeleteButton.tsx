'use client'

import { useRecipeDeleteForm as defaultRecipeDeleteForm } from '@/components/features/contents/recipe/hooks/form/useRecipeDeleteForm';
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
    useRecipeDeleteForm = defaultRecipeDeleteForm,
}: {
    recipeId: number
    recipeName: string
    useRecipeDeleteForm?: typeof defaultRecipeDeleteForm
}) {
    const router = useRouter();
    const { open, onOpen, onClose } = useDialog();
    const { loading, error, onDelete } = useRecipeDeleteForm();

    // 削除ボタンクリックイベント
    const onDeleteButtonClick = async () => {
        const result = await onDelete?.(recipeId);

        if (result) {
            onClose();
            router.push('/recipe'); // レシピ一覧へ遷移
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
                loading={loading}
                error={error ?? undefined}
                onDeleteButtonClick={onDeleteButtonClick}
                onClose={onClose} />
        </>
    )
}