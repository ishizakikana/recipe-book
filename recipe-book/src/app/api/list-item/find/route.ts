import { getRequestParams, handleApi } from '@/lib/server/api';
import { listItemRepository } from '@/lib/server/repositories/listItemRepository';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return handleApi(req, async () => {
        await getRequestParams(req, { requiredParams: ['all'] })

        const items = await listItemRepository.findAll();
        return NextResponse.json(items, { status: 200 })
    })
}