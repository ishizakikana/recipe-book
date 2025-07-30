'use client'
import Button from '@/components/ui/button/button/Button'
import Alert from '@/components/ui/feedback/alert/Alert'
import DynamicTextBoxList from '@/components/ui/form/input/dynamic/DynamicTextBoxList'
import ImageBox from '@/components/ui/form/input/image/ImageBox'
import TextBox from '@/components/ui/form/input/text/TextBox'
import SelectBox, { SelectOption } from '@/components/ui/form/select/SelectBox'
import { RecipeDetail } from '@/types/entity'
import { FormReturn } from '@/types/form'
import { Stack } from '@mui/material'
import { RecipeCategory } from '@prisma/client'
import { Controller } from 'react-hook-form'
import { useRecipeUpdateForm as defaultRecipeUpdateForm } from '../../../hooks/useRecipeUpdateForm'
import { RecipeUpdateFormInput } from '../../../type'

export default function RecipeUpdateForm({
    recipe,
    recipeCategories,
    useRecipeUpdateForm = defaultRecipeUpdateForm
}: {
    recipe: RecipeDetail
    recipeCategories: RecipeCategory[]
    useRecipeUpdateForm?: () => FormReturn<RecipeUpdateFormInput>
}) {
    const { register, control, submitError, formErrors, loading, onSubmit } = useRecipeUpdateForm();

    const categoryOptions: SelectOption[] = recipeCategories.map(c =>
        ({ label: c.name, value: c.id.toString() })
    )

    return (
        <form onSubmit={onSubmit}>

            {/* エラーメッセージ */}
            <Alert severity='error' visible={!!submitError}>{submitError}</Alert>

            <Stack gap={3}>
                <Stack gap={1}>
                    <TextBox
                        label='レシピ名'
                        width='100%'
                        defaultValue={recipe.name}
                        {...register('name')}
                        error={!!formErrors?.name}
                        helperText={formErrors?.name?.message}
                        required />

                    <Controller
                        name='imageUrl'
                        control={control}
                        defaultValue={recipe.imageUrl}
                        render={({ field }) => (
                            <ImageBox
                                value={recipe.imageUrl} onChange={field.onChange} />
                        )} />

                    <SelectBox
                        label='カテゴリー'
                        options={categoryOptions}
                        defaultValue={recipe.category.id}
                        {...register('categoryId')} />

                    <Stack direction='row' gap={4}>
                        <TextBox
                            label='保存期間'
                            width='50%'
                            defaultValue={recipe.shelfLife}
                            {...register('shelfLife')}
                            error={!!formErrors?.shelfLife}
                            helperText={formErrors?.shelfLife?.message} />
                        <TextBox
                            label='カロリー'
                            width='50%'
                            defaultValue={recipe.calories}
                            {...register('calories')}
                            endAdornment='kcal'
                            error={!!formErrors?.calories}
                            helperText={formErrors?.calories?.message} />
                    </Stack>

                    <DynamicTextBoxList />
                </Stack>
                <Button type='submit' loading={loading}>保存</Button>
            </Stack>
        </form>
    )
}