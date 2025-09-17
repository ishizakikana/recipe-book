import { useCreateItemForm } from '@/components/features/contents/list/hooks/useCreateItemForm';
import { ListContext } from '@/components/features/contents/list/hooks/useListContext';
import { ListContextType } from '@/components/features/contents/list/types/context';
import { ItemFormInput } from '@/components/features/contents/list/types/itemFormInput';
import { ERROR_MESSAGES } from '@/lib/constants/messages';
import { ListCategory } from '@prisma/client';
import { act, renderHook } from '@testing-library/react';

const mockReset = jest.fn();
const mockCreate = jest.fn();

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

jest.mock('@/components/features/contents/list/hooks/useItemList', () => {
    return {
        useItemList: () => ({
            create: mockCreate,
        })
    }
})

describe('useCreateItemForm', () => {

    const mockCategories: ListCategory[] = [
        { id: 1, name: 'A', icon: '', color: '' },
        { id: 2, name: 'B', icon: '', color: '' },
    ]

    const validInput: ItemFormInput = {
        name: 'test item',
        volume: '100g',
        categoryId: 1,
    }

    const renderUseCreateItemForm = () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => {
            const contextValue: ListContextType = {
                listCategories: mockCategories,
                categorizedItems: [],
                listItems: [],
                setListItems: jest.fn(),
                error: null,
                setError: jest.fn(),
            };

            return (
                <ListContext.Provider value={contextValue}>
                    {children}
                </ListContext.Provider>
            )
        }
        return renderHook(() => useCreateItemForm(), { wrapper });
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('categories', () => {
        test('初期値が正しく設定される', () => {
            const { result } = renderUseCreateItemForm();

            expect(result.current.categories).toEqual([
                { label: 'A', value: '1' },
                { label: 'B', value: '2' },
            ])
        })
    })

    describe('onCreate', () => {
        test('成功時は入力値とエラーメッセージをクリアし、true を返す', async () => {
            mockCreate.mockResolvedValueOnce({ id: 1, name: 'test item', volume: '100g', categoryId: 1, isDone: false });

            const { result } = renderUseCreateItemForm();

            let success;
            await act(async () => {
                success = await result.current.onCreate(validInput);
            })

            expect(success).toBe(true);
            expect(mockCreate).toHaveBeenCalledWith(validInput);
            expect(mockReset).toHaveBeenCalledTimes(1);
            expect(result.current.submitError).toBeNull();
        })

        test('失敗時はエラーメッセージを設定し、false を返す', async () => {
            mockCreate.mockImplementationOnce(() => { throw new Error('Creation failed') });
            const { result } = renderUseCreateItemForm();
            let success;
            await act(async () => {
                success = await result.current.onCreate(validInput);
            })

            expect(success).toBe(false);
            expect(result.current.submitError).toBe('Creation failed');
        })

        test('予期しない型のエラーがスローされたとき、unknown エラーメッセージを設定する', async () => {
            mockCreate.mockImplementationOnce(() => { throw '予期せぬエラーが発生しました。' });
            const { result } = renderUseCreateItemForm();
            let success;
            await act(async () => {
                success = await result.current.onCreate(validInput);
            })

            expect(success).toBe(false);
            expect(result.current.submitError).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
        })
    })
})