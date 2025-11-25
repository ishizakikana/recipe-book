import LoginForm from '@/components/features/login/components/LoginForm';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { getUserFromAuthToken } from '@/lib/server/token';
import { Typography } from '@mui/material';
import { redirect } from 'next/navigation';

/**
 * ログイン画面
 */
export default async function LoginPage() {
    const user = await getUserFromAuthToken();

    // すでにログイン済みのとき
    if (user) {
        redirect('/recipe');
    }

    return (
        <CenteredContainer direction='column' gap={2}>
            <Typography variant='h5' color='primary.dark'>RECIPE BOOK</Typography>
            <LoginForm />
        </CenteredContainer>
    )
}