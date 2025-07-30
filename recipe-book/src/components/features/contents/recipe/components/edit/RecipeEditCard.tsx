import { RecipeDetail } from '@/types/entity';
import { Box, Paper, Stack } from '@mui/material';
import { RecipeCategory } from '@prisma/client';
import RecipeUpdateForm from './form/RecipeUpdateForm';

/**
 * レシピ編集カード
 */
export default function RecipeEditCard({
    recipe,
    recipeCategories
}: {
    recipe: RecipeDetail
    recipeCategories: RecipeCategory[]
}) {

    return (
        <Box sx={{ height: '100%', width: '100%', px: 2, py: 2 }}>
            <Paper elevation={10}
                component={Stack}
                sx={{ height: '100%', width: '100%', overflow: 'auto', px: 4, py: 3 }}>
                <RecipeUpdateForm recipe={recipe} recipeCategories={recipeCategories} />
            </Paper>
        </Box>
    )
}