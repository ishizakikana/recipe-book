jest.mock('@/lib/server/db/prisma', () => ({
    prisma: {
        recipeCategory: {
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

describe('recipeCategoryRepository', () => {
    let recipeCategoryRepository: any;
    let createRepositorySpy: jest.SpyInstance;

    beforeAll(() => {
        jest.isolateModules(() => {
            const baseRepo = require('@/lib/server/repositories/baseRepository');

            createRepositorySpy = jest.spyOn(baseRepo, 'createRepository');
            recipeCategoryRepository = require('@/lib/server/repositories/recipeCategoryRepository').recipeCategoryRepository;
        });
    })

    test('createRepository が正しい引数で呼ばれること', () => {
        expect(createRepositorySpy).toHaveBeenCalledWith('recipeCategory', '/recipe');
    });

    test('base の関数が展開されていること', () => {
        expect(typeof recipeCategoryRepository.findAll).toBe('function');
    });

    test('無効化されたメソッドが undefined になっていること', () => {
        expect(recipeCategoryRepository.findAllByConditions).toBeUndefined();
        expect(recipeCategoryRepository.findById).toBeUndefined();
        expect(recipeCategoryRepository.create).toBeUndefined();
        expect(recipeCategoryRepository.update).toBeUndefined();
        expect(recipeCategoryRepository.delete).toBeUndefined();
        expect(recipeCategoryRepository.deleteAll).toBeUndefined();
    });
});
