'use client'
import Loading from '@/app/loading';
import { RecipeDetail } from '@/types/viewModel';
import { Box, Divider, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useRecipeContext as defaultUseRecipeContext } from '../../hooks/useRecipeContext';
import RecipeTitle from './content/item/header/RecipeTitle';
import RecipeContent from './content/RecipeContent';

/**
 * レシピ詳細カード
 */
export default function RecipeDetailCard({
    initialValue,
    useRecipeContext = defaultUseRecipeContext
}: {
    initialValue: RecipeDetail
    useRecipeContext?: typeof defaultUseRecipeContext
}) {

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
        <Box sx={{ height: '100%', width: '100%' }}>
            <Paper elevation={10}
                component={Stack}
                sx={{ height: '100%', width: '100%', overflow: 'auto' }}>

                {/* title */}
                <Box sx={{ px: 3, py: 2 }}>
                    <RecipeTitle recipe={recipeDetail} />
                </Box>
                <Divider />

                {/* content */}
                <Box sx={{ px: 3, py: 2 }}>
                    <RecipeContent recipe={recipeDetail} />
                </Box>
            </Paper>
        </Box>
    )
}