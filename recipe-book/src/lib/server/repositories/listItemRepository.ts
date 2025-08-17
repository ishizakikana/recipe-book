import { ListItem } from "@prisma/client";
import { createRepository } from "./baseRepository";

const base = createRepository<ListItem>('listItem', '/list');

export const listItemRepository = {
    ...base,

    findAllByConditions: undefined,
    findById: undefined,
}