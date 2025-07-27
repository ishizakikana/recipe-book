import RecipeContainer from '@/components/features/contents/recipe/components/detail/container/card/RecipeDetailCard';
import { apiGetServer } from '@/lib/fetchServer';
import { RecipeDetail } from '@/types/entity';

export default async function RecipePage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const recipe: RecipeDetail = await apiGetServer(`/recipe/find?id=${id}`);

    if (!recipe) {
        return null;
    }

    return (
        <RecipeContainer recipe={recipe} />
    )
}