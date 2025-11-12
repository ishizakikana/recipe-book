import { ApiError } from "@/types/error";
import { cookies } from "next/headers";
import { ERROR_MESSAGES } from "../constants/messages";

const url = '/api';

export async function apiGetServer<T>(
    endpoint: string
): Promise<T> {
    const cookieStore = cookies();
    const cookie = (await cookieStore).toString();

    const res = await fetch(`${getBaseUrl()}${url}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': getBaseUrl(),
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Cookie': cookie
        },
        cache: 'no-store'
    });

    return await handleResponse<T>(res);
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
            // TODO　エラーメッセージがキモイ　修正する
            const error: ApiError = await res.json();
            errorMsg = res.url + ' ' + error.message;
        } catch {
            errorMsg = res.statusText || errorMsg;
        }

        throw new Error(errorMsg);
    }

    return res.json();
}

function getBaseUrl(): string {
    // サーバー
    if (process.env.VERCEL_URL) {
        return `https://recipe-book-git-develop-ishizakikanas-projects.vercel.app`;
    }

    // ローカル
    return 'http://localhost:3000';
}