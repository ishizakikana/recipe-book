import { buildSearchQuery } from "@/components/features/contents/recipe/list/utils/searchQuery";

describe('searchQuery', () => {

    test('キーワードのみを含むクエリ文字列を生成する', () => {
        const searchInput = {
            keyword: 'test',
            categoryIds: []
        };
        const query = buildSearchQuery(searchInput);
        expect(query).toBe('/recipe?keyword=test');
    })

    test('カテゴリーIDのみを含むクエリ文字列を生成する', () => {
        const searchInput = {
            keyword: '',
            categoryIds: [1, 2]
        };
        const query = buildSearchQuery(searchInput);
        expect(query).toBe('/recipe?categoryIds=1%2C2');
    })

    test('キーワードとカテゴリーIDを含むクエリ文字列を生成する', () => {
        const searchInput = {
            keyword: 'test',
            categoryIds: [1, 2]
        };
        const query = buildSearchQuery(searchInput);
        expect(query).toBe('/recipe?keyword=test&categoryIds=1%2C2');
    })
})