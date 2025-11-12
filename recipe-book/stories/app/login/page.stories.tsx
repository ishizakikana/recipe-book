import LoginPage from '@/app/login/page';
import LoginForm from '@/components/features/login/components/LoginForm';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { Meta, StoryObj } from '@storybook/nextjs';

function LoginPageMock() {
    return (
        <CenteredContainer>
            <LoginForm />
        </CenteredContainer>
    )
}

const meta: Meta<typeof LoginPage> = {
    title: 'App/Login/LoginPage',
    component: LoginPageMock
}

export default meta;
type Story = StoryObj<typeof LoginPage>

export const Default: Story = {}