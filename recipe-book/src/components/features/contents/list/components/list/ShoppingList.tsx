import { List } from '@mui/material'
import { categorizedItem } from '../../type'
import ShoppingCategoryList from './categoryList/ShoppingCategoryList'

/**
 * 買い物リスト
 */
export default function ShoppingList({
    categorizedItems,
    update
}: {
    categorizedItems: categorizedItem[],
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
                <ShoppingCategoryList
                    key={category.id}
                    category={category}
                    items={items}
                    update={update} />
            ))}
        </List>
    )
}