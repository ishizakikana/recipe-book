import RecipeEditCard from '@/components/features/contents/recipe/components/edit/RecipeEditCard';
import { apiGetServer } from '@/lib/fetchServer';
import { RecipeDetail } from '@/types/entity';
import { RecipeCategory } from '@prisma/client';

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
    const recipeCategories: RecipeCategory[] = await apiGetServer('/recipe-category/find?all=true');

    if (!recipe) {
        return null;
    }

    return (
        <RecipeEditCard recipe={recipe} recipeCategories={recipeCategories} />
    )
}