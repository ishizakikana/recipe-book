'use client'
import Checkbox from '@/components/ui/form/Checkbox';
import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import MuiListItem from '@mui/material/ListItem';
import { ListItem as ListItemType } from '@prisma/client';
import { useState } from 'react';
import { useItemList } from '../../../../hooks/useItemList';

/**
 * 買い物リストアイテム
 */
export default function ListItem({
    item
}: {
    item: ListItemType
}) {

    const { update } = useItemList();

    // ローディング管理
    const [loading, setLoading] = useState(false);

    // アイテムID
    const id = `checkbox-list-label-${item.id}`

    // クリックイベント
    const onClick = async () => {
        if (loading) return; // すでに処理中の場合は何もしない
        setLoading(true);

        // アイテムの完了状態を更新
        update(item.id, !item.isDone, () => setLoading(false));
    }

    return (
        <MuiListItem key={item.id} disablePadding>
            <ListItemButton role={undefined} onClick={onClick} dense>
                <ListItemIcon>
                    <Checkbox id={id} checked={item.isDone} loading={loading} />
                </ListItemIcon>

                <ListItemText
                    id={id}
                    primary={
                        <Stack direction='row' justifyContent='space-between' gap={1.5}>
                            <span>{item.name}</span>
                            <span>{item.volume}</span>
                        </Stack>
                    }
                    secondary={item.recipeName} />
            </ListItemButton>
        </MuiListItem>
    )
}