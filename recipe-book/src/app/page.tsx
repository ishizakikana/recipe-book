import StartButton from '@/components/features/index/components/StartButton';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { Typography } from '@mui/material';

/**
 * 初期画面
 */
export default function IndexPage() {
    return (
        <CenteredContainer direction='column' gap={2}>
            <Typography variant='h5'>RECIPE BOOK</Typography>
            <StartButton />
        </CenteredContainer>
    )
}