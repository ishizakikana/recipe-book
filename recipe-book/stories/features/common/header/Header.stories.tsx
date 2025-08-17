import Header from '@/components/features/common/header/components/Header';
import { User } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';

const mockUser: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

const meta: Meta<typeof Header> = {
    title: 'Features/Common/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<Header user={user} />'
            }
        }
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
type Story = StoryObj<typeof Header>

export const Default: Story = {}