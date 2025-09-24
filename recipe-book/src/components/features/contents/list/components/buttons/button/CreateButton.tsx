'use client'
import { useCreateItemForm as defaultUseCreateItemForm } from '@/components/features/contents/list/hooks/form/useCreateItemForm';
import FormDialog from '@/components/ui/dialog/FormDialog';
import Alert from '@/components/ui/feedback/Alert';
import TextBox from '@/components/ui/form/input/TextBox';
import SelectBox from '@/components/ui/form/SelectBox';
import { useDialog } from '@/hooks/useDialog';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ItemFormInput } from '../../../types/itemFormInput';
import ListButton from './ListButton';

// TODO カテゴリの選択をアイテム名から推測して自動でできるといい

/**
 * リストアイテム新規作成ボタン
 */
export default function CreateButton({
    mobile = false,
    useCreateItemForm = defaultUseCreateItemForm
}: {
    mobile?: boolean
    useCreateItemForm?: typeof defaultUseCreateItemForm
}) {

    const { open, onOpen, onClose } = useDialog();

    const {
        control,
        register,
        handleSubmit,
        categories,
        submitError,
        errors,
        isSubmitting,
        onCreate
    } = useCreateItemForm();

    // フォーム送信イベント
    const onSubmit = async (data: ItemFormInput) => {
        const success = await onCreate(data);
        if (success) {
            onClose(); // 作成成功時はモーダルを閉じる
        }
    }

    return (
        <>
            <ListButton
                icon={<AddIcon />}
                mobile={mobile}
                onClick={onOpen}>
                項目を追加
            </ListButton>

            <FormDialog
                open={open}
                disableBackDropClick
                title='リストアイテム追加'
                loading={isSubmitting}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit(onSubmit)
                    }
                }}
                onClose={onClose}>

                <Box sx={{ px: 3, pt: 2, pb: 1 }}>

                    {/* エラーメッセージ */}
                    <Alert severity='error' visible={!!submitError}>{submitError}</Alert>

                    {/* フォーム */}
                    <Stack gap={1}>
                        <Box display={'flex'} gap={2}>
                            <TextBox
                                label='アイテム名'
                                width={'70%'}
                                {...register('name')}
                                error={!!errors.name}
                                helperText={errors.name?.message} />
                            <TextBox
                                label='数量'
                                width={'30%'}
                                {...register('volume')}
                                error={!!errors.volume} />
                        </Box>
                        <Controller name='categoryId' control={control} render={({ field, fieldState }) => (
                            <SelectBox
                                id='category'
                                label='カテゴリー'
                                value={field.value?.toString() || '0'}
                                error={!!fieldState.error}
                                options={categories}
                                onChange={(e) => {
                                    const value = Number((e.target as HTMLSelectElement).value);
                                    field.onChange(value);
                                }} />
                        )} />
                    </Stack>
                </Box>
            </FormDialog>
        </>
    );
}