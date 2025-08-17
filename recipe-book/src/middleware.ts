import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/server/auth';
import { COOKIE_KEYS } from './lib/server/cookie';

/**
 * ミドルウェア
 * 
 * 認証状態に応じてページ遷移を制御
 *  - ログイン済みユーザーが /login にアクセスしたとき、/recipe へリダイレクト
 *  - 未ログインユーザーがコンテンツページにアクセスしたとき、/login へリダイレクト
 * 
 * @param req リクエスト
 * @returns 
 */
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // cookieからトークンを取得し、検証
    const token = req.cookies.get(COOKIE_KEYS.AUTH_TOKEN)?.value;
    const payload = token ? await verifyToken(token) : null;
    const isLoggedIn = !!payload && typeof payload == 'object' && 'userId' in payload;

    // ログイン済み状態でログインページへ移動したとき、レシピ一覧画面へ自動遷移
    if (pathname === '/login' && isLoggedIn) {
        return NextResponse.redirect(new URL('/recipe', req.url));
    }

    // 未ログイン状態でコンテンツページへ移動したとき、ログイン画面へ自動遷移
    if (pathname !== '/login' && pathname !== '/' && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

/**
 * 除外ファイル
 * 
 * /api 以下
 * Next.js の静的アセット(_next)
 * favicon.ico
 * .well-known
 */
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)',
    ]
};


// Edge Runtime(軽量だが、機能が一部制限されたJSの実行環境)で実行される