import MobileListButtons from '@/components/features/contents/list/components/buttons/MobileListButtons';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';

const meta: Meta<typeof MobileListButtons> = {
    title: 'Features/List/Buttons/MobileListButtons',
    component: MobileListButtons,
    parameters: {
        docs: {
            source: {
                code: '<MobileListButtons />'
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
type Story = StoryObj<typeof MobileListButtons>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const menuButton = await canvas.findByRole('button', { name: 'メニューを開く' });

        await userEvent.click(menuButton);

        const menuItem = await screen.findByRole('menuitem', { name: '項目を追加' });
        expect(menuItem).toBeInTheDocument();

        const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
        if (backdrop) {
            await userEvent.click(backdrop);
        } else {
            throw new Error('Backdrop not found');
        }

        await waitFor(() => {
            expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
        })
    }
}