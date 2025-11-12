jest.mock('@/lib/server/db/prisma', () => ({
    prisma: {
        user: {
            findAll: jest.fn(),
            findById: jest.fn(),
            findAllByConditions: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            deleteAll: jest.fn()
        }
    }
}))

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn()
}))

describe('userRepository', () => {
    let userRepository: any;
    let createRepositorySpy: jest.SpyInstance;

    beforeAll(() => {
        jest.isolateModules(() => {
            const baseRepo = require('@/lib/server/repositories/baseRepository');

            createRepositorySpy = jest.spyOn(baseRepo, 'createRepository');
            userRepository = require('@/lib/server/repositories/userRepository').userRepository;
        });
    })

    test('createRepository が正しい引数で呼ばれること', () => {
        expect(createRepositorySpy).toHaveBeenCalledWith('user', '/user');
    });

    test('base の関数が展開されていること', () => {
        expect(typeof userRepository.findById).toBe('function');
    });

    test('無効化されたメソッドが undefined になっていること', () => {
        expect(userRepository.findAll).toBeUndefined();
        expect(userRepository.findAllByConditions).toBeUndefined();
        expect(userRepository.create).toBeUndefined();
        expect(userRepository.update).toBeUndefined();
        expect(userRepository.delete).toBeUndefined();
        expect(userRepository.deleteAll).toBeUndefined();
    });
});
