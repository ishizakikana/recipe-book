'use client'
import TextBox from '@/components/ui/form/input/TextBox';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useContext } from 'react';
import { RecipeContext } from '../../../../providers/RecipeContextProvider';
import { RecipeSearchInput } from '../../../../types/search';

/**
 * 検索フォーム 
 */
export default function SearchForm({
    form,
    setFormValue
}: {
    form: RecipeSearchInput,
    setFormValue: (key: string, value: string | number[]) => void,
}) {

    const { recipeCategories } = useContext(RecipeContext);

    return (
        <form>
            <Stack>

                {/* キーワード */}
                <TextBox
                    name='keyword'
                    label='キーワード'
                    value={form.keyword}
                    onChange={(e) => setFormValue(e.target.name, e.target.value)}
                />

                {/* カテゴリ */}
                <FormGroup row>
                    {recipeCategories
                        .sort((a, b) => a.id - b.id)
                        .map((category) => (
                            <FormControlLabel
                                key={category.id}
                                control={
                                    <Checkbox
                                        name='categoryIds'
                                        checked={form.categoryIds.includes(category.id)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const value = category.id;
                                            const newValue = checked
                                                ? [...form.categoryIds, value]
                                                : form.categoryIds.filter((id) => id !== value);
                                            setFormValue(e.target.name, newValue);
                                        }}
                                    />
                                }
                                label={category.name} />
                        ))}
                </FormGroup>
            </Stack>
        </form>
    )
}