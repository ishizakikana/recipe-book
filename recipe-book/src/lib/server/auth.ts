import { JWTPayload, jwtVerify, SignJWT } from 'jose';

/**
 * 秘密鍵
 */
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret');

/**
 * トークン有効期限 1日
 */
const tokenExpiration = '1d';

/**
 * トークン発行
 * 
 * @param payload トークンに含めるデータ
 * @returns トークン文字列
 */
export async function signToken(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(tokenExpiration)
        .sign(SECRET);
}

/**
 * トークン検証
 * 
 * トークンを検証し、有効なときトークン内に含まれたデータを取得し返却します。
 * 
 * @param token クライアントから送信されたトークン
 * @returns トークン内のデータ
 */
export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch (e) {
        console.error('JWT検証失敗: ', e);
        return null;
    }
}

//TODO ログアウト処理（Cookie削除）

//TODO トークンの更新（リフレッシュ）

//TODO bcryptによるパスワードハッシュ化対応
