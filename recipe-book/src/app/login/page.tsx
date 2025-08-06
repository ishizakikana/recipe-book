import LoginForm from '@/components/features/login/components/LoginForm';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { getUserFromAuthToken } from '@/lib/token';
import { redirect } from 'next/navigation';

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