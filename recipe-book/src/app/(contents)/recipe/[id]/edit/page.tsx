import BackButton from '@/components/features/contents/recipe/components/edit/BackButton';
import RecipeEditCard from '@/components/features/contents/recipe/components/edit/RecipeEditCard';

/**
 * レシピ編集画面
 */
export default async function RecipeEditPage() {
    return (
        <>
            <RecipeEditCard />
            <BackButton />
        </>
    )
}