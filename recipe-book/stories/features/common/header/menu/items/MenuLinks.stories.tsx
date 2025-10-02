import MenuLinks from '@/components/features/common/header/components/menu/items/MenuLinks';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import { action } from 'storybook/internal/actions';
import { expect, fn } from 'storybook/test';
import { mockPush } from '../../../../../__mocks__/router';

const mockOnClose = fn(async () => { action('onClose')() });

const meta: Meta<typeof MenuLinks> = {
    title: 'Features/Common/Header/Menu/Items/MenuLinks',
    component: MenuLinks,
    globals: {
        backgrounds: { value: 'dark' }
    },
    argTypes: {
        onClose: {
            control: false,
            description: 'メニュー非表示処理'
        }
    },
    args: {
        onClose: mockOnClose
    }
}

export default meta;
type Story = StoryObj<typeof MenuLinks>

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: '<MenuLinks />'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const recipeButton = await canvas.findByRole('button', { name: 'レシピ' });
        const calendarButton = await canvas.findByRole('button', { name: 'カレンダー' });
        const listButton = await canvas.findByRole('button', { name: '買い物リスト' });

        await userEvent.click(recipeButton);
        await userEvent.click(calendarButton);
        await userEvent.click(listButton);

        expect(mockPush).toHaveBeenCalledWith('/recipe');
        expect(mockPush).toHaveBeenCalledWith('/calendar');
        expect(mockPush).toHaveBeenCalledWith('/list');

        expect(mockOnClose).toHaveBeenCalledTimes(3);
    }
}