'use client'
import IconButton from '@/components/ui/button/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout as defaultUseLogout } from '../../../hooks/useLogout';

/**
 * ログアウトボタン
 */
export default function LogoutButton({
    useLogout = defaultUseLogout,
}: {
    useLogout?: typeof defaultUseLogout
}) {
    const { logout } = useLogout();

    return (
        <IconButton
            icon={<LogoutIcon />}
            tooltip
            tipTitle='ログアウト'
            tipPlacement='top'
            tipOffset={[0, -14]}
            onClick={() => logout()} />
    )
}