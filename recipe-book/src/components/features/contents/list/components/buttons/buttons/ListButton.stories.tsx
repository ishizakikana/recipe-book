import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Meta, StoryObj } from "@storybook/nextjs";
import ListButton from './ListButton';

const meta: Meta<typeof ListButton> = {
    title: 'Features/List/Buttons/ListButton',
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
            description: 'クリックイベントハンドラー',
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
    args: {
        loading: false,
        mobile: false
    },
    parameters: {
        docs: {
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
    }
}

export const Mobile: Story = {
    args: {
        loading: false,
        mobile: true
    },
    parameters: {
        docs: {
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
    }
}

export const Loading: Story = {
    render: (args) => (
        <Stack direction='row' spacing={2}>
            <ListButton {...args} />
            <ListButton {...args} mobile={true} />
        </Stack>
    ),
    args: {
        loading: true,
    },
    parameters: {
        docs: {
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
    }
}