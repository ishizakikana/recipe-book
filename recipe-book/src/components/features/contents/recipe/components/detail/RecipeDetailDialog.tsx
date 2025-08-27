'use client'
import Loading from '@/app/loading';
import { RecipeDetail } from '@/types/viewModel';
import { DialogContent, DialogTitle } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import { useEffect } from 'react';
import { useRecipeContext } from '../../hooks/useRecipeContext';
import { useRecipeModal as defaultUseRecipeModal } from '../../hooks/useRecipeModal';
import RecipeTitle from './content/item/title/RecipeTitle';
import RecipeContent from './content/RecipeContent';

/**
 * レシピ詳細ダイアログ 
 */
export default function RecipeDetailDialog({
    initialValue,
    useRecipeModal = defaultUseRecipeModal
}: {
    initialValue: RecipeDetail
    useRecipeModal?: typeof defaultUseRecipeModal
}) {

    const { open, onClose } = useRecipeModal();
    const { recipeDetail, setRecipeDetail } = useRecipeContext();

    // 初回読み込み時にレシピをセット
    useEffect(() => {

        if (recipeDetail?.id === initialValue.id) return;
        setRecipeDetail(initialValue);

    }, [initialValue, recipeDetail, setRecipeDetail]);

    if (!recipeDetail || recipeDetail?.id !== initialValue.id) {
        return <Loading />;
    }

    return (
        <MuiDialog
            open={open}
            fullWidth
            maxWidth='lg'
            scroll='paper'
            sx={{ height: '100%' }}
            onClose={onClose}>

            <DialogTitle sx={{ borderBottom: '1px solid #ccc' }}>
                <RecipeTitle recipe={recipeDetail} />
            </DialogTitle>

            <DialogContent>
                <RecipeContent recipe={recipeDetail} />
            </DialogContent>

        </MuiDialog>
    )
}