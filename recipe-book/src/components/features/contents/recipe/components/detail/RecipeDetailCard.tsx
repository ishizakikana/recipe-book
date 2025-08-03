import { RecipeDetail } from '@/types/entity';
import { Box, Divider, Paper, Stack } from '@mui/material';
import RecipeContent from './content/RecipeContent';
import RecipeTitle from './content/item/title/RecipeTitle';

/**
 * レシピ詳細カード
 */
export default function RecipeDetailCard({
    recipe
}: {
    recipe: RecipeDetail
}) {

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Paper elevation={10}
                component={Stack}
                sx={{ height: '100%', width: '100%', overflow: 'auto' }}>

                {/* title */}
                <Box sx={{ px: 3, py: 2 }}>
                    <RecipeTitle recipe={recipe} />
                </Box>
                <Divider />

                {/* content */}
                <Box sx={{ px: 3, py: 2 }}>
                    <RecipeContent recipe={recipe} />
                </Box>
            </Paper>
        </Box>
    )
}