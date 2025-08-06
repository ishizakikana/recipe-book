'use client'
import Button from '@/components/ui/button/Button';
import Alert from '@/components/ui/feedback/Alert';
import PasswordBox from '@/components/ui/form/input/PasswordBox';
import TextBox from '@/components/ui/form/input/TextBox';
import { FormReturn } from '@/types/form';
import { Stack } from '@mui/material';
import { useLoginForm as defaultUseLoginForm, LoginFormInput } from '../hooks/useLoginForm';

/**
 * ログインフォーム
 */
export default function LoginForm({
    useLoginForm = defaultUseLoginForm
}: {
    useLoginForm?: () => FormReturn<LoginFormInput>
}) {
    const { register, onSubmit, submitError, formErrors, loading } = useLoginForm();

    return (
        <form onSubmit={onSubmit}>
            <Stack>

                {/* エラーメッセージ */}
                <Alert severity='error' visible={!!submitError}>{submitError}</Alert>

                {/* フィールド */}
                <Stack justifyContent='center' gap={1}>
                    <TextBox
                        label='ユーザーID'
                        width='100%'
                        {...register('userId')}
                        error={!!formErrors?.userId}
                        helperText={formErrors?.userId?.message}
                        data-testid='user-id-input' />
                    <PasswordBox
                        label='パスワード'
                        width='100%'
                        {...register('password')}
                        error={!!formErrors?.password}
                        helperText={formErrors?.password?.message} />

                    <Button
                        type='submit'
                        loading={loading}
                        pt={1}>
                        ログイン
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
}