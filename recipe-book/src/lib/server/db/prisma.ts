import { PrismaClient } from "@prisma/client";

// PrismaClient のグローバルキャッシュ（開発環境用）
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query']      // 実行されるクエリをログ出力
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
