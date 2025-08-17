import { ERROR_MESSAGES, formatMessage } from "@/lib/constants/messages";

describe('messages', () => {

    describe('formatMessage', () => {
        test('メッセージをフォーマットして返す', () => {
            const key = ERROR_MESSAGES.CREATE_FAILED;
            const msg = 'testの作成に失敗しました。';

            expect(formatMessage(key, 'test')).toBe(msg);
        })
    })
})