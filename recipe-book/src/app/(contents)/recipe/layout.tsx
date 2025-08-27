import RecipeContextProvider from '@/components/features/contents/recipe/providers/RecipeContextProvider';
import { apiGetServer } from '@/lib/server/fetchServer';
import { RecipeSummary } from '@/types/viewModel';
import { RecipeCategory } from '@prisma/client';

/**
 * レシピ画面レイアウト
 */
export default async function RecipeLayout({
    children,
    dialog
}: {
    children: React.ReactNode;
    dialog: React.ReactNode;
}) {

    const recipeCategories: RecipeCategory[] = await apiGetServer('/recipe-category/find?all=true');
    const recipes: RecipeSummary[] = await apiGetServer(`/recipe/find?all=true`);

    return (
        <RecipeContextProvider recipeCategories={recipeCategories} initialRecipes={recipes}>
            {children}
            {dialog}
        </RecipeContextProvider>
    );
}