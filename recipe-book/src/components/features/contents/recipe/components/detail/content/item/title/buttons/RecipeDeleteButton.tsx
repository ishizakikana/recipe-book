'use client'
import useRecipeDeleteForm from '@/components/features/contents/recipe/hooks/useRecipeDeleteForm';
import IconButton from '@/components/ui/button/IconButton';
import DeleteModal from '@/components/ui/dialog/DeleteModal';
import { useDialog } from '@/hooks/useDialog';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const { open, onOpen, onClose } = useDialog();
    const { loading, error, onDelete } = useRecipeDeleteForm(recipeId);

    return (
        <>
            <IconButton
                icon={<DeleteIcon />}
                color='ui'
                tooltip
                tipTitle='削除'
                tipPlacement='top'
                tipOffset={[0, -8]}
                onClick={onOpen}
            />

            <DeleteModal
                open={open}
                targetName={recipeName}
                loading={loading}
                error={error}
                onClose={onClose}
                onDelete={onDelete} />
        </>
    )
}