import { ListCategory } from "@prisma/client";
import { createRepository } from "./baseRepository";

const base = createRepository<ListCategory>('listCategory', '/list');

export const listCategoryRepository = {
    ...base,

    findAllByConditions: undefined,
    findById: undefined,
    create: undefined,
    update: undefined,
    delete: undefined,
    deleteAll: undefined
}