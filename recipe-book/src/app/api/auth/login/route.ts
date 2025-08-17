import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { handleApi } from '@/lib/server/api';
import { signToken } from '@/lib/server/auth';
import { COOKIE_KEYS, setCookie } from '@/lib/server/cookie';
import { userRepository } from '@/lib/server/repositories/userRepository';
import { NextResponse } from 'next/server';

/**
 * ログイン (/api/auth/login)
 * 
 * ユーザー認証を行い、トークンをCookieに保存します。
 * 
 * { userId: ユーザーID, password: パスワード }
 * 
 * @param req リクエスト 
 * @returns レスポンス
 */
export async function POST(req: Request) {
    return handleApi(req, async () => {
        const { userId, password } = await req.json();
        const user = await userRepository.findById(userId);

        // パスワードが一致しないとき、401エラー
        if (!user || user.password !== password) {
            return NextResponse.json(
                { message: ERROR_MESSAGES.AUTH_FAILED },
                { status: 401 }
            );
        }

        // 成功したとき、JWTトークン発行しCookieに保存
        const token = await signToken({ userId: user.id });
        console.log('/login', token)
        const res = NextResponse.json({}, { status: 200 });
        return setCookie(res, COOKIE_KEYS.AUTH_TOKEN, token);
    });
}
