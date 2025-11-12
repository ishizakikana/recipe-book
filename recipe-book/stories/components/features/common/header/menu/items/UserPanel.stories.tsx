import UserPanel from '@/components/features/common/header/components/menu/items/UserPanel';
import { User } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';
import { expect, within } from 'storybook/test';

const mockUser: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

const meta: Meta<typeof UserPanel> = {
    title: 'Components/Features/Common/Header/Menu/Items/UserPanel',
    component: UserPanel,
    globals: {
        backgrounds: { value: 'dark' }
    },
    argTypes: {
        user: {
            description: 'ユーザー情報',
            table: {
                category: 'data'
            }
        }
    },
    args: {
        user: mockUser
    }
}

export default meta;
type Story = StoryObj<typeof UserPanel>

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<UserPanel user={user} />'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(await canvas.findByText(mockUser.name)).toBeInTheDocument();
        expect(await canvas.findByRole('button', { name: 'ログアウト' })).toBeInTheDocument();
    }
}