'use client'
import Button from '@/components/ui/button/Button'
import Alert from '@/components/ui/feedback/Alert'
import ImageBox from '@/components/ui/form/input/ImageBox'
import TextBox from '@/components/ui/form/input/TextBox'
import SelectBox, { SelectOption } from '@/components/ui/form/SelectBox'
import { RecipeDetail } from '@/types/entity'
import { FormReturn } from '@/types/form'
import { Stack } from '@mui/material'
import { RecipeCategory } from '@prisma/client'
import { Controller } from 'react-hook-form'
import { useRecipeUpdateForm as defaultRecipeUpdateForm } from '../../../hooks/useRecipeUpdateForm'
import { RecipeUpdateFormInput } from '../../../type'
import StepsTextBoxList from './steps/StepsTextBoxList'

/**
 * レシピ更新フォーム
 */
export default function RecipeUpdateForm({
    recipe,
    recipeCategories,
    useRecipeUpdateForm = defaultRecipeUpdateForm
}: {
    recipe: RecipeDetail
    recipeCategories: RecipeCategory[]
    useRecipeUpdateForm?: (recipe: RecipeDetail) => FormReturn<RecipeUpdateFormInput>
}) {
    const { register, control, submitError, formErrors, loading, onSubmit } = useRecipeUpdateForm(recipe);

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