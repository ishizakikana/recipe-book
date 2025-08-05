import IconButton from '@/components/ui/button/IconButton';
import TextBox from '@/components/ui/form/input/TextBox';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Grow, InputLabel, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';

/**
 * 手順入力ボックス
 */
export default function StepsTextBoxList({
    control,
}: {
    control?: Control<any>
}) {

    const { fields, append, remove } = useFieldArray<{
        steps: { text: string, seasonings: string }[]
    }>({
        control, name: 'steps'
    });

    // マウント状態管理
    const [mounted, setMounted] = useState(false);

    // 初期マウント時にアニメーションを有効化
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Paper component={Stack} elevation={0} position='relative'
            sx={{ py: 2, px: 3, alignItems: 'start', justifyContent: 'center', border: '1px solid #ccc' }}>

            <InputLabel
                sx={{ position: 'absolute', top: -7, left: 16, fontSize: 12, bgcolor: 'background.paper', px: 0.5 }}>
                手順
            </InputLabel>

            <Stack alignItems='start' sx={{ width: '100%' }} gap={2}>
                {fields.map((field, index) => (
                    <>
                        <Grow key={field.id} in={mounted} timeout={300}>
                            <Stack direction='row' gap={3} sx={{ width: '100%', my: 1 }}>
                                <Avatar
                                    sx={{ bgcolor: 'primary.main', width: 30, height: 30, mt: 2 }}>
                                    {index + 1}
                                </Avatar>

                                <Stack flex={1}>
                                    <Controller
                                        control={control}
                                        name={`${index}.text`}
                                        defaultValue={field.text}
                                        render={({ field }) =>
                                            <TextBox
                                                size='small'
                                                {...field}
                                                multiline
                                                rows={3} />
                                        } />

                                    <Accordion disableGutters
                                        defaultExpanded={field.seasonings !== ''}
                                        sx={{ border: '1px solid #ccc' }}
                                        slotProps={{ root: { elevation: 0 } }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <Typography component='span' color='text.secondary'>調味料</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Controller
                                                control={control}
                                                name={`${name}.${index}.seasonings`}
                                                defaultValue={field.seasonings}
                                                render={({ field }) =>
                                                    <TextBox
                                                        size='small'
                                                        {...field}
                                                        multiline
                                                        rows={4} />
                                                } />
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>

                                <IconButton
                                    icon={<CloseIcon fontSize='inherit' />}
                                    size='small'
                                    color='ui'
                                    ariaLabel='行を削除'
                                    onClick={() => {
                                        if (fields.length > 1) remove(index);
                                    }} />
                            </Stack>
                        </Grow>
                        <Divider sx={{ width: '100%' }} />
                    </>
                ))}

                <IconButton
                    icon={<AddIcon fontSize='inherit' />}
                    sx={{ ms: 1 }}
                    ariaLabel='行を追加'
                    onClick={() => append({ text: '', seasonings: '' })} />
            </Stack>
        </Paper>
    )
}