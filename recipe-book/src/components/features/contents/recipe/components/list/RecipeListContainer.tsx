'use client'
import RecipeSummaryCard from '@/components/features/contents/recipe/components/list/RecipeSummaryCard';
import SearchAccordion from '@/components/features/contents/recipe/components/list/search/SearchAccordion';
import { RecipeSummary } from "@/types/entity";
import { Box, Grid } from "@mui/material";
import { RecipeCategory } from '@prisma/client';
import { useRecipeList } from "../../hooks/useRecipeList";
import { RecipeSearchInput } from '../../type';

export default function RecipeListContainer({
    initialRecipes,
    recipeCategories,
    searchInput
}: {
    initialRecipes: RecipeSummary[]
    recipeCategories: RecipeCategory[]
    searchInput: RecipeSearchInput
}) {

    const { recipes, search, update } = useRecipeList(initialRecipes);

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <SearchAccordion categories={recipeCategories} searchInput={searchInput} search={search} />

            <Grid container rowSpacing={3} columnSpacing={5}
                columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
                px={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                sx={{ py: 4 }}>

                {recipes
                    .filter(r => r.visible)
                    .map(recipe =>
                        <Grid key={recipe.id} size={1}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <RecipeSummaryCard recipe={recipe} />
                        </Grid>
                    )}
            </Grid>
        </Box>
    )
}