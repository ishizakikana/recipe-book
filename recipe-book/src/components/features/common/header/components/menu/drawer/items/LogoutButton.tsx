'use client'
import IconButton from '@/components/ui/button/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '../../../../hooks/useLogout';

/**
 * ログアウトボタン
 */
export default function LogoutButton({
    onLogout
}: {
    onLogout?: () => void
}) {
    const { logout } = useLogout();

    const onClick = () => {
        onLogout?.();
        logout();
    }

    return (
        <IconButton
            icon={<LogoutIcon />}
            tooltip
            tipTitle='ログアウト'
            tipPlacement='top'
            tipOffset={[0, -14]}
            onClick={onClick} />
    )
}