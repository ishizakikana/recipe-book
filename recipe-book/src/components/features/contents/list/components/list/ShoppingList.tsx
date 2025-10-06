import { Box, List, Typography } from '@mui/material';
import { useListContext } from '../../hooks/useListContext';
import CategoryList from './categoryList/CategoryList';

/**
 * 買い物リスト
 */
export default function ShoppingList() {
    const { categorizedItems } = useListContext();

    return (
        <Box role='list' aria-label='買い物リスト'>
            <List disablePadding
                sx={{
                    width: '100%', flex: 1, overflow: 'auto', position: 'relative',
                    pr: 3, '& ul': { padding: 0 },
                }}
                subheader={<li />}>

                {/* カテゴリごとの買い物リスト */}
                {categorizedItems.map(({ category, items }) => (
                    <CategoryList
                        key={category.id}
                        category={category}
                        items={items} />
                ))}

                {/* 表示するアイテムがないとき */}
                {categorizedItems.length === 0 && (
                    <Typography
                        variant='body2'
                        sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                        アイテムがありません
                    </Typography>
                )}
            </List>
        </Box>
    )
}