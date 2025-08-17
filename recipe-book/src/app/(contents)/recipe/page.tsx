import RecipeListContainer from '@/components/features/contents/recipe/components/list/RecipeListContainer';
import { RecipeSearchInput } from '@/components/features/contents/recipe/type';
import { apiGetServer } from '@/lib/server/fetchServer';
import { RecipeSummary } from '@/types/entity';
import { Prisma, RecipeCategory } from '@prisma/client';

export default async function RecipeBookPage({
  searchParams
}: {
  searchParams: Promise<{ keyword?: string, categoryIds?: string }>
}) {

  const resolvedSearchParams = await searchParams;

  // パラメータ取得
  const keyword = resolvedSearchParams?.keyword ?? '';
  const categoryIds = resolvedSearchParams?.categoryIds?.split(',') ?? [];
  const searchInput: RecipeSearchInput = {
    keyword,
    categoryIds: categoryIds.map(id => Number(id))
  }

  const conditions: Prisma.RecipeWhereInput = {}
  if (keyword.trim()) {
    const keywords = keyword.split(/\s+/).filter(Boolean);
    const keywordConditions = keywords.flatMap(w => [
      { name: { contains: w } },
      { ingredients: { some: { name: { contains: w } } } }
    ]);
    conditions.OR = keywordConditions;
  }

  if (categoryIds.length > 0) {
    conditions.categoryId = { in: searchInput.categoryIds }
  }

  const recipeCategories: RecipeCategory[] = await apiGetServer('/recipe-category/find?all=true');
  const recipes: RecipeSummary[] = await apiGetServer(`/recipe/find?all=true`);

  return (
    <RecipeListContainer
      initialRecipes={recipes}
      recipeCategories={recipeCategories}
      searchInput={searchInput} />
  )
}