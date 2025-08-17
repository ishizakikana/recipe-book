import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { apiGetServer } from "@/lib/server/fetchServer";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
    cookies: jest.fn()
}));

const mockCookies = cookies as jest.Mock;

describe("apiGetServer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("成功時にJSONデータを返す", async () => {
        mockCookies.mockResolvedValue({
            toString: () => "token=abc123"
        });

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ data: "ok" })
        } as any);

        const result = await apiGetServer<{ data: string }>("/test");

        expect(result).toEqual({ data: "ok" });
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/test",
            expect.objectContaining({
                method: "GET",
                headers: expect.objectContaining({
                    "Cookie": "token=abc123"
                })
            })
        );
    });

    test("APIエラー時にエラーメッセージを投げる（JSONレスポンスあり）", async () => {
        mockCookies.mockResolvedValue({
            toString: () => ""
        });

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            url: "http://localhost:3000/api/test",
            json: jest.fn().mockResolvedValue({ message: "Not Found" })
        } as any);

        await expect(apiGetServer("/test")).rejects.toThrow(
            "http://localhost:3000/api/test Not Found"
        );
    });

    test("APIエラー時にJSONレスポンスが無い場合、statusTextを使う", async () => {
        mockCookies.mockResolvedValue({
            toString: () => ""
        });

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: "Internal Server Error",
            json: jest.fn().mockRejectedValue(new Error("Invalid JSON"))
        } as any);

        await expect(apiGetServer("/test")).rejects.toThrow(
            "Internal Server Error"
        );
    });

    test("APIエラー時にstatusTextも無い場合、デフォルトエラーメッセージを使う", async () => {
        mockCookies.mockResolvedValue({
            toString: () => ""
        });

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockRejectedValue(new Error("Invalid JSON"))
        } as any);

        await expect(apiGetServer("/test")).rejects.toThrow(
            ERROR_MESSAGES.SERVER_ERROR
        );
    });
});
