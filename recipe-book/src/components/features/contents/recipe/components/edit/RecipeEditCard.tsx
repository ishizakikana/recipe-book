'use client'
import { Box, Paper, Stack } from '@mui/material';
import RecipeEditForm from './form/RecipeEditForm';

/**
 * レシピ編集カード
 */
export default function RecipeEditCard() {

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