import Chip, { ChipColors } from '@/components/ui/display/Chip';
import { RecipeDetail } from '@/types/viewModel';
import { Stack, Typography } from '@mui/material';
import { RecipeCategory } from '@prisma/client';
import RecipeDeleteButton from './buttons/RecipeDeleteButton';
import RecipeEditButton from './buttons/RecipeEditButton';

/**
 * レシピタイトル
 */
export default function RecipeTitle({
    recipe,
}: {
    recipe: RecipeDetail
}) {

    const category: RecipeCategory = recipe.category;

    return (
        <>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack sx={{ flexDirection: 'row', gap: 2 }}>
                    <Typography variant='h6' component='h2' fontWeight={500}>{recipe.name}</Typography>
                    <Chip
                        label={category.name}
                        color={category.color as ChipColors} />
                </Stack>

                <Stack sx={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                    <Stack direction='row' gap={1}>
                        {(recipe.calories !== 0 && recipe.shelfLife) &&
                            <>
                                {recipe.shelfLife &&
                                    <Typography variant='body2'>{recipe.shelfLife}</Typography>
                                }
                                {recipe.calories != 0 && recipe.shelfLife &&
                                    <Typography variant='body2'>/</Typography>
                                }
                                {recipe.calories !== 0 &&
                                    <Typography variant='body2'>{recipe.calories}kcal</Typography>
                                }
                            </>
                        }
                    </Stack>

                    <Stack direction='row'>
                        <RecipeEditButton recipeId={recipe.id} />
                        <RecipeDeleteButton recipeName={recipe.name} recipeId={recipe.id} />
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}