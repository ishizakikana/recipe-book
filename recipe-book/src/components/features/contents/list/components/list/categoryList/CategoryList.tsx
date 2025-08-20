import { getIcon } from "@/lib/constants/icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListSubheader, Stack, Typography } from "@mui/material"
import { ListCategory, ListItem as ListItemType } from "@prisma/client"
import ListItem from './item/ListItem'

/**
 * カテゴリごとの買い物リスト
 */
export default function CategoryList({
    category,
    items,
    update
}: {
    category: ListCategory,
    items: ListItemType[],
    update: (id: number, isDone: boolean, onFinally: () => void) => void

}) {

    return (
        <li key={category.id}>
            <ul>
                <ListSubheader sx={{
                    bgcolor: `${category.color}.main`,
                    borderRadius: '5px',
                    my: 1
                }}>
                    <Stack direction='row' justifyContent='flex-start' gap={1.5} sx={{ py: 1 }} >
                        <FontAwesomeIcon icon={getIcon(category.icon)} color={'#fff'} />
                        <Typography color='#fff' variant='subtitle2'>{category.name}</Typography>
                    </Stack>
                </ListSubheader>

                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        update={update} />
                ))}
            </ul>
        </li>
    )
}