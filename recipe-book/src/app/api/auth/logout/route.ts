import { handleApi } from '@/lib/api';
import { COOKIE_KEYS, deleteCookie } from '@/lib/cookie';
import { NextResponse } from 'next/server';

/**
 * ログアウト (/api/auth/logout)
 * 
 * Cookieからユーザーデータを削除します。
 * 
 * @returns レスポンス
 */
export async function GET(req: Request) {
    return handleApi(req, async () => {

        // Cookieデータ削除
        const res = NextResponse.json({}, { status: 200 });
        return deleteCookie(res, COOKIE_KEYS.AUTH_TOKEN);
    });
}