import { getRequestParams, handleApi } from "@/lib/server/api";
import { recipeRepository } from "@/lib/server/repositories/recipeRepository";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return handleApi(req, async () => {
        const { json } = await getRequestParams(req, { requiredParams: ['id'] });
        const { id } = json as { id: number };

        await recipeRepository.delete(id);

        return new Response(null, { status: 204 });
    })
}