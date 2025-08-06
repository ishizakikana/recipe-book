import EggAltIcon from '@mui/icons-material/EggAlt';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { User } from '@prisma/client';
import Menu from './menu/Menu';

/**
 * ヘッダー
 */
export default function Header({
    user
}: {
    user: User
}) {

    return (
        <AppBar component='nav'>
            <Toolbar>
                <Menu user={user} />
                <Stack direction='row' alignItems='center' gap={1}>
                    <EggAltIcon />
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}>
                        RECIPE BOOK
                    </Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}