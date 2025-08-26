import { handleApi } from "@/lib/server/api";
import { toRecipeDetail } from '@/lib/server/converter/recipeConverter';
import { recipeRepository } from "@/lib/server/repositories/recipeRepository";
import { RecipeDetailResponse, RecipeUpdateResponse } from '@/types/entity';
import { StepSummary } from '@/types/viewModel';
import { RecipeIngredient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const body = await req.json();
        const { id, data } = body;

        const recipe: RecipeUpdateResponse = await recipeRepository.updateRecipe(id, data.recipe);
        const ingredients: RecipeIngredient[] = await recipeRepository.updateIngredients(id, data.ingredients);
        const steps: StepSummary[] = await recipeRepository.updateSteps(id, data.steps);

        const result: RecipeDetailResponse = {
            ...recipe,
            ingredients,
            steps: steps
        }

        return NextResponse.json(toRecipeDetail(result), { status: 200 });
    })
}