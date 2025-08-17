import { prisma } from "@/lib/server/db/prisma";
import { createRepository } from "@/lib/server/repositories/baseRepository";
import { User } from "@prisma/client";

jest.mock('@/lib/server/db/prisma', () => ({
    prisma: {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn()
        }
    }
}))

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn()
}))

const data: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

describe('baseRepository', () => {
    const repo = createRepository<User>('user', '/test');

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('findAll', () => {
        test('全レコードを取得する', async () => {
            (prisma.user.findMany as jest.Mock).mockResolvedValueOnce([data]);

            const result = await repo.findAll();

            expect(result).toEqual([data]);
            expect(prisma.user.findMany).toHaveBeenCalledWith(undefined);
        })
    })

    describe('findAllByConditions', () => {
        test('条件に一致するレコードを取得する', async () => {
            (prisma.user.findMany as jest.Mock).mockResolvedValueOnce([data]);

            const result = await repo.findAllByConditions({ id: '1' });

            expect(result).toEqual([data]);
            expect(prisma.user.findMany).toHaveBeenCalledWith({ where: { id: '1' } });
        })
    })

    describe('findById', () => {
        test('IDを下にレコードを取得する', () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(data);

            const result = repo.findById('1');

            expect(result).resolves.toEqual(data);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
        })
    })

    describe('create', () => {
        test('レコードを新規作成する', async () => {
            (prisma.user.create as jest.Mock).mockResolvedValueOnce(data);

            const result = await repo.create(data);

            expect(result).toEqual(data);
            expect(prisma.user.create).toHaveBeenCalledWith({ data });
        })
    })

    describe('update', () => {
        test('レコードを更新する', async () => {
            (prisma.user.update as jest.Mock).mockResolvedValueOnce(data);

            const result = await repo.update('1', data);

            expect(result).toEqual(data);
            expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: '1' }, data });
        })
    })

    describe('delete', () => {
        test('レコードを削除する', async () => {
            (prisma.user.delete as jest.Mock).mockResolvedValueOnce(data);

            const result = await repo.delete('1');

            expect(result).toEqual(data);
            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
        })
    })

    describe('deleteAll', () => {
        test('複数レコードを削除する', async () => {
            (prisma.user.deleteMany as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const result = await repo.deleteAll(['1', '2']);

            expect(result).toEqual({ count: 1 });
            expect(prisma.user.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ['1', '2'] } } });
        })
    })
})