import { apiGet, apiPost } from '@/lib/client/fetch';
import { ERROR_MESSAGES } from '@/lib/constants/messages';

// fetch をモック
global.fetch = jest.fn();

describe('fetch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('apiGet', () => {
        it('成功時にJSONを返す', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ data: 'ok' })
            } as unknown as Response);

            const result = await apiGet<{ data: string }>('/test');

            expect(result).toEqual({ data: 'ok' });
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost/api/test',
                expect.objectContaining({
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-store'
                })
            );
        });

        it('APIエラー時(JSONあり)にエラーメッセージを投げる', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                url: 'http://localhost/api/test',
                json: jest.fn().mockResolvedValue({ message: 'Not Found' })
            } as unknown as Response);

            await expect(apiGet('/test')).rejects.toThrow(
                'http://localhost/api/test Not Found'
            );
        });

        it('APIエラー時(JSONなし, statusTextあり)', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                statusText: 'Internal Server Error',
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
            } as unknown as Response);

            await expect(apiGet('/test')).rejects.toThrow(
                'Internal Server Error'
            );
        });

        it('APIエラー時(JSONなし, statusTextなし)', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
            } as unknown as Response);

            await expect(apiGet('/test')).rejects.toThrow(
                ERROR_MESSAGES.SERVER_ERROR
            );
        });
    });

    describe('apiPost', () => {
        it('成功時にJSONを返す', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ result: 'posted' })
            } as unknown as Response);

            const result = await apiPost<{ result: string }>('/submit', { name: 'John' });

            expect(result).toEqual({ result: 'posted' });
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost/api/submit',
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ name: 'John' })
                })
            );
        });
    });
});
