import { StepSummary } from '@/types/entity';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

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
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar sx={{ mt: 0.4 }}>
                            <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>{step.stepNumber}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={step.text}
                            secondary={step.seasonings && step.seasonings.length > 0 && (
                                <List>
                                    {step.seasonings.map(seasoning => (
                                        <ListItem key={seasoning.id} disablePadding component='div'>
                                            <Typography component='div' fontSize={14}>
                                                {seasoning.name} - {seasoning.volume}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            )} />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    )
}