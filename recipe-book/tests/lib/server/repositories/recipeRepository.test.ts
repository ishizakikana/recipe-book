import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import { toRecipeDetail, toRecipeRequest, toRecipeSummary } from '@/lib/server/converter/recipeConverter';
import { prisma } from '@/lib/server/db/prisma';

// モック
jest.mock('@/lib/server/db/prisma', () => ({
    prisma: {
        recipe: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
        recipeIngredient: {
            deleteMany: jest.fn(),
            create: jest.fn(),
        },
        recipeStep: {
            create: jest.fn(),
            update: jest.fn(),
        },
        recipeSeasoning: {
            deleteMany: jest.fn(),
            create: jest.fn(),
        },
    },
}));

jest.mock('@/lib/server/converter/recipeConverter', () => ({
    toRecipeSummary: jest.fn(),
    toRecipeDetail: jest.fn(),
    toRecipeRequest: jest.fn(),
}));

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn()
}))

describe('recipeRepository', () => {
    const mockRecipe = { id: 1, title: 'Test Recipe' } as any;
    const mockSummary = { id: 1, name: 'Summary' } as any;
    const mockDetail = { id: 1, name: 'Detail' } as any;

    let recipeRepository: any;
    let createRepositorySpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.isolateModules(() => {
            const baseRepo = require('@/lib/server/repositories/baseRepository');

            createRepositorySpy = jest.spyOn(baseRepo, 'createRepository');
            recipeRepository = require('@/lib/server/repositories/recipeRepository').recipeRepository;
        });
    });

    describe('findAllRecipeSummariesByConditions', () => {
        test('createRepository が正しい引数で呼ばれること', () => {
            expect(createRepositorySpy).toHaveBeenCalledWith('recipe', '/recipe');
        });

        test('base の関数が展開されていること', () => {
            expect(typeof recipeRepository.update).toBe('function');
            expect(typeof recipeRepository.delete).toBe('function');
        });

        test('無効化されたメソッドが undefined になっていること', () => {
            expect(recipeRepository.findAll).toBeUndefined();
            expect(recipeRepository.findAllByConditions).toBeUndefined();
            expect(recipeRepository.findById).toBeUndefined();
            expect(recipeRepository.deleteAll).toBeUndefined();
        });

        test('条件指定なしで全件取得できる', async () => {
            (prisma.recipe.findMany as jest.Mock).mockResolvedValue([mockRecipe]);
            (toRecipeSummary as jest.Mock).mockReturnValue(mockSummary);

            const result = await recipeRepository.findAllRecipeSummariesByConditions();

            expect(prisma.recipe.findMany).toHaveBeenCalledWith({
                where: undefined,
                include: { category: true, ingredients: true },
            });
            expect(toRecipeSummary).toHaveBeenCalledWith(mockRecipe, true);
            expect(result).toEqual([mockSummary]);
        });

        test('条件指定ありで取得できる', async () => {
            (prisma.recipe.findMany as jest.Mock).mockResolvedValue([mockRecipe]);
            (toRecipeSummary as jest.Mock).mockReturnValue(mockSummary);

            const result = await recipeRepository.findAllRecipeSummariesByConditions({ id: 1 });

            expect(prisma.recipe.findMany).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { category: true, ingredients: true },
            });
            expect(result).toEqual([mockSummary]);
        });
    });

    describe('findRecipeDetailById', () => {
        test('存在するレシピを返す', async () => {
            (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(mockRecipe);
            (toRecipeDetail as jest.Mock).mockReturnValue(mockDetail);

            const result = await recipeRepository.findRecipeDetailById(1);

            expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    category: true,
                    ingredients: true,
                    steps: { include: { seasonings: true } },
                },
            });
            expect(toRecipeDetail).toHaveBeenCalledWith(mockRecipe);
            expect(result).toEqual(mockDetail);
        });

        test('存在しない場合 null を返す', async () => {
            (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await recipeRepository.findRecipeDetailById(999);

            expect(result).toBeNull();
        });
    });

    describe('create', () => {
        const mockForm = { id: 1 } as RecipeFormInput;
        const mockRequest = {
            recipe: { title: 'inserted' },
            ingredients: [{ id: 1 }],
            steps: [
                { id: 1, stepNumber: 1, text: 'mix', seasonings: [{ name: 'salt', volume: '1g' }] },
                { id: 0, stepNumber: 2, text: 'bake', seasonings: undefined },
            ],
        };

        beforeEach(() => {
            (toRecipeRequest as jest.Mock).mockReturnValue(mockRequest);
            (toRecipeDetail as jest.Mock).mockReturnValue(mockDetail);
            (prisma.recipe.create as jest.Mock).mockResolvedValue({ id: 1, title: 'inserted', category: {} });
            (prisma.recipeIngredient.create as jest.Mock).mockResolvedValue({ id: 1 });
            (prisma.recipeStep.create as jest.Mock).mockResolvedValue({ id: 2, recipeId: 1 });
            (prisma.recipeSeasoning.create as jest.Mock).mockResolvedValue({ id: '00010100' });
        });

        test('レシピを登録できる', async () => {
            const result = await recipeRepository.create(mockForm);

            expect(toRecipeRequest).toHaveBeenCalledWith(mockForm);
            expect(prisma.recipeIngredient.create).toHaveBeenCalledTimes(1);
            expect(prisma.recipeStep.create).toHaveBeenCalledTimes(2);
            expect(prisma.recipeSeasoning.create).toHaveBeenCalledTimes(1);
            expect(toRecipeDetail).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockDetail);
        })

        test('seasonings がない場合でもエラーにならない', async () => {
            const noSeasoningSteps = [{ id: 0, stepNumber: 1, text: 'test' }];
            (toRecipeRequest as jest.Mock).mockReturnValue({
                ...mockRequest,
                steps: noSeasoningSteps,
            });

            await recipeRepository.update(mockForm);

            expect(prisma.recipeStep.create).toHaveBeenCalled();
            expect(prisma.recipeSeasoning.create).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        const mockForm = { id: 1 } as RecipeFormInput;
        const mockRequest = {
            id: 1,
            recipe: { title: 'updated' },
            ingredients: [{ id: 1 }],
            steps: [
                { id: 1, stepNumber: 1, text: 'mix', seasonings: [{ name: 'salt', volume: '1g' }] },
                { id: 0, stepNumber: 2, text: 'bake', seasonings: undefined },
            ],
        };

        beforeEach(() => {
            (toRecipeRequest as jest.Mock).mockReturnValue(mockRequest);
            (toRecipeDetail as jest.Mock).mockReturnValue(mockDetail);
            (prisma.recipe.update as jest.Mock).mockResolvedValue({ id: 1, title: 'updated', category: {} });
            (prisma.recipeIngredient.create as jest.Mock).mockResolvedValue({ id: 1 });
            (prisma.recipeStep.update as jest.Mock).mockResolvedValue({ id: 1, recipeId: 1 });
            (prisma.recipeStep.create as jest.Mock).mockResolvedValue({ id: 2, recipeId: 1 });
            (prisma.recipeSeasoning.create as jest.Mock).mockResolvedValue({ id: '00010100' });
        });

        test('既存手順と新規手順の両方を更新できる', async () => {
            const result = await recipeRepository.update(mockForm);

            expect(prisma.recipe.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: mockRequest.recipe,
                include: { category: true },
            });

            expect(prisma.recipeIngredient.deleteMany).toHaveBeenCalledWith({ where: { recipeId: 1 } });
            expect(prisma.recipeIngredient.create).toHaveBeenCalledTimes(1);

            expect(prisma.recipeStep.update).toHaveBeenCalled();
            expect(prisma.recipeStep.create).toHaveBeenCalled();
            expect(prisma.recipeSeasoning.deleteMany).toHaveBeenCalledWith({ where: { stepId: 1 } });
            expect(prisma.recipeSeasoning.create).toHaveBeenCalledWith({
                data: {
                    id: '00010100',
                    stepId: 1,
                    name: 'salt',
                    volume: '1g',
                },
            });

            expect(toRecipeDetail).toHaveBeenCalled();
            expect(result).toEqual(mockDetail);
        });

        test('seasonings がない場合でもエラーにならない', async () => {
            const noSeasoningSteps = [{ id: 0, stepNumber: 1, text: 'test' }];
            (toRecipeRequest as jest.Mock).mockReturnValue({
                ...mockRequest,
                steps: noSeasoningSteps,
            });

            await recipeRepository.update(mockForm);

            expect(prisma.recipeStep.create).toHaveBeenCalled();
            expect(prisma.recipeSeasoning.create).not.toHaveBeenCalled();
        });
    });
});