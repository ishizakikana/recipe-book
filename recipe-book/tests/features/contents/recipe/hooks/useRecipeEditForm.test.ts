
// モック
const mockReset = jest.fn();

jest.mock('react-hook-form', () => {
    const actual = jest.requireActual('react-hook-form');
    return {
        ...actual,
        useForm: () => ({
            register: jest.fn(),
            reset: mockReset,
            control: {},
            handleSubmit: (fn: any) => fn,
            formState: { errors: {} }
        })
    }
})