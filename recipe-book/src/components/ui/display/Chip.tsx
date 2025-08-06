import { Box } from '@mui/material';
import MuiChip from '@mui/material/Chip';

export type ChipColors = 'red' | 'blue' | 'teal' | 'orange' | 'brown' | 'blueGrey'

/**
 * チップ
 */
export default function Chip({
    label,
    color
}: {
    label: string
    color?: ChipColors
}) {

    return (
        <Box>
            <MuiChip label={label}
                sx={{
                    bgcolor: `${color}.light`
                }} />
        </Box>
    )
}