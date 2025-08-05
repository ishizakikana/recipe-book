'use client'
import { useNavigation as defaultUseNavigation } from '@/hooks/useNavigation';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const links = [
    { text: 'レシピ', path: '/recipe' },
    { text: 'カレンダー', path: '/calendar' },
    { text: '買い物リスト', path: '/list' }
];

/**
 * メニューリンクリスト
 */
export default function MenuLinks({
    useNavigation = defaultUseNavigation,
}: {
    useNavigation?: typeof defaultUseNavigation
}) {
    const { navigateTo } = useNavigation();

    return (
        <List>
            {links.map(link => (
                <ListItem key={link.text} disablePadding>
                    <ListItemButton onClick={() => navigateTo(link.path)}>
                        <ListItemText primary={link.text} sx={{ color: 'white' }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}