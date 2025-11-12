(global as any).TextEncoder = class {
    encode(input: string) {
        return Buffer.from(input, 'utf-8');
    }
}

// モック
const mockPayload = { id: '1' };
const mockSign = jest.fn().mockResolvedValue('token');
const mockSetExpirationTime = jest.fn().mockReturnThis();
const mockSetProtectedHeader = jest.fn().mockReturnThis();
const mockVerify = jest.fn().mockResolvedValue({ payload: mockPayload });

jest.mock('jose', () => {
    return {
        SignJWT: jest.fn().mockImplementation(function (this: any, payload: any) {
            this.setProtectedHeader = mockSetProtectedHeader;
            this.setExpirationTime = mockSetExpirationTime;
            this.sign = mockSign;
        }),
        jwtVerify: mockVerify,
    };
});

import { signToken, verifyToken } from '@/lib/server/auth';
import { jwtVerify, SignJWT } from 'jose';

describe('auth', () => {
    afterAll(() => {
        delete (global as any).TextEncoder;
    })

    describe('signToken', () => {
        test('トークンを発行する', async () => {
            const token = await signToken(mockPayload);

            expect(token).toBe('token');
            expect(SignJWT).toHaveBeenCalledWith(mockPayload);
            expect(mockSetProtectedHeader).toHaveBeenCalledWith({ alg: 'HS256' });
            expect(mockSetExpirationTime).toHaveBeenCalledWith('1d');
            expect(mockSign).toHaveBeenCalledWith(expect.any(Buffer));
        })
    })

    describe('verifyToken', () => {
        test('有効なトークンを検証する', async () => {
            const result = await verifyToken('token');

            expect(mockVerify).toHaveBeenCalledWith('token', expect.any(Buffer));
            expect(result).toEqual(mockPayload);
        })

        test('トークンが無効なとき、nullを返す', async () => {
            (jwtVerify as jest.Mock).mockResolvedValueOnce(null);

            const result = await verifyToken('token');

            expect(mockVerify).toHaveBeenCalledWith('token', expect.any(Buffer));
            expect(result).toBeNull();
        })
    })
})