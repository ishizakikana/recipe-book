import { serialize } from 'cookie';
import { cookies } from 'next/headers';

/**
 * 認証用Cookie
 */
export const COOKIE_KEYS = {
    AUTH_TOKEN: 'auth_token'
} as const;

/**
 * Cookieデータ設定
 * 
 * @param res レスポンス
 * @param key Cookie名
 * @param value Cookieにセットする値
 * @returns Cookieがセットされたレスポンス
 */
export function setCookie(res: Response, key: string, value: string) {
    res.headers.append(
        'Set-Cookie',
        serialize(key, value, {
            httpOnly: true,     // JSでアクセスできない
            secure: true,
            maxAge: 60 * 60 * 24,       // 有効期限 1日
            sameSite: 'none',
            path: '/',      // /にCookieを設定
        })
    );

    return res;
}

/**
 * Cookieデータ取得
 * 
 * @param key Cookie名
 * @returns Cookieの値
 */
export async function getCookie(key: string): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value ?? null;
}

/**
 * Cookieデータ削除
 * 
 * @param key Cookie名
 * @returns Cookieを削除したレスポンス
 */
export async function deleteCookie(res: Response, key: string) {
    res.headers.append(
        'Set-Cookie',
        serialize(key, '', {
            httpOnly: true,     // JSでアクセスできない
            secure: process.env.NODE_ENV === 'production',       // HTTP通信環境時のみCookieを送信
            expires: new Date(0),       // 有効期限を0日にすることで削除
            path: '/',      // /に設定されたCookieを削除
        })
    );

    return res;
}
