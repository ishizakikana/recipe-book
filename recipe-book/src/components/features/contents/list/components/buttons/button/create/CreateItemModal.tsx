import Modal from '@/components/ui/dialog/Modal';
import Alert from '@/components/ui/feedback/Alert';
import TextBox from '@/components/ui/form/input/TextBox';
import SelectBox from '@/components/ui/form/SelectBox';
import { Box, Stack } from '@mui/material';
import { ListCategory } from '@prisma/client';
import { Controller } from 'react-hook-form';
import { useCreateItemForm } from '../../../../hooks/useCreateItemForm';
import { CreateItemFormInput } from '../../../../types';

/**
 * リストアイテム新規作成モーダル画面
 */
export default function CreateItemModal({
    open,
    listCategories,
    create,
    onClose
}: {
    open: boolean,
    listCategories: ListCategory[],
    create: (item: CreateItemFormInput) => void,
    onClose: () => void
}) {

    const {
        control,
        register,
        handleSubmit,
        categories,
        submitError,
        errors,
        isSubmitting,
        onCreate
    } = useCreateItemForm(listCategories, create);

    // フォーム送信イベント
    const onSubmit = (data: CreateItemFormInput) => {
        const success = onCreate(data);
        if (success) {
            onClose(); // 作成成功時はモーダルを閉じる
        }
    }

    return (
        <Modal
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
        </Modal>
    )
}