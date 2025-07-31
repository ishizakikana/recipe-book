'use client'
import Modal from '@/components/ui/dialog/Modal';
import Alert from '@/components/ui/feedback/alert/Alert';
import TextBox from '@/components/ui/form/input/text/TextBox';
import SelectBox from '@/components/ui/form/select/SelectBox';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack } from '@mui/material';
import { ListCategory } from '@prisma/client';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useCreateItemForm } from '../../../hooks/useCreateItemForm';
import { CreateItemFormInput } from '../../../types';
import ListButton from './ListButton';

// TODO カテゴリの選択をアイテム名から推測して自動でできるといい

/**
 * リストアイテム新規作成ボタン
 */
export default function CreateButton({
    listCategories,
    mobile = false,
    create,
}: {
    listCategories: ListCategory[]
    mobile?: boolean
    create: (item: CreateItemFormInput) => void
}) {
    // 開閉状態管理
    const [open, setOpen] = useState(false);

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
            setOpen(false); // 作成成功時はモーダルを閉じる
        }
    }

    return (
        <>
            <ListButton
                text={'項目を追加'}
                icon={<AddIcon />}
                mobile={mobile}
                onClick={() => setOpen(true)} />

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
                onClose={() => setOpen(false)}>

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
        </>
    );
}