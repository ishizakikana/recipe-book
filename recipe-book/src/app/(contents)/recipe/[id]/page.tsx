import RecipeDetailCard from '@/components/features/contents/recipe/components/detail/RecipeDetailCard';
import { apiGetServer } from '@/lib/server/fetchServer';
import { RecipeDetail } from '@/types/viewModel';

/**
 * レシピ詳細画面
 */
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
        <RecipeDetailCard initialValue={recipe} />
    )
}