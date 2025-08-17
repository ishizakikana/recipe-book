import { ApiError } from "next/dist/server/api-utils";
import { ERROR_MESSAGES, formatMessage } from "../constants/messages";

type HandlerFn = () => Promise<Response>;

/**
 * API共通エラーハンドラー
 * 
 * 非同期のAPIハンドラ関数をラップし、実行時に発生した例外をキャッチして共通のエラーレスポンスを返却します。
 * @param handler 実行する非同期APIハンドラ関数
 * @returns 正常時はハンドラのレスポンス、エラー時は500エラーレスポンス
 */
export async function handleApi(req: Request, handler: HandlerFn): Promise<Response> {
    try {
        const res = await handler();
        return setResponseHeader(res, req);

    } catch (e: unknown) {

        console.error("APIエラー", e);

        const error = e instanceof ApiError
            ? e
            : new ApiError(500, e instanceof Error ? e.message : ERROR_MESSAGES.SERVER_ERROR);

        return new Response(
            JSON.stringify({ message: error.message }),
            { status: error.statusCode }
        );
    }
}

/**
 * パラメータ取得
 * 
 * @param req リクエスト
 * @param options オプション
 * @returns 
 */
export async function getRequestParams<T extends Record<string, unknown>>(
    req: Request,
    options?: {
        requiredParams?: string[]
        requiredAnyParams?: string[]
    }
): Promise<{
    searchParams: URLSearchParams
    json: T | null
}> {

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const isGet = req.method === 'GET';

    let json: T | null = null;
    if (!isGet) {
        try {
            json = await req.json();
        } catch (e) {
            console.error(e)
            throw new Error(ERROR_MESSAGES.INVALID_JSON);
        }
    }

    // 必須パラメータのチェック
    if (options?.requiredParams) {
        options.requiredParams.forEach(p => {

            if (isGet) {
                if (!searchParams.get(p)) {
                    throw new Error(formatMessage(ERROR_MESSAGES.REQUIRED_PARAM, p));
                }
            } else {
                if (json && !(p in json)) {
                    throw new Error(formatMessage(ERROR_MESSAGES.REQUIRED_PARAM, p));
                }
            }
        })
    }

    // いずれか必須パラメータのチェック
    if (options?.requiredAnyParams) {
        const found = options.requiredAnyParams.some(p => {
            if (isGet) {
                return searchParams.get(p);
            } else {
                return json && json[p] !== undefined;
            }
        });

        if (!found) {
            const params = options.requiredAnyParams.join(', ')
            throw new Error(formatMessage(ERROR_MESSAGES.REQUIRED_ANY_PARAMS, params));
        }
    }

    return { searchParams, json };
}

//
// private
//

function setResponseHeader(res: Response, req: Request) {

    const origin = req.headers.get('origin');
    const allowedOrigins = [
        'https://recipe-book-git-develop-ishizakikanas-projects.vercel.app',
        'http://localhost:3000'
    ];

    if (origin && allowedOrigins.includes(origin)) {
        res.headers.set('Access-Control-Allow-Origin', origin);
    }

    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Cache-Control', 'public, max - age=0, s - maxage=60, state -while-revalite= 30');

    return res;
}