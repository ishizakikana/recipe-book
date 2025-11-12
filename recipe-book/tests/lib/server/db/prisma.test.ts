describe('prisma', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        originalEnv = { ...process.env };
        delete (global as any).prisma;
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    test('開発環境では PrismaClient が1回だけ生成され、globalに保持される', async () => {
        process.env = { ...originalEnv, NODE_ENV: 'development' };

        const mockConstructor = jest.fn().mockImplementation(() => ({
            $connect: jest.fn(),
            $disconnect: jest.fn(),
        }));

        jest.doMock('@prisma/client', () => ({
            PrismaClient: mockConstructor,
        }));

        let prisma1: any;
        let prisma2: any;

        await jest.isolateModulesAsync(async () => {
            const mod1 = await import('@/lib/server/db/prisma');
            prisma1 = mod1.prisma;
        });

        await jest.isolateModulesAsync(async () => {
            const mod2 = await import('@/lib/server/db/prisma');
            prisma2 = mod2.prisma;
        });

        expect(prisma1).toBe(prisma2); // 同一インスタンス
        expect(mockConstructor).toHaveBeenCalledTimes(1); // ←ここが通る
        expect((global as any).prisma).toBeDefined();
    });

    test('本番環境では毎回 PrismaClient が新規生成される', async () => {
        process.env = { ...originalEnv, NODE_ENV: 'production' };

        const mockConstructor = jest.fn().mockImplementation(() => ({
            $connect: jest.fn(),
            $disconnect: jest.fn(),
        }));

        jest.doMock('@prisma/client', () => ({
            PrismaClient: mockConstructor,
        }));

        let prisma1: any;
        let prisma2: any;

        await jest.isolateModulesAsync(async () => {
            const mod1 = await import('@/lib/server/db/prisma');
            prisma1 = mod1.prisma;
        });

        await jest.isolateModulesAsync(async () => {
            const mod2 = await import('@/lib/server/db/prisma');
            prisma2 = mod2.prisma;
        });

        expect(prisma1).not.toBe(prisma2);
        expect(mockConstructor).toHaveBeenCalledTimes(2);
        expect((global as any).prisma).toBeUndefined();
    });
});
