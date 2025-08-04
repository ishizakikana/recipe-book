'use client'
import { useNavigation } from '@/hooks/useNavigation';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const links = [
    { text: 'レシピ', path: '/recipe' },
    { text: 'カレンダー', path: '/calendar' },
    { text: '買い物リスト', path: '/list' }
];

export default function MenuLinks({
    onNavigation
}: {
    onNavigation?: (path: string) => void
}) {
    const { navigateTo } = useNavigation();

    // クリックイベント
    const onClick = (path: string) => {
        onNavigation?.(path);
        navigateTo(path);
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