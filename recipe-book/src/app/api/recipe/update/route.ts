import { handleApi } from "@/lib/server/api";
import { recipeRepository } from "@/lib/server/repositories/recipeRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const body = await req.json();
        const { id, data } = body;

        console.log('data.steps', data.steps)

        const recipe = await recipeRepository.update(id, data.recipe);
        const ingredients = await recipeRepository.updateIngredients(id, data.ingredients);

        const result = {
            recipe,
            ingredients
        }

        console.log('input', data)

        console.log(ingredients);
        return NextResponse.json(result, { status: 200 });
    })
}