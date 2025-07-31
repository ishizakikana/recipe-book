import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from "@storybook/nextjs";
import ListButton from '../../../buttons/button/ListButton';

const meta: Meta<typeof ListButton> = {
    title: 'Features/List/Buttons/Button/ListButton',
    component: ListButton,
    argTypes: {
        text: {
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
        text: 'Button',
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
                <ListButton
                    text='Button',
                    icon={<AddIcon />}
                    loading={false}
                    mobile={false}
                    onClick={() => console.log('Button clicked')}
                    />`.trim()
            }
        }
    },
    args: {
        loading: false,
        mobile: false
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
                <ListButton
                    text='Button',
                    icon={<AddIcon />}
                    loading={false}
                    mobile={true}
                    onClick={() => console.log('Button clicked')}
                    />`.trim()
            }
        }
    },
    args: {
        loading: false,
        mobile: true
    }
}

export const Loading: Story = {
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <ListButton {...args} />
            <ListButton {...args} mobile={true} />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'ローディング状態'
            },
            source: {
                code: `
                <ListButton
                    text='Button',
                    icon={<AddIcon />}
                    loading={true}
                    mobile={false}
                    onClick={() => console.log('Button clicked')}
                    />`.trim()
            }
        }
    },
    args: {
        loading: true,
    }
}