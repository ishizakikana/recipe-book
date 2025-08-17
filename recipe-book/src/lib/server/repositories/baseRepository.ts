import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";

// ID フィールドを持つモデル型
type ModelWithId = {
    id: number | string;
};

// Prisma のクエリ引数の基本型
type PrismaQueryArgs = {
    select?: Record<string, boolean>;
    include?: Record<string, boolean>;
    where?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
    skip?: number;
    take?: number;
};

/**
 * 汎用的なリポジトリを作成
 * 
 * @template T モデルの型（id フィールド必須）
 * @template CreateData 作成時のデータ型
 * @template UpdateData 更新時のデータ型
 * @param model PrismaClient のモデル名
 * @param revalidateTarget キャッシュ再検証対象のパス
 * @returns リポジトリ
 */
export function createRepository<
    T extends ModelWithId,
    CreateData = Omit<T, 'id'>,
    UpdateData = Partial<Omit<T, 'id'>>
>(
    model: keyof PrismaClient,
    revalidateTarget: string
) {
    // 型安全性を保つため、unknownを経由してキャスト
    const repo = prisma[model] as unknown as {
        findMany: (args?: PrismaQueryArgs) => Promise<T[]>;
        findUnique: (args: { where: { id: T['id'] } } & Omit<PrismaQueryArgs, 'where'>) => Promise<T | null>;
        create: (args: { data: CreateData }) => Promise<T>;
        update: (args: { where: { id: T['id'] }; data: UpdateData }) => Promise<T>;
        delete: (args: { where: { id: T['id'] } }) => Promise<T>;
        deleteMany: (args: { where: { id: { in: T['id'][] } } }) => Promise<{ count: number }>;
    };

    return {
        /**
         * 全レコードの取得
         * 
         * @param args クエリ引数 (select, include)
         * @returns 全レコード
         */
        findAll: async (args?: PrismaQueryArgs): Promise<T[]> => {
            return await repo.findMany(args);
        },

        /**
         * 条件に基づく全レコードの取得
         * 
         * @param conditions 条件
         * @param args クエリ引数 (select, include)
         * @returns 条件が一致する全レコード
         */
        findAllByConditions: async (
            conditions: Partial<T>,
            args?: Omit<PrismaQueryArgs, 'where'>
        ): Promise<T[]> => {
            return await repo.findMany({
                where: conditions,
                ...args
            });
        },

        /**
         * IDに基づくレコードの取得
         * 
         * @param id ID
         * @param args クエリ引数 (select, include)
         * @returns IDが一致するレコード
         */
        findById: async (
            id: T['id'],
            args?: Omit<PrismaQueryArgs, 'where'>
        ): Promise<T | null> => {
            return await repo.findUnique({
                where: { id },
                ...args
            });
        },

        /**
         * レコード新規作成
         * 
         * @param data 作成するデータ
         * @returns 作成されたレコード
         */
        create: async (data: CreateData): Promise<T> => {
            const result = await repo.create({ data });
            revalidatePath(revalidateTarget);
            return result;
        },

        /**
         * レコード更新
         * 
         * @param id 更新対象のID
         * @param data 更新するデータ
         * @returns 更新されたレコード
         */
        update: async (id: T['id'], data: UpdateData): Promise<T> => {
            const result = await repo.update({ where: { id }, data });
            revalidatePath(revalidateTarget);
            return result;
        },

        /**
         * 単一レコード削除
         * 
         * @param id 削除対象のID
         * @returns 削除されたレコード
         */
        delete: async (id: T['id']): Promise<T> => {
            const result = await repo.delete({ where: { id } });
            revalidatePath(revalidateTarget);
            return result;
        },

        /**
         * 複数レコード削除
         * 
         * @param ids 削除対象のIDリスト
         * @returns 削除結果（削除された件数）
         */
        deleteAll: async (ids: T['id'][]): Promise<{ count: number }> => {
            const result = await repo.deleteMany({ where: { id: { in: ids } } });
            revalidatePath(revalidateTarget);
            return result;
        }
    };
}