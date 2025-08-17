import { RecipeCategory } from "@prisma/client";
import { createRepository } from "./baseRepository";

const base = createRepository<RecipeCategory>('recipeCategory', '/recipe');

export const recipeCategoryRepository = {
    ...base,

    findAllByConditions: undefined,
    findById: undefined,
    create: undefined,
    update: undefined,
    delete: undefined,
    deleteAll: undefined
}