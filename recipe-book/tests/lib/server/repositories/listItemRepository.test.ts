jest.mock('@/lib/server/db/prisma', () => ({
    prisma: {
        listItem: {
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

describe('listItemRepository', () => {
    let listItemRepository: any;
    let createRepositorySpy: jest.SpyInstance;

    beforeAll(() => {
        jest.isolateModules(() => {
            const baseRepo = require('@/lib/server/repositories/baseRepository');

            createRepositorySpy = jest.spyOn(baseRepo, 'createRepository');
            listItemRepository = require('@/lib/server/repositories/listItemRepository').listItemRepository;
        });
    })

    test('createRepository が正しい引数で呼ばれること', () => {
        expect(createRepositorySpy).toHaveBeenCalledWith('listItem', '/list');
    });

    test('base の関数が展開されていること', () => {
        expect(typeof listItemRepository.findAll).toBe('function');
        expect(typeof listItemRepository.create).toBe('function');
        expect(typeof listItemRepository.update).toBe('function');
        expect(typeof listItemRepository.delete).toBe('function');
        expect(typeof listItemRepository.deleteAll).toBe('function');
    });

    test('無効化されたメソッドが undefined になっていること', () => {
        expect(listItemRepository.findAllByConditions).toBeUndefined();
        expect(listItemRepository.findById).toBeUndefined();
    });
});
