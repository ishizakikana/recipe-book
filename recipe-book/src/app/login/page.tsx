import LoginForm from '@/components/features/login/components/LoginForm';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { getUserFromAuthToken } from '@/lib/server/token';
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
        <CenteredContainer>
            <LoginForm />
        </CenteredContainer>
    )
}