import { User } from "@prisma/client";
import { createRepository } from "./baseRepository";

const base = createRepository<User>('user', '/user');

export const userRepository = {
    ...base,
    findAll: undefined,
    findAllByConditions: undefined,
    create: undefined,
    update: undefined,
    delete: undefined,
    deleteAll: undefined
};