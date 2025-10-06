import StepsTextBoxList from '@/components/features/contents/recipe/components/edit/form/steps/StepsTextBoxList';
import { Box } from '@mui/material';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, waitFor } from '@storybook/testing-library';
import { within } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

const mockSteps = [
    { text: '鍋に水を入れて沸騰させる', seasonings: '塩少々' },
    { text: '材料を切る', seasonings: '' },
]

const Wrapper = ({
    children,
    defaultValues,
}: {
    children: React.ReactNode;
    defaultValues?: any;
}) => {
    const methods = useForm({ defaultValues: defaultValues });

    return (
        <FormProvider {...methods}>
            <Box sx={{ px: 4, py: 5 }}>{children}</Box>
        </FormProvider>
    );
};

const meta: Meta<typeof StepsTextBoxList> = {
    title: 'Features/Recipe/Edit/Form/Steps/StepsTextBoxList',
    component: StepsTextBoxList,
    render: () => (
        <Wrapper defaultValues={{ steps: mockSteps }}>
            <StepsTextBoxList />
        </Wrapper>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: '<StepsTextBoxList control={control} />'
            }
        }
    },
    argTypes: {
        control: {
            control: false,
            description: 'react-hook-formのコントロール情報',
            table: {
                category: 'props',
                type: { summary: 'Control' }
            }
        },
    }
}

export default meta;
type Story = StoryObj<typeof StepsTextBoxList>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const step1Text = canvas.getByRole('textbox', { name: '手順1' });
        const step1Seasonings = canvas.getByRole('textbox', { name: '調味料1' });
        const step2Text = canvas.getByRole('textbox', { name: '手順2' });

        // 表示確認
        expect(canvas.getAllByRole('textbox').length).toBe(3);
        expect(step1Text).toHaveValue(mockSteps[0].text);
        expect(step1Seasonings).toHaveValue(mockSteps[0].seasonings);
        expect(step2Text).toHaveValue(mockSteps[1].text);

        // アコーディオン非表示
        const accordion = canvas.getAllByRole('button', { name: '調味料' })[0];
        await userEvent.click(accordion);
        await waitFor(() => {
            expect(step1Seasonings).not.toBeVisible();
            expect(canvas.getAllByRole('textbox').length).toBe(2);
        })

        // アコーディオン再展開
        await userEvent.click(accordion);
        expect(step1Seasonings).toBeInTheDocument();
        expect(canvas.getAllByRole('textbox').length).toBe(3);

        // 追加ボタンクリック
        const addButton = canvas.getByRole('button', { name: '手順を追加' });
        await userEvent.click(addButton);
        expect(canvas.getAllByRole('textbox').length).toBe(4);

        // 削除ボタンクリック
        const deleteButton = canvas.getByRole('button', { name: '手順3を削除' });
        await userEvent.click(deleteButton);
        waitFor(() =>
            expect(canvas.getAllByRole('textbox').length).toBe(3)
        )
    }
}

export const Empty: Story = {
    parameters: {
        docs: {
            description: {
                story: '初期値が空'
            }
        }
    },
    render: () => (
        <Wrapper defaultValues={{ steps: [] }}>
            <StepsTextBoxList />
        </Wrapper>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 表示確認
        expect(canvas.findByRole('textbox')).not.toBeNull();
        expect(canvas.getByRole('button', { name: '手順を追加' })).toBeInTheDocument();
    }
}