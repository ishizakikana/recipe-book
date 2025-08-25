'use client'
import Loading from '@/app/loading';
import { RecipeDetail } from '@/types/entity';
import { Box, Paper, Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import { RecipeContext } from '../../providers/RecipeContextProvider';
import RecipeEditForm from './form/RecipeEditForm';

/**
 * レシピ編集カード
 */
export default function RecipeEditCard({
    initialValue
}: {
    initialValue: RecipeDetail
}) {

    const { recipe, setRecipe } = useContext(RecipeContext);

    // 初回読み込み時にレシピをセット
    useEffect(() => {
        setRecipe(initialValue);

    }, [initialValue, recipe, setRecipe]);

    if (!recipe || recipe.id !== initialValue.id) {
        return <Loading />;
    }

    return (
        <Box sx={{ height: '100%', width: '100%', px: 2, py: 2 }}>
            <Paper elevation={10}
                component={Stack}
                sx={{ height: '100%', width: '100%', overflow: 'auto', px: 4, py: 3 }}>
                <RecipeEditForm />
            </Paper>
        </Box>
    )
}