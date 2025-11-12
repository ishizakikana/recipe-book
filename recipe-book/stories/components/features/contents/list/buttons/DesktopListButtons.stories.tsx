import DesktopListButtons from '@/components/features/contents/list/components/buttons/DesktopListButtons';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof DesktopListButtons> = {
    title: 'Components/Features/List/Buttons/DesktopListButtons',
    component: DesktopListButtons,
    parameters: {
        docs: {
            source: {
                code: `<DesktopListButtons />
                    `.trim()
            }
        }
    },
    decorators: [
        (Story) => (
            <ListContextProvider listCategories={[]} initialListItems={[]}>
                <Story />
            </ListContextProvider>
        )
    ],
}

export default meta;
type Story = StoryObj<typeof DesktopListButtons>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 各ボタンの表示確認
        const addButton = canvas.getByRole('button', { name: '項目を追加' });
        expect(addButton).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: 'すべて未完了' })).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: 'すべて完了済み' })).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: 'すべての完了済みを削除' })).toBeInTheDocument();

        await userEvent.click(addButton);
        const closeButton = screen.getByRole('button', { name: 'キャンセル' });
        await userEvent.click(closeButton);
    }
}