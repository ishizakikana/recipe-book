import { RecipeSummary } from "@/types/entity";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RecipeSearchInput } from "../type";
import { buildSearchQuery } from "../utils/searchQuery";

export function useRecipeListState(
    initialRecipes: RecipeSummary[]
) {
    const router = useRouter();

    // レシピリスト管理
    const [recipes, setRecipes] = useState<RecipeSummary[]>(initialRecipes);

    const search = (searchInput: RecipeSearchInput) => {
        setRecipes(prev =>
            prev.map(r => {
                let visible = true;

                if (searchInput.categoryIds.length !== 0) {
                    if (!searchInput.categoryIds.includes(r.category.id)) {
                        visible = false;
                    }
                }

                if (searchInput.keyword !== '') {
                    if (!r.name.includes(searchInput.keyword)) {
                        visible = false;
                    }
                }

                return { ...r, visible };
            })
        );

        // URLパラメータ更新
        const query = buildSearchQuery(searchInput);
        router.push(query);
    }

    const modify = (recipe: RecipeSummary) => {
        setRecipes(prev => prev.map(r => r.id === recipe.id ? recipe : r));
    }

    return {
        recipes,
        search,
        modify
    }
}