import { getRequestParams, handleApi } from '@/lib/api';
import { recipeCategoryRepository } from '@/lib/repositories/recipeCategoryRepository';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return handleApi(req, async () => {
        await getRequestParams(req, { requiredParams: ['all'] });

        const categories = await recipeCategoryRepository.findAll();
        return NextResponse.json(categories, { status: 200 })
    })
}