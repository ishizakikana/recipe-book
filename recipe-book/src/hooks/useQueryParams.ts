import { useSearchParams } from 'next/navigation';

/**
 * クエリパラメータ取得カスタムフック
 * 
 * @template T クエリパラメータの型
 * @returns
 *  getParams: クエリパラメータをオブジェクトで取得する関数 
 */
export function useQueryParams<T extends Record<string, string>>() {
    const searchParams = useSearchParams();

    const getParams = (): Partial<Record<keyof T, string>> => {
        const params: Partial<Record<keyof T, string>> = {};

        searchParams?.forEach((value, key) => {
            if (value) {
                params[key as keyof T] = value;
            }
        })

        return params;
    }

    return { getParams }
}