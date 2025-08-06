import Chip, { ChipColors } from '@/components/ui/display/Chip';
import { RecipeCategorySummary, RecipeDetail } from '@/types/entity';
import { Stack, Typography } from '@mui/material';
import RecipeEditButton from './edit/RecipeEditButton';

/**
 * レシピタイトル
 */
export default function RecipeTitle({
    recipe,
}: {
    recipe: RecipeDetail
}) {

    const category = recipe.category as RecipeCategorySummary;

    return (
        <>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack sx={{ flexDirection: 'row', gap: 2 }}>
                    <Typography variant='h6' component='h2' fontWeight={500}>{recipe.name}</Typography>
                    <Chip
                        label={category.name}
                        color={category.color as ChipColors} />
                </Stack>

                <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                    {recipe.calories && recipe.shelfLife &&
                        <>
                            {recipe.shelfLife &&
                                <Typography variant='body2'>{recipe.shelfLife}</Typography>
                            }
                            {recipe.calories && recipe.shelfLife &&
                                <Typography variant='body2'>/</Typography>}
                            {recipe.calories &&
                                <Typography variant='body2'>{recipe.calories}kcal</Typography>}
                        </>
                    }
                    <RecipeEditButton />
                </Stack>
            </Stack>
        </>
    )
}