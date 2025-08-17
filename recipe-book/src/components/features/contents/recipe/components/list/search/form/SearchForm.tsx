'use client'
import Button from '@/components/ui/button/Button';
import TextBox from '@/components/ui/form/input/TextBox';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { RecipeCategory } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRecipeSearchForm } from '../../../../hooks/useRecipeSearchForm';
import { RecipeSearchInput } from '../../../../type';

/**
 * 検索フォーム 
 */
export default function SearchForm({
    categories,
    searchInput,
    isSearch,
    search
}: {
    categories: RecipeCategory[]
    searchInput: RecipeSearchInput
    isSearch: boolean
    search: (searchInput: RecipeSearchInput) => void
}) {

    const { form, setFormValue } = useRecipeSearchForm(searchInput);

    const [mounted, setMounted] = useState(false);

    const onSubmit = () => {
        search(form);
    }

    useEffect(() => {
        if (isSearch && !mounted) {
            search(form);
            setMounted(true);
        }
    }, [searchInput, search])

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
                    {categories.map((category) => (
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

                <Button type='button' onClick={onSubmit}>
                    検索
                </Button>
            </Stack>
        </form>
    )
}