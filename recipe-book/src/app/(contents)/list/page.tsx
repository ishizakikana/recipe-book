import ListContainer from '@/components/features/contents/list/components/ListContainer';
import ListContextProvider from '@/components/features/contents/list/providers/ListContextProvider';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { apiGetServer } from '@/lib/server/fetchServer';
import { ListCategory, ListItem } from '@prisma/client';

/**
 * 買い物リスト画面
 */
export default async function ListPage() {
    const listCategories: ListCategory[] = await apiGetServer('/list-category/find?all=true');
    const listItems: ListItem[] = await apiGetServer('/list-item/find?all=true');

    return (
        <ListContextProvider listCategories={listCategories} initialListItems={listItems}>
            <CenteredContainer sx={{ py: 2 }}>
                <ListContainer />
            </CenteredContainer>
        </ListContextProvider>
    )
}