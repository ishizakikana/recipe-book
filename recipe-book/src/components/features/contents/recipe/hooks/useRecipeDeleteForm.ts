import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecipes } from "./recipes/useRecipes";

export default function useRecipeDeleteForm(
    recipeId: number
) {
    const router = useRouter();

    const { delete: deleteRecipe } = useRecipes();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDelete = async () => {
        try {
            setLoading(true);
            await deleteRecipe(recipeId);
            router.push('/recipe');
        } catch (e) {
            console.error(e);
            setError('削除に失敗しました。');
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        onDelete
    }
}