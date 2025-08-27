import { Card, Stack, Typography } from '@mui/material';
import { User } from '@prisma/client';
import LogoutButton from './LogoutButton';

/**
 * ユーザー情報パネル
 */
export default function UserPanel({
    user
}: {
    user: User
}) {

    return (
        <Card component={Stack} direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 2, py: 1 }}>
            <Typography>{user.name}</Typography>
            <LogoutButton />
        </Card >
    )
}