'use client'
import Button from '@/components/ui/button/Button'
import Alert from '@/components/ui/feedback/Alert'
import ImageBox from '@/components/ui/form/input/ImageBox'
import TextBox from '@/components/ui/form/input/TextBox'
import SelectBox, { SelectOption } from '@/components/ui/form/SelectBox'
import { RecipeDetail } from '@/types/entity'
import { Stack } from '@mui/material'
import { RecipeCategory } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'
import { useRecipeEditForm as defaultRecipeEditForm } from '../../../hooks/useRecipeEditForm'
import { RecipeFormInput } from '../../../type'
import StepsTextBoxList from './steps/StepsTextBoxList'

/**
 * レシピ更新フォーム
 */
export default function RecipeUpdateForm({
    recipe,
    recipeCategories,
    useRecipeEditForm = defaultRecipeEditForm
}: {
    recipe: RecipeDetail
    recipeCategories: RecipeCategory[]
    useRecipeEditForm?: typeof defaultRecipeEditForm
}) {
    const router = useRouter();

    const { control, register, handleSubmit, submitError, formErrors, loading, onUpdate } = useRecipeEditForm(recipe);

    const categoryOptions: SelectOption[] = recipeCategories.map(c =>
        ({ label: c.name, value: c.id.toString() })
    )

    const onSubmit = async (data: RecipeFormInput) => {
        const success = await onUpdate(data);
        if (success) {
            router.back();
            router.replace(`/recipe/${recipe.id}`);
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
                                value={recipe.imageUrl} onChange={field.onChange} />
                        )} />

                    <SelectBox
                        label='カテゴリー'
                        defaultValue={recipe.category.id.toString()}
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