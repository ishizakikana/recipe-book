import LoginPage from '@/app/login/page';
import { getUserFromAuthToken } from '@/lib/server/token';
import { render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';

// モック
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
    redirect: jest.fn()
}))

jest.mock('@/lib/server/token', () => ({
    getUserFromAuthToken: jest.fn(() => Promise.resolve({ id: '1', name: 'test user' }))
}))

jest.mock('@/components/features/login/components/LoginForm', () => () => (
    <div>LoginForm</div>
))

jest.mock('@/components/layout/CenteredContainer', () => (props: any) => (
    <div data-testid="centered-container">{props.children}</div>
))

describe('loginPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('未ログインのとき、ログイン画面を表示する', async () => {
        (getUserFromAuthToken as jest.Mock).mockResolvedValueOnce(null);

        const result = await LoginPage();
        render(result);

        expect(screen.getByText('LoginForm')).toBeInTheDocument();
        expect(screen.getByTestId('centered-container')).toBeInTheDocument();
    })

    test('ログイン済みのとき、レシピ一覧画面へリダイレクトする', async () => {
        const result = await LoginPage();
        render(result);

        expect(getUserFromAuthToken).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith('/recipe');
    })
})