'use client'
import Button from '@/components/ui/button/Button'
import Alert from '@/components/ui/feedback/Alert'
import ImageBox from '@/components/ui/form/input/ImageBox'
import TextBox from '@/components/ui/form/input/TextBox'
import SelectBox from '@/components/ui/form/SelectBox'
import { Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'
import { useRecipeContext } from '../../../hooks/useRecipeContext'
import { useRecipeEditForm as defaultRecipeEditForm } from '../../../hooks/useRecipeEditForm'
import { RecipeFormInput } from '../../../types/edit'
import StepsTextBoxList from './steps/StepsTextBoxList'

/**
 * レシピ更新フォーム
 */
export default function RecipeEditForm({
    useRecipeEditForm = defaultRecipeEditForm
}: {
    useRecipeEditForm?: typeof defaultRecipeEditForm
}) {
    const router = useRouter();

    const { recipeDetail } = useRecipeContext();

    const {
        control,
        categoryOptions,
        register,
        handleSubmit,
        onUpdate,
        submitError,
        formErrors,
        loading
    } = useRecipeEditForm(recipeDetail);

    // 送信イベント
    const onSubmit = async (data: RecipeFormInput) => {
        const success = await onUpdate(data);
        if (success) {
            router.replace('/recipe');
            setTimeout(() => {
                router.replace(`/recipe/${recipeDetail?.id}`);
            }, 0);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* エラーメッセージ */}
            <Alert severity='error' visible={!!submitError}>{submitError}</Alert>

            <Stack gap={3}>
                <Stack gap={1}>
                    <TextBox
                        label='レシピ名'
                        width='100%'
                        {...register('name')}
                        error={!!formErrors?.name}
                        helperText={formErrors?.name?.message}
                        required />

                    <Controller
                        name='imageUrl'
                        control={control}
                        render={({ field }) => (
                            <ImageBox
                                value={recipeDetail?.imageUrl} onChange={field.onChange} />
                        )} />

                    <SelectBox
                        label='カテゴリー'
                        defaultValue={recipeDetail?.category.id.toString()}
                        options={categoryOptions}
                        {...register('categoryId')} />

                    <Stack direction='row' gap={4}>
                        <TextBox
                            label='保存期間'
                            width='50%'
                            {...register('shelfLife')}
                            error={!!formErrors?.shelfLife}
                            helperText={formErrors?.shelfLife?.message} />
                        <TextBox
                            label='カロリー'
                            width='50%'
                            {...register('calories')}
                            endAdornment='kcal'
                            error={!!formErrors?.calories}
                            helperText={formErrors?.calories?.message} />
                    </Stack>

                    <TextBox
                        label='材料'
                        {...register('ingredients')}
                        error={!!formErrors?.ingredients}
                        helperText={formErrors?.ingredients?.message}
                        multiline
                        rows={5} />

                    <StepsTextBoxList control={control} />

                </Stack>
                <Button type='submit' loading={loading}>保存</Button>
            </Stack>
        </form >
    )
}