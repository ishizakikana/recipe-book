import { RecipeIngredient } from '@/types/viewModel';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import { RecipeIngredient } from '@prisma/client';

/**
 * 材料リスト
 */
export default function IngredientList({
    ingredients
}: {
    ingredients: RecipeIngredient[]
}) {

    if (!ingredients) {
        return null;
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <List>
                {ingredients.map(ingredient => (
                    <div key={ingredient.id}>
                        <ListItem disablePadding slotProps={{ root: { 'aria-label': 'ingredients-item' } }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Typography variant='body1' sx={{ flexGrow: 1, paddingRight: 1 }}>
                                    {ingredient.name}
                                </Typography>
                                <Typography variant='body1'>
                                    {ingredient.volume}
                                </Typography>
                            </Box>
                        </ListItem>
                        <Divider sx={{ my: 1 }} />
                    </div>
                ))}
            </List>
        </Box>
    )
}