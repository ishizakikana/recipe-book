'use client'
import RecipeSummaryCard from '@/components/features/contents/recipe/components/recipes/RecipeSummaryCard';
import SearchAccordion from '@/components/features/contents/recipe/components/recipes/search/SearchAccordion';
import { Box, Grid } from '@mui/material';
import { useRecipeContext } from '../../hooks/useRecipeContext';

/**
 * レシピ一覧コンテナ
 */
export default function RecipesContainer() {

    const { recipeSummaries } = useRecipeContext();

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <SearchAccordion />

            <Grid container rowSpacing={3} columnSpacing={5}
                columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
                px={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                sx={{ py: 4 }}>

                {recipeSummaries
                    .filter(r => r.visible)
                    .map(r =>
                        <Grid key={r.id} size={1}
                            sx={{ display: 'flex', justifyContent: 'center' }}>
                            <RecipeSummaryCard recipe={r} />
                        </Grid>
                    )}
            </Grid>
        </Box>
    )
}