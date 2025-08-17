import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { getRequestParams, handleApi } from "@/lib/server/api";
import { ApiError } from "next/dist/server/api-utils";
import 'whatwg-fetch';

describe('api', () => {

    describe('handleApi', () => {
        const mockReq = new Request('http://localhost:3000/api');
        mockReq.headers.set('origin', 'http://localhost:3000');

        test('正常なレスポンスを返却する', async () => {
            const handler = jest.fn().mockResolvedValueOnce(
                new Response(JSON.stringify({ message: 'test' }), { status: 200 }));

            const result = await handleApi(mockReq, handler);
            const resultBody = await result.json();

            expect(result.status).toBe(200);
            expect(resultBody).toEqual({ message: 'test' });
        })

        test('APIエラーが発生したとき、そのエラーを返却する', async () => {
            const handler = jest.fn().mockRejectedValueOnce(new ApiError(400, 'test'));

            const result = await handleApi(mockReq, handler);

            expect(result.status).toBe(400);
            expect(await result.json()).toEqual({ message: 'test' });
        })

        test('エラーが発生したとき、500エラーを返却する', async () => {
            const handler = jest.fn().mockRejectedValueOnce(new Error('test'));

            const result = await handleApi(mockReq, handler);

            expect(result.status).toBe(500);
            expect(await result.json()).toEqual({ message: 'test' });
        })

        test('予期しない型のエラーが発生したとき、500エラーを返却する', async () => {
            const handler = jest.fn().mockRejectedValueOnce('test');

            const result = await handleApi(mockReq, handler);

            expect(result.status).toBe(500);
            expect(await result.json()).toEqual({ message: ERROR_MESSAGES.SERVER_ERROR });
        })
    })

    describe('getRequestParam', () => {
        test('GETパラメータを取得する', async () => {
            const req = new Request('http://localhost:3000/api?key=value', { method: 'GET' });

            const result = await getRequestParams(req);

            expect(result.searchParams.get('key')).toBe('value');
            expect(result.json).toBe(null);
        })

        test('POSTパラメータを取得する', async () => {
            const req = new Request('http://localhost:3000/api', {
                method: 'POST', body: JSON.stringify({ key: 'value' })
            });

            const result = await getRequestParams(req);

            expect(result.json).toEqual({ key: 'value' });
        })

        test('必須GETパラメータを取得する', async () => {
            const req = new Request('http://localhost:3000/api?key=value', { method: 'GET' });

            const result = await getRequestParams(req, { requiredParams: ['key'] });

            expect(result.searchParams.get('key')).toBe('value');
            expect(result.json).toBe(null);
        })

        test('少なくとも1つ必須GETパラメータを取得する', async () => {
            const req = new Request('http://localhost:3000/api?key1=value', { method: 'GET' });

            const result = await getRequestParams(req, { requiredAnyParams: ['key1', 'key2'] });

            expect(result.searchParams.get('key1')).toBe('value');
            expect(result.json).toBe(null);
        })

        test('必須POSTパラメータを取得する', async () => {
            const req = new Request('http://localhost:3000/api', {
                method: 'POST', body: JSON.stringify({ key: 'value' })
            });

            const result = await getRequestParams(req, { requiredParams: ['key'] });

            expect(result.json).toEqual({ key: 'value' });
        })

        test('少なくとも1つ必須POSTパラメータを取得する', async () => {
            const req = new Request('http://localhost:3000/api', {
                method: 'POST', body: JSON.stringify({ key1: 'value' })
            });

            const result = await getRequestParams(req, { requiredAnyParams: ['key1', 'key2'] });

            expect(result.json).toEqual({ key1: 'value' });
        })

        test('必須GETパラメータがかけているとき、エラーを返却する', async () => {
            const req = new Request('http://localhost:3000/api', { method: 'GET' });

            await expect(getRequestParams(req, { requiredParams: ['key'] }))
                .rejects.toThrow('keyパラメータが不足しています。');
        })

        test('必須POSTパラメータがかけているとき、エラーを返却する', async () => {
            const req = new Request('http://localhost:3000/api', {
                method: 'POST', body: JSON.stringify({})
            });

            await expect(getRequestParams(req, { requiredParams: ['key'] }))
                .rejects.toThrow('keyパラメータが不足しています。');
        })

        test('少なくとも1つは必須のGETパラメータのいずれも存在しないとき、エラーを返却する', async () => {
            const req = new Request('http://localhost:3000/api?key3=value', { method: 'GET' });

            await expect(getRequestParams(req, { requiredAnyParams: ['key1', 'key2'] }))
                .rejects.toThrow('key1, key2パラメータのいずれかが必要です。');
        })

        test('POSTボディが不正のとき、エラーを返却する', async () => {
            const req = new Request('http://localhost:3000/api', {
                method: 'POST', body: 'test'
            });

            await expect(getRequestParams(req, { requiredParams: ['key'] }))
                .rejects.toThrow('POSTボディが不正です。JSON形式に変換できません。');
        })
    })
})