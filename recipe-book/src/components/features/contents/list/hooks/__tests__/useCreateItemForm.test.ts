import { ERROR_MESSAGES } from "@/lib/constants/messages"
import { ListCategory } from "@prisma/client"
import { act, renderHook } from "@testing-library/react"
import { CreateItemFormInput } from "../../types"
import { useCreateItemForm } from "../useCreateItemForm"

const mockReset = jest.fn();
jest.mock('react-hook-form', () => {
    const actual = jest.requireActual('react-hook-form');
    return {
        ...actual,
        useForm: () => ({
            register: jest.fn(),
            handleSubmit: (fn: any) => fn,
            reset: mockReset,
            formState: { errors: {} }
        })
    }
})

describe('useCreateItemForm', () => {
    const mockCategories: ListCategory[] = [
        { id: 1, name: 'A', icon: '', color: '' },
        { id: 2, name: 'B', icon: '', color: '' },
    ]

    const validInput: CreateItemFormInput = {
        name: 'test item',
        volume: '100g',
        categoryId: 1,
    }

    describe('categories', () => {
        test('初期値が正しく設定される', () => {
            const { result } = renderHook(() => useCreateItemForm(mockCategories, jest.fn()));

            expect(result.current.categories).toEqual([
                { label: 'A', value: '1' },
                { label: 'B', value: '2' },
            ]);
        })
    })

    describe('onCreate', () => {
        test('成功時は入力値とエラーメッセージをクリアし、true を返す', async () => {
            const mockCreate = jest.fn();
            const { result } = renderHook(() => useCreateItemForm(mockCategories, mockCreate));

            let success;
            await act(async () => {
                success = result.current.onCreate(validInput);
            })

            expect(success).toBe(true);
            expect(mockCreate).toHaveBeenCalledWith(validInput);
            expect(mockReset).toHaveBeenCalledTimes(1);
            expect(result.current.submitError).toBeNull();
        })

        test('失敗時はエラーメッセージを設定し、false を返す', async () => {
            const mockCreate = jest.fn(() => { throw new Error('Creation failed') });
            const { result } = renderHook(() => useCreateItemForm(mockCategories, mockCreate));

            let success;
            await act(async () => {
                success = result.current.onCreate(validInput);
            })

            expect(success).toBe(false);
            expect(result.current.submitError).toBe('Creation failed');
        })

        test('予期しない型のエラーがスローされたとき、unknown エラーメッセージを設定する', async () => {
            const mockCreate = jest.fn(() => { throw 'Unexpected error' });
            const { result } = renderHook(() => useCreateItemForm(mockCategories, mockCreate));

            let success;
            await act(async () => {
                success = result.current.onCreate(validInput);
            })

            expect(success).toBe(false);
            expect(result.current.submitError).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
        })
    })
})