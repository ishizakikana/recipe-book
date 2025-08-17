import ListButton from '@/components/features/contents/list/components/buttons/button/ListButton';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ListButton> = {
    title: 'Features/List/Buttons/Button/ListButton',
    component: ListButton,
    argTypes: {
        children: {
            control: 'text',
            description: 'ボタンのテキスト',
            table: {
                category: 'props'
            }
        },
        icon: {
            control: false,
            description: 'ボタンのアイコン',
            table: {
                category: 'props'
            }
        },
        loading: {
            control: 'boolean',
            description: 'ローディング状態',
            table: {
                category: 'props'
            }
        },
        mobile: {
            control: 'boolean',
            description: 'モバイル表示かどうか',
            table: {
                category: 'props'
            }
        },
        onClick: {
            control: false,
            description: 'クリックイベント',
            table: {
                category: 'event'
            },
        }
    },
    args: {
        children: 'Button',
        icon: <AddIcon />,
    }
}

export default meta;
type Story = StoryObj<typeof ListButton>;

export const Desktop: Story = {
    parameters: {
        docs: {
            description: {
                story: 'デスクトップ'
            },
            source: {
                code: `
                <ListButton icon={<AddIcon />} onClick={onClick}>
                    Button
                </ListButton>`.trim()
            }
        }
    }
}

export const Mobile: Story = {
    parameters: {
        docs: {
            description: {
                story: 'モバイル'
            },
            source: {
                code: `
                <ListButton mobile icon={<AddIcon />} onClick={onClick}>
                    Button
                </ListButton>`.trim()
            }
        }
    },
    args: {
        mobile: true
    }
}

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: 'ローディング状態'
            },
            source: {
                code: `
                <ListButton loading icon={<AddIcon />} onClick={onClick}>
                    Button
                </ListButton>
                
                <ListButton mobile loading icon={<AddIcon />} onClick={onClick}>
                    Button
                </ListButton>`.trim()
            }
        }
    },
    args: {
        loading: true
    },
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <ListButton {...args} />
            <ListButton {...args} mobile />
        </Stack>
    )
}