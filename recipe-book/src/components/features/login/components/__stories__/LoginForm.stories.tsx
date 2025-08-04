import { FormReturn } from '@/types/form';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { LoginFormInput } from '../../hooks/useLoginForm';
import LoginForm from '../LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'Features/Login/LoginForm',
    component: LoginForm,
    argTypes: {
        useLoginForm: {
            description: 'Storybook テスト用コールバック',
            table: {
                defaultValue: { summary: 'useLoginForm' },
                category: '_',
            }
        }
    }
}

const baseMock: FormReturn<LoginFormInput> = {
    register: () => ({}),
    onSubmit: () => Promise.resolve(),
    submitError: null,
    formErrors: {},
    loading: false
}

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<LoginForm />'
            }
        }
    },
}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング中'
            }
        }
    },
    args: {
        useLoginForm: () => ({ ...baseMock, loading: true })
    },
}

export const ValidationError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'バリデーションエラー'
            }
        }
    },
    args: {
        useLoginForm: (): FormReturn<LoginFormInput> => ({
            ...baseMock,
            formErrors: {
                userId: { type: 'required', message: '入力してください' },
                password: { type: 'required', message: '入力してください' }
            }
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const userIdError = canvas.getByLabelText('ユーザーID').closest('.MuiFormControl-root')?.querySelector('[id$="-helper-text"]');
        const passwordError = canvas.getByLabelText('パスワード').closest('.MuiFormControl-root')?.querySelector('[id$="-helper-text"]');

        expect(userIdError).toHaveTextContent('入力してください');
        expect(passwordError).toHaveTextContent('入力してください');
    }
}

export const SubmitError: Story = {
    parameters: {
        docs: {
            description: {
                story: '送信エラー'
            }
        }
    },
    args: {
        useLoginForm: (): FormReturn<LoginFormInput> => ({
            ...baseMock,
            submitError: '送信エラー',
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const submitError = await canvas.findByText('送信エラー');
        expect(submitError).toBeInTheDocument();
    }
};

export const MultipleErrors: Story = {
    parameters: {
        docs: {
            description: {
                story: '複合エラー'
            }
        }
    },
    args: {
        useLoginForm: (): FormReturn<LoginFormInput> => ({
            ...baseMock,
            submitError: '送信エラー',
            formErrors: {
                userId: { type: 'required', message: '入力してください' },
                password: { type: 'required', message: '入力してください' }
            }
        })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const userIdError = canvas.getByLabelText('ユーザーID').closest('.MuiFormControl-root')?.querySelector('[id$="-helper-text"]');
        const passwordError = canvas.getByLabelText('パスワード').closest('.MuiFormControl-root')?.querySelector('[id$="-helper-text"]');
        const submitError = await canvas.findByText('送信エラー');

        expect(userIdError).toHaveTextContent('入力してください');
        expect(passwordError).toHaveTextContent('入力してください');
        expect(submitError).toBeInTheDocument();
    }
};