'use client'
import Button from '@/components/ui/button/button/Button';
import Alert from '@/components/ui/feedback/alert/Alert';
import TextBox from '@/components/ui/form/input/text/TextBox';
import { FormReturn } from '@/types/form';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { RecipeCategory } from '@prisma/client';
import { Controller } from 'react-hook-form';
import { useRecipeSearchForm as defaultUseRecipeSearchForm } from '../../../hooks/useRecipeSearchForm';
import { RecipeSearchInput } from '../../../type';

/**
 * 検索フォーム 
 */
export default function SearchForm({
    categories,
    searchInput,
    useRecipeSearchForm = defaultUseRecipeSearchForm
}: {
    categories: RecipeCategory[]
    searchInput: RecipeSearchInput
    useRecipeSearchForm?: ({
        searchInput
    }: {
        searchInput: RecipeSearchInput
    }) => FormReturn<RecipeSearchInput>
}) {

    const {
        register,
        control,
        loading,
        submitError,
        onSubmit
    } = useRecipeSearchForm({ searchInput });

    return (
        <>
            <Alert severity='error' visible={!!submitError}>{submitError}</Alert>

            <form onSubmit={onSubmit}>
                <Stack>

                    {/* キーワード */}
                    <TextBox
                        label='キーワード'
                        {...register('keyword')}
                    />

                    {/* カテゴリ */}
                    <Controller
                        name='categoryIds'
                        control={control}
                        render={({ field }) => (
                            <FormGroup row>
                                {categories.map((category) => (
                                    <FormControlLabel
                                        key={category.id}
                                        control={
                                            <Checkbox
                                                checked={field.value.includes(category.id)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    const value = category.id;
                                                    const newValue = checked
                                                        ? [...field.value, value]
                                                        : field.value.filter((id) => id !== value);
                                                    field.onChange(newValue);
                                                }}
                                            />
                                        }
                                        label={category.name} />
                                ))}
                            </FormGroup>
                        )} />

                    <Button type='submit' loading={loading}>
                        検索
                    </Button>
                </Stack>
            </form>
        </>
    )
}