import { Box, Stack, Typography } from '@mui/material';
import { Meta } from '@storybook/nextjs';

const meta: Meta<typeof Box> = {
    title: 'Theme/Colors',
    component: Box,
    tags: ['no-tests']
}

export default meta;
type Story = Meta<typeof Box>;

export const ThemeColors: Story = {
    render: () => (
        <Stack gap={2}>
            <Stack direction='row' gap={2}>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>primary</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'primary.light' }}>
                        <Typography textAlign='center' sx={{ color: 'primary.contrastText' }}>#e0f2f1</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'primary.main' }}>
                        <Typography textAlign='center' sx={{ color: 'primary.contrastText' }}>#59878b</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'primary.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'primary.contrastText' }}>#3e5e61</Typography>
                    </Stack>
                </Stack>

                <Stack justifyContent='center'>
                    <Typography textAlign='center'>secondary</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'secondary.light' }}>
                        <Typography textAlign='center' sx={{ color: 'secondary.contrastText' }}>#eab8bf</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'secondary.main' }}>
                        <Typography textAlign='center' sx={{ color: 'secondary.contrastText' }}>#eab8bf</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'secondary.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'secondary.contrastText' }}>#a38085</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack direction='row' gap={2}>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>success</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'success.light' }}>
                        <Typography textAlign='center' sx={{ color: 'success.contrastText' }}>#c8e6c9</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'success.main' }}>
                        <Typography textAlign='center' sx={{ color: 'success.contrastText' }}>#689f38</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'success.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'success.contrastText' }}>#558b2f</Typography>
                    </Stack>
                </Stack>

                <Stack justifyContent='center'>
                    <Typography textAlign='center'>info</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'info.light' }}>
                        <Typography textAlign='center' sx={{ color: 'info.contrastText' }}>#b3e5fc</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'info.main' }}>
                        <Typography textAlign='center' sx={{ color: 'info.contrastText' }}>#039be5</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'info.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'info.contrastText' }}>#0288d1</Typography>
                    </Stack>
                </Stack>

                <Stack justifyContent='center'>
                    <Typography textAlign='center'>warning</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'warning.light' }}>
                        <Typography textAlign='center' sx={{ color: 'warning.contrastText' }}>#fff3e0</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'warning.main' }}>
                        <Typography textAlign='center' sx={{ color: 'warning.contrastText' }}>#f57c00</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'warning.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'warning.contrastText' }}>#ef6c00</Typography>
                    </Stack>
                </Stack>

                <Stack justifyContent='center'>
                    <Typography textAlign='center'>error</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'error.light' }}>
                        <Typography textAlign='center' sx={{ color: 'error.contrastText' }}>#ffcdd2</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'error.main' }}>
                        <Typography textAlign='center' sx={{ color: 'error.contrastText' }}>#d32f2f</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'error.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'error.contrastText' }}>#c62828</Typography>
                    </Stack>
                </Stack>

                <Stack justifyContent='center'>
                    <Typography textAlign='center'>inherit</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'inherit' }}>
                        <Typography textAlign='center' sx={{ color: 'inherit' }}>#ffffff</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'inherit' }}>
                        <Typography textAlign='center' sx={{ color: 'inherit' }}>#ffffff</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'inherit' }}>
                        <Typography textAlign='center' sx={{ color: 'inherit' }}>#ffffff</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack direction='row' gap={2}>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>ui</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'ui.light' }}>
                        <Typography textAlign='center' sx={{ color: 'ui.contrastText' }}>#eeeeee</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'ui.main' }}>
                        <Typography textAlign='center' sx={{ color: 'ui.contrastText' }}>#757575</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'ui.dark' }}>
                        <Typography textAlign='center' sx={{ color: 'ui.contrastText' }}>#424242</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export const BaseColors: Story = {
    render: () => (
        <Stack gap={2}>
            <Stack direction='row' gap={2}>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>red</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'red.light' }}>
                        <Typography textAlign='center'>#ffcdd2</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'red.main' }}>
                        <Typography textAlign='center'>#e57373</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>blue</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'blue.light' }}>
                        <Typography textAlign='center'>#b3e5fc</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'blue.main' }}>
                        <Typography textAlign='center'>#64b5f6</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>teal</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'teal.light' }}>
                        <Typography textAlign='center'>#b2dfdb</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'teal.main' }}>
                        <Typography textAlign='center'>#4db6ac</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>orange</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'orange.light' }}>
                        <Typography textAlign='center'>#ffe0b2</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'orange.main' }}>
                        <Typography textAlign='center'>#ffb74d</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction='row' gap={2}>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>brown</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'brown.light' }}>
                        <Typography textAlign='center'>#d7ccc8</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'brown.main' }}>
                        <Typography textAlign='center'>#a1887f</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent='center'>
                    <Typography textAlign='center'>blueGrey</Typography>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'blueGrey.light' }}>
                        <Typography textAlign='center'>#cfd8dc</Typography>
                    </Stack>
                    <Stack textAlign='center' justifyContent='center' sx={{ width: 150, height: 35, bgcolor: 'blueGrey.main' }}>
                        <Typography textAlign='center'>#90a4ae</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}