import { Box } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';
import StepsTextBoxList from '../../../../edit/form/steps/StepsTextBoxList';

const meta: Meta<typeof StepsTextBoxList> = {
    title: 'Features/Recipe/Edit/Form/Steps/StepsTextBoxList',
    component: StepsTextBoxList,
    parameters: {
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

const Wrapper = ({
    children,
    defaultValues,
}: {
    children: React.ReactNode;
    defaultValues?: any;
}) => {
    const methods = useForm({
        defaultValues: defaultValues ?? {
            ingredients: [{ name: '塩', volume: '小さじ1' }],
        },
    });

    return (
        <FormProvider {...methods}>
            <Box sx={{ maxWidth: 500 }}>{children}</Box>
        </FormProvider>
    );
};

export const Default: Story = {
    render: () => (
        <Wrapper>
            <StepsTextBoxList
                control={useForm().control}
            />
        </Wrapper>
    ),
};