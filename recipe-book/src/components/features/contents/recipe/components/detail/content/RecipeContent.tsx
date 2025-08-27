import { RecipeDetail } from '@/types/viewModel';
import { Stack } from '@mui/material';
import IngredientList from './item/IngredientList';
import RecipeImage from './item/RecipeImage';
import StepList from './item/StepList';

/**
 * レシピコンテンツ
 */
export default function RecipeContent({
    recipe
}: {
    recipe: RecipeDetail
}) {

    return (
        <Stack sx={{ gap: 3, my: 3, mx: 2 }}>
            <Stack direction='row' sx={{ gap: 2 }}>
                <RecipeImage imageUrl={recipe.imageUrl} recipeName={recipe.name} />
                <IngredientList ingredients={recipe.ingredients} />
            </Stack>

            <StepList steps={recipe.steps} />
        </Stack>
    )
}