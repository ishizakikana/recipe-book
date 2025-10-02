import { StepSummary } from '@/types/viewModel';
import { Avatar, Divider, List, ListItem, ListItemAvatar, Stack, Typography } from '@mui/material';

/**
 * 作業手順リスト
 */
export default function StepList({
    steps
}: {
    steps: StepSummary[]
}) {

    return (
        <List>
            {steps.map((step) => (
                <div key={step.id}>
                    <ListItem alignItems='flex-start' slotProps={{ root: { 'aria-label': 'step-item' } }}>
                        <ListItemAvatar sx={{ mt: 0.4 }}>
                            <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>{step.stepNumber}</Avatar>
                        </ListItemAvatar>

                        <Stack sx={{ width: '100%', py: 1 }} gap={1}>
                            <Typography fontSize={16}>{step.text}</Typography>
                            {step.seasonings && step.seasonings.length > 0 && (
                                <List disablePadding>
                                    {step.seasonings.map(seasoning => (
                                        <ListItem key={seasoning.id} disablePadding component='div' slotProps={{ root: { 'aria-label': 'seasoning-item' } }}>
                                            <Typography component='div' fontSize={14}>
                                                {seasoning.name} - {seasoning.volume}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Stack>

                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    )
}