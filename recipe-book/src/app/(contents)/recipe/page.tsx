import RecipeCard from '@/components/features/contents/recipe/components/RecipeSummaryCard';
import SearchAccordion from '@/components/features/contents/recipe/components/search/SearchAccordion';
import { RecipeSearchInput } from '@/components/features/contents/recipe/type';
import { apiGetServer } from '@/lib/fetchServer';
import { RecipeSummary } from '@/types/entity';
import { Box, Grid } from '@mui/material';
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
  console.log(recipeCategories)
  const recipes: RecipeSummary[] = await apiGetServer(`/recipe/find?conditions=${encodeURIComponent(JSON.stringify(conditions))}`);
  console.log(recipes)

  return (
    <Box sx={{ height: '100%', width: '100%' }}>

      <SearchAccordion categories={recipeCategories} searchInput={searchInput} />

      <Grid container rowSpacing={3} columnSpacing={5}
        columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
        px={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        sx={{ py: 4 }}>

        {recipes.map(recipe =>
          <Grid key={recipe.id} size={1}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <RecipeCard recipe={recipe} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}