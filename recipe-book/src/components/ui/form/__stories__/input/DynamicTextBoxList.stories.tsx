import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from '@storybook/testing-library';
import DynamicTextBoxList from '../../input/DynamicTextBoxList';

const meta: Meta<typeof DynamicTextBoxList> = {
    title: 'UI/Form/Input/DynamicTextBoxList',
    component: DynamicTextBoxList,
    parameters: {
        docs: {
            source: {
                code: '<DynamicTextBoxList />'
            }
        }
    },
    argTypes: {
        labels: {
            control: 'object',
            description: 'ラベルの配列。2つのラベルを指定できます。',
            table: {
                category: 'base',
                type: { summary: '[string, string]' }
            },
            defaultValue: ['項目', '値'],
        }

    }
}

export default meta;
type Story = StoryObj<typeof DynamicTextBoxList>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 初期状態の2つのTextBoxを取得
        const textboxes = await canvas.findAllByRole('textbox');
        expect(textboxes).toHaveLength(2);

        // 1つ目に入力
        await userEvent.type(textboxes[0], 'りんご');
        expect(textboxes[0]).toHaveValue('りんご');

        // 2つ目に入力
        await userEvent.type(textboxes[1], '100');
        expect(textboxes[1]).toHaveValue('100');

        // 行を追加
        const addButton = await canvas.findByRole('button', { name: '行を追加' });
        await userEvent.click(addButton);

        const updatedTextboxes = await canvas.findAllByRole('textbox');
        expect(updatedTextboxes).toHaveLength(4);

        // 追加された行にも入力
        await userEvent.type(updatedTextboxes[2], 'バナナ');
        await userEvent.type(updatedTextboxes[3], '200');
        expect(updatedTextboxes[2]).toHaveValue('バナナ');
        expect(updatedTextboxes[3]).toHaveValue('200');

        // 2行目を削除（1行は残る）
        const deleteButtons = await canvas.findAllByRole('button', {
            name: '',
        }); // IconButtonにaria-labelがないのでname: ''で取得

        // 2つ目の削除ボタンをクリック（0-indexedで1が2行目）
        await userEvent.click(deleteButtons[1]);

        // テキストボックスは2つ（1行）に戻る
        const finalTextboxes = await canvas.findAllByRole('textbox');
        expect(finalTextboxes).toHaveLength(2);

        const deleteButtonsAfterDelete = await canvas.findAllByRole('button', {
            name: '',
        });
        userEvent.click(deleteButtonsAfterDelete[0]);

        const finalTextboxesAfterDelete = await canvas.findAllByRole('textbox');
        expect(finalTextboxesAfterDelete).toHaveLength(2);
    }
}