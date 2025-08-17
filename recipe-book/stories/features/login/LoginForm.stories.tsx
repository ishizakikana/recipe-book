import LoginForm from '@/components/features/login/components/LoginForm';
import { LoginFormInput } from '@/components/features/login/hooks/useLoginForm';
import { FormReturn } from '@/types/form';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';

const mockLoginForm: FormReturn<LoginFormInput> = {
    register: () => ({}),
    onSubmit: () => Promise.resolve(),
    submitError: null,
    formErrors: undefined,
    loading: false
}

const meta: Meta<typeof LoginForm> = {
    title: 'Features/Login/LoginForm',
    component: LoginForm,
    parameters: {
        docs: {
            source: {
                code: '<LoginForm />'
            }
        }
    },
    argTypes: {
        useLoginForm: {
            description: 'Storybookテスト用',
            table: {
                defaultValue: { summary: 'useLoginForm' },
                category: '_',
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング中'
            }
        }
    },
    args: {
        useLoginForm: () => ({ ...mockLoginForm, loading: true })
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
            ...mockLoginForm,
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
            ...mockLoginForm,
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
            ...mockLoginForm,
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