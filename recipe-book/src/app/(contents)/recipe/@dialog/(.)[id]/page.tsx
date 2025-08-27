import RecipeDetailDialog from '@/components/features/contents/recipe/components/detail/RecipeDetailDialog';
import { apiGetServer } from '@/lib/server/fetchServer';
import { RecipeDetail } from '@/types/viewModel';

/**
 * レシピ詳細ダイアログ
 */
export default async function RecipeDialogPage({
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
        <RecipeDetailDialog initialValue={recipe} />
    )
}