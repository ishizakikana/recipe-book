import { prisma } from "@/lib/server/db/prisma";
import { recipeRepository } from "@/lib/server/repositories/recipeRepository";
import { RecipeSummary } from "@/types/viewModel";

jest.mock('@lib/server/db/prisma', () => ({
    prisma: {
        recipe: {
            findMany: jest.fn(),
            findUnique: jest.fn()
        }
    }
}))

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn()
}))

describe('recipeRepository', () => {
    const mockedFindMany = prisma.recipe.findMany as jest.Mock;
    const mockedFindUnique = prisma.recipe.findUnique as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('findAllRecipeSummariesByConditions', () => {

        const data: RecipeSummary = {
            id: 1,
            name: 'test recipe',
            imageUrl: 'test_image',
            category: {
                id: 1,
                name: 'test category',
                icon: 'test icon',
                color: 'test color'
            },
            shelfLife: '1日',
            calories: 1,
            keywords: ['keyword1', 'keyword2'],
            visible: true
        };
        const imageUrl = 'https://res.cloudinary.com/drf6p5cyv/image/upload/test_image';

        test('すべてのレシピの概要を取得する', async () => {
            (prisma.recipe.findMany as jest.Mock).mockResolvedValueOnce([data]);

            const result = await recipeRepository.findAllRecipeSummariesByConditions({ categoryId: 1 });

            expect(result).toEqual([{ ...data, imageUrl }]);
            expect(mockedFindMany).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                select: expect.any(Object)
            });
        })

        test('画像URLがnullのとき、no_image.png を返す', async () => {
            (prisma.recipe.findMany as jest.Mock).mockResolvedValueOnce([{ ...data, imageUrl: null }]);

            const result = await recipeRepository.findAllRecipeSummariesByConditions({ categoryId: 1 });

            expect(result).toEqual([{ ...data, imageUrl: 'https://res.cloudinary.com/drf6p5cyv/image/upload/no_image.png' }]);
            expect(mockedFindMany).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                select: expect.any(Object)
            });
        })
    })

    describe('findRecipeDetailById', () => {

        const data: any = {
            id: 1,
            name: 'test recipe',
            imageUrl: 'test_image',
            category: {
                id: 1,
                name: 'test category',
                icon: 'test icon',
                color: 'test color'
            },
            shelfLife: '1日',
            calories: 1,
            ingredients: [
                { id: 1, name: 'ingredient1' },
                { id: 3, name: 'ingredient3' },
                { id: 4, name: 'ingredient4' },
                { id: 2, name: 'ingredient2' },
            ],
            steps: [
                {
                    id: 1, stepNumber: 1, text: 'step1', seasonings: [
                        { id: 1, name: 'seasoning1' },
                        { id: 3, name: 'seasoning3' },
                        { id: 4, name: 'seasoning4' },
                        { id: 2, name: 'seasoning2' },
                    ]
                },
                { id: 3, stepNumber: 3, text: 'step3', seasonings: [] },
                { id: 2, stepNumber: 2, text: 'step2', seasonings: null },
            ]
        };
        const imageUrl = 'https://res.cloudinary.com/drf6p5cyv/image/upload/test_image';
        const ingredients = [
            { id: 1, name: 'ingredient1' },
            { id: 2, name: 'ingredient2' },
            { id: 3, name: 'ingredient3' },
            { id: 4, name: 'ingredient4' },
        ]
        const steps = [
            {
                id: 1, stepNumber: 1, text: 'step1', seasonings: [
                    { id: 1, name: 'seasoning1' },
                    { id: 2, name: 'seasoning2' },
                    { id: 3, name: 'seasoning3' },
                    { id: 4, name: 'seasoning4' },
                ]
            },
            { id: 2, stepNumber: 2, text: 'step2', seasonings: undefined },
            { id: 3, stepNumber: 3, text: 'step3', seasonings: [] },
        ]

        test('レシピの詳細を取得する', async () => {
            (prisma.recipe.findUnique as jest.Mock).mockResolvedValueOnce(data);

            const result = await recipeRepository.findRecipeDetailById(1);

            expect(result).toEqual({ ...data, imageUrl, ingredients, steps });
            expect(mockedFindUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: expect.any(Object)
            });
        })

        test('IDが一致するレシピが存在しないとき、nullを返す', async () => {
            (prisma.recipe.findUnique as jest.Mock).mockResolvedValueOnce(null);

            const result = await recipeRepository.findRecipeDetailById(1);

            expect(result).toBeNull();
            expect(mockedFindUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: expect.any(Object)
            });
        })
    })

    describe('update', () => {
        test('レシピの更新に成功する', async () => {

        })
    })
})