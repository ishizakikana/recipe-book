import { RecipeFormInput } from '@/components/features/contents/recipe/types/edit';
import IconButton from '@/components/ui/button/IconButton';
import TextBox from '@/components/ui/form/input/TextBox';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Fade, InputLabel, Paper, Stack, Typography } from '@mui/material';
import { Control, Controller, useFieldArray } from 'react-hook-form';

/**
 * 手順入力ボックス
 */
export default function StepsTextBoxList({
    control,
}: {
    control?: Control<RecipeFormInput>
}) {

    const { fields, append, remove } = useFieldArray<RecipeFormInput>({
        control,
        name: 'steps'
    });

    return (
        <Paper component={Stack} elevation={0} position='relative'
            sx={{ py: 2, px: 3, alignItems: 'start', justifyContent: 'center', border: '1px solid #ccc' }}>

            <InputLabel
                sx={{ position: 'absolute', top: -7, left: 16, fontSize: 12, bgcolor: 'background.paper', px: 0.5 }}>
                手順
            </InputLabel>

            <Stack alignItems='start' sx={{ width: '100%' }} gap={2}>
                {fields.map((field, index) => (
                    <Box key={field.id} sx={{ width: '100%' }}>
                        <Fade in={true} timeout={300}>
                            <Stack direction='row' gap={3} sx={{ width: '100%', my: 1 }}>
                                <Avatar
                                    sx={{ bgcolor: 'primary.main', width: 30, height: 30, mt: 2 }}>
                                    {index + 1}
                                </Avatar>

                                <Stack flex={1}>
                                    <Controller
                                        control={control}
                                        name={`steps.${index}.text`}
                                        defaultValue={field.text}
                                        render={({ field }) =>
                                            <TextBox
                                                size='small'
                                                {...field}
                                                multiline
                                                rows={3}
                                                ariaLabel={`手順${index + 1}`} />
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
                                                name={`steps.${index}.seasonings`}
                                                defaultValue={field.seasonings}
                                                render={({ field }) =>
                                                    <TextBox
                                                        size='small'
                                                        {...field}
                                                        multiline
                                                        rows={4}
                                                        ariaLabel={`調味料${index + 1}`} />
                                                } />
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>

                                <IconButton
                                    icon={<CloseIcon fontSize='inherit' />}
                                    size='small'
                                    color='ui'
                                    ariaLabel={`手順${index + 1}を削除`}
                                    onClick={() => {
                                        if (fields.length > 1) remove(index);
                                    }} />
                            </Stack>
                        </Fade>
                        <Divider sx={{ width: '100%' }} />
                    </Box>
                ))}

                <IconButton
                    icon={<AddIcon fontSize='inherit' />}
                    sx={{ ms: 1 }}
                    ariaLabel='手順を追加'
                    onClick={() => append({ id: 0, text: '', seasonings: '' })} />
            </Stack>
        </Paper>
    )
}