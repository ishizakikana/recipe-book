import { getRequestParams, handleApi } from '@/lib/server/api';
import { listCategoryRepository } from '@/lib/server/repositories/listCategoryRepository';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return handleApi(req, async () => {
        await getRequestParams(req, { requiredParams: ['all'] })

        const categories = await listCategoryRepository.findAll();
        return NextResponse.json(categories, { status: 200 })
    })
}