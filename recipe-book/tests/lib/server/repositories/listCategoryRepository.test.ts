jest.mock('@/lib/server/db/prisma', () => ({
    prisma: {
        listCategory: {
            findAll: jest.fn(),
            findAllByConditions: jest.fn(),
            findById: jest.fn(),
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

describe('listCategoryRepository', () => {
    let listCategoryRepository: any;
    let createRepositorySpy: jest.SpyInstance;

    beforeAll(() => {
        jest.isolateModules(() => {
            const baseRepo = require('@/lib/server/repositories/baseRepository');

            createRepositorySpy = jest.spyOn(baseRepo, 'createRepository');
            listCategoryRepository = require('@/lib/server/repositories/listCategoryRepository').listCategoryRepository;
        });
    })

    test('createRepository が正しい引数で呼ばれること', () => {
        expect(createRepositorySpy).toHaveBeenCalledWith('listCategory', '/list');
    });

    test('base の関数が展開されていること', () => {
        expect(typeof listCategoryRepository.findAll).toBe('function');
    });

    test('無効化されたメソッドが undefined になっていること', () => {
        expect(listCategoryRepository.findAllByConditions).toBeUndefined();
        expect(listCategoryRepository.findById).toBeUndefined();
        expect(listCategoryRepository.create).toBeUndefined();
        expect(listCategoryRepository.update).toBeUndefined();
        expect(listCategoryRepository.delete).toBeUndefined();
        expect(listCategoryRepository.deleteAll).toBeUndefined();
    });
});
