import { ListCategory, ListItem } from '@prisma/client'
import { CategorizedItem } from './categorizedItem'

export type ListContextType = {
    listCategories: ListCategory[]
    categorizedItems: CategorizedItem[]
    listItems: ListItem[]
    setListItems: React.Dispatch<React.SetStateAction<ListItem[]>>
    error: string | null
    setError: React.Dispatch<React.SetStateAction<string | null>>
}