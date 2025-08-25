import RecipeEditCard from '@/components/features/contents/recipe/components/edit/RecipeEditCard';
import { apiGetServer } from '@/lib/server/fetchServer';
import { RecipeDetail } from '@/types/entity';

export const dynamic = 'force-dynamic';

/**
 * レシピ編集画面
 */
export default async function RecipeEditPage({
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
        <RecipeEditCard initialValue={recipe} />
    )
}