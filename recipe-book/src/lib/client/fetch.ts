import { ApiError } from "@/types/error";
import { ERROR_MESSAGES } from "../constants/messages";

const url = '/api';

/**
 * GETリクエスト
 * 
 * @template T レスポンスデータの型
 * @param endpoint エンドポイント
 * @returns 解析済みのレスポンスデータ
 * @throws 通信エラーまたはAPIエラー
 */
export async function apiGet<T>(
    endpoint: string
): Promise<T> {
    const res = await fetch(`${getBaseUrl()}${url}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    });

    return await handleResponse<T>(res);
}

/**
 * POSTリクエスト
 * 
 * @template T レスポンスデータの型
 * @param endpoint エンドポイント
 * @param body リクエストボディ
 * @returns 解析済みのレスポンスデータ
 * @throws 通信エラーまたはAPIエラー
 */
export async function apiPost<T>(
    endpoint: string,
    body: unknown
): Promise<T> {
    const res = await fetch(`${getBaseUrl()}${url}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': getBaseUrl(),
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(body)
    });

    return await handleResponse<T>(res);
}

function getBaseUrl(): string {

    // クライアント
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }

    // ローカル
    return 'http://localhost:3000';
}

//
// private
//

/**
 * エラーハンドリング
 * 
 * @template T レスポンスのデータ型
 * @param res レスポンス
 * @returns 解析後のレスポンスデータ
 * @throws APIからのエラーレスポンスまたは解析エラー
 */
async function handleResponse<T>(res: Response): Promise<T> {

    if (!res.ok) {
        let errorMsg: string = ERROR_MESSAGES.SERVER_ERROR;

        try {
            const error: ApiError = await res.json();
            errorMsg = res.url + ' ' + error.message || errorMsg;
        } catch {
            errorMsg = res.statusText || errorMsg;
        }

        throw new Error(errorMsg);
    }

    return res.json();
}