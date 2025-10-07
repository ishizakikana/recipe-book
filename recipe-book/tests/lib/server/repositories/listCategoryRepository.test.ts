import * as baseRepo from '@/lib/server/repositories/baseRepository';
import { listCategoryRepository } from '@/lib/server/repositories/listCategoryRepository';
import { TextDecoder, TextEncoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;


describe('listCategoryRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createRepository が正しい引数で呼ばれること', () => {
        const spy = jest.spyOn(baseRepo, 'createRepository');
        // listCategoryRepository を再インポートし直すことで spy が反映される
        jest.isolateModules(() => {
            require('@/lib/repository/listCategoryRepository');
        });

        expect(spy).toHaveBeenCalledWith('listCategory', '/list');
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
