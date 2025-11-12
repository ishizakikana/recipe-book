import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { useState } from "react";
import { useRecipes } from "../recipes/useRecipes";

/**
 * レシピ削除フォームカスタムフック
 * 
 * @param recipeId レシピID
 * @returns 
 * 　loading (削除中フラグ)
 */
export function useRecipeDeleteForm() {
    const { delete: deleteRecipe } = useRecipes();

    // ローディング管理
    const [loading, setLoading] = useState(false);
    // エラー管理
    const [error, setError] = useState<string | null>(null);

    // レシピ削除
    const onDelete = async (recipeId: number) => {
        try {
            setLoading(true);
            await deleteRecipe(recipeId);   // レシピ削除
            return true;
        } catch (e) {
            const msg = e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            setError(msg);
            return false;
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