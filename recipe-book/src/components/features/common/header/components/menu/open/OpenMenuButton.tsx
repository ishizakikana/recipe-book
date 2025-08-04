import IconButton from '@/components/ui/button/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * メニュー表示ボタン
 */
export default function OpenMenuButton({
    onClick
}: {
    onClick: () => void
}) {

    return (
        <IconButton
            icon={<MenuIcon />}
            color='inherit'
            ariaLabel='メニューを開く'
            edge='start'
            sx={{ mr: 2 }}
            onClick={onClick} />
    )
}