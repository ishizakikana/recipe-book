import Button from '@/components/ui/button/Button';
import { User } from '@prisma/client';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import MenuDrawer from '../../../../../header/components/menu/drawer/MenuDrawer';

const mockUser: User = {
    id: '1',
    name: 'test user',
    password: 'password'
}

const meta: Meta<typeof MenuDrawer> = {
    title: 'Features/Common/Header/Menu/Drawer/MenuDrawer',
    component: MenuDrawer,
    argTypes: {
        user: {
            description: 'ユーザー情報',
            table: {
                category: 'data'
            }
        },
        drawerOpen: {
            control: false,
            description: 'ドロワーの開閉状態',
            table: {
                category: 'status'
            }
        },
        onClose: {
            description: '非表示時イベント',
            table: {
                category: 'event'
            }
        }
    },
    args: {
        user: mockUser
    }
}

export default meta;
type Story = StoryObj<typeof MenuDrawer>;

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>open</Button>
                <MenuDrawer
                    {...args}
                    drawerOpen={open}
                    onClose={() => setOpen(false)} />
            </>
        )
    },
    parameters: {
        docs: {
            source: {
                code: `
                import { useDrawer } from '../../hooks/useDrawer';
                
                const { drawerOpen, toggleDrawer } = useDrawer();

                return (
                    <NavDrawer
                        user={user}
                        drawerOpen={drawerOpen}
                        onClose={toggleDrawer} />
                )`.trim()
            }
        }
    }
}