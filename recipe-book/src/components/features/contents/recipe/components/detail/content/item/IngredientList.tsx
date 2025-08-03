import { Box, Divider, List, ListItem, Typography } from '@mui/material';

/**
 * 材料リスト
 */
export default function IngredientList({
    ingredients
}: {
    ingredients: {
        id: number,
        name: string,
        volume: string | null
    }[]
}) {

    if (!ingredients) {
        return null;
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <List>
                {ingredients.map(ingredient => (
                    <div key={ingredient.id}>
                        <ListItem disablePadding>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Typography variant='body1' sx={{ flexGrow: 1 }}>
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