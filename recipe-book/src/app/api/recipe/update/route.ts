import { handleApi } from "@/lib/server/api";
import { recipeRepository } from "@/lib/server/repositories/recipeRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const body = await req.json();

        const { id, data } = body;
        const updatedRecipe = await recipeRepository.update(id, data);
        return NextResponse.json(updatedRecipe, { status: 200 });
    })
}