'use client'
import { RecipeDetail } from '@/types/entity';
import { DialogContent, DialogTitle } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import { useRecipeModal as defaultUseRecipeModal } from '../../hooks/useRecipeModal';
import RecipeTitle from './content/item/title/RecipeTitle';
import RecipeContent from './content/RecipeContent';

/**
 * レシピ詳細ダイアログ 
 */
export default function RecipeDetailDialog({
    recipe,
    useRecipeModal = defaultUseRecipeModal
}: {
    recipe: RecipeDetail
    useRecipeModal?: typeof defaultUseRecipeModal
}) {

    const { open, onClose } = useRecipeModal();

    return (
        <MuiDialog
            open={open}
            fullWidth
            maxWidth='lg'
            scroll='paper'
            sx={{ height: '100%' }}
            onClose={onClose}>

            <DialogTitle sx={{ borderBottom: '1px solid #ccc' }}>
                <RecipeTitle recipe={recipe} />
            </DialogTitle>

            <DialogContent>
                <RecipeContent recipe={recipe} />
            </DialogContent>

        </MuiDialog>
    )
}