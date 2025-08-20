'use client'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecipeSearchForm as defaultUseRecipeSearchForm } from '../../../hooks/useRecipeSearchForm';
import SearchForm from './form/SearchForm';

/**
 * 検索アコーディオン
 */
export default function SearchAccordion({
    useRecipeSearchForm = defaultUseRecipeSearchForm
}: {
    useRecipeSearchForm?: typeof defaultUseRecipeSearchForm
}) {
    const { form, isSearch, setFormValue } = useRecipeSearchForm();

    // 開閉状態管理
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(!!isSearch)
    }, [isSearch]);

    return (
        <Box sx={{ px: 3 }}>
            <Accordion
                slotProps={{ root: { variant: 'outlined' } }}
                expanded={expanded}
                onChange={(_, newExpanded) => setExpanded(newExpanded)}>

                <AccordionSummary
                    expandIcon={<KeyboardArrowDownIcon />}>
                    <SearchIcon />
                    <Typography component='span' sx={{ ml: 1 }}>検索</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ px: 2 }}>
                        <SearchForm form={form} setFormValue={setFormValue} />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}