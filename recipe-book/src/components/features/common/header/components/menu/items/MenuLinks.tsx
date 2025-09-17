'use client'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

const links = [
    { text: 'レシピ', path: '/recipe' },
    { text: 'カレンダー', path: '/calendar' },
    { text: '買い物リスト', path: '/list' }
];

/**
 * メニューリンクリスト
 */
export default function MenuLinks({
    onClose
}: {
    onClose: () => void
}) {
    const router = useRouter();

    // クリックイベント
    const onClick = (path: string) => {
        router.push(path);
        onClose();      // メニューを閉じる
    }

    return (
        <List>
            {links.map(link => (
                <ListItem key={link.text} disablePadding>
                    <ListItemButton onClick={() => onClick(link.path)}>
                        <ListItemText primary={link.text} sx={{ color: 'white' }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}