import { List, Typography } from '@mui/material'
import { CategorizedItem } from '../../types/categorizedItem'
import CategoryList from './categoryList/CategoryList'

/**
 * 買い物リスト
 */
export default function ShoppingList({
    categorizedItems,
    update
}: {
    categorizedItems: CategorizedItem[],
    update: (id: number, isDone: boolean, onFinally: () => void) => void
}) {

    return (
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
                    items={items}
                    update={update} />
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
    )
}