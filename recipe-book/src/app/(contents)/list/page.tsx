import ShoppingListCard from '@/components/features/contents/list/components/ShoppingListCard';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { apiGetServer } from '@/lib/server/fetchServer';
import { ListCategory, ListItem } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function ListPage() {
    const listCategories: ListCategory[] = await apiGetServer('/list-category/find?all=true');
    const listItems: ListItem[] = await apiGetServer('/list-item/find?all=true');

    return (
        <CenteredContainer sx={{ py: 2 }}>
            <ShoppingListCard initialListItems={listItems} listCategories={listCategories} />
        </CenteredContainer>
    )
}