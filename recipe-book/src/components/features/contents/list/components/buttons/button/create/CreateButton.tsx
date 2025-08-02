'use client'
import AddIcon from '@mui/icons-material/Add';
import { ListCategory } from '@prisma/client';
import { useState } from 'react';
import { CreateItemFormInput } from '../../../../types';
import ListButton from '../ListButton';
import CreateItemModal from './CreateItemModal';

// TODO カテゴリの選択をアイテム名から推測して自動でできるといい

/**
 * リストアイテム新規作成ボタン
 */
export default function CreateButton({
    listCategories,
    mobile = false,
    create,
}: {
    listCategories: ListCategory[]
    mobile?: boolean
    create: (item: CreateItemFormInput) => void
}) {

    // 開閉状態管理
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListButton
                text={'項目を追加'}
                icon={<AddIcon />}
                mobile={mobile}
                onClick={() => setOpen(true)} />

            <CreateItemModal
                open={open}
                listCategories={listCategories}
                create={create}
                onClose={() => setOpen(false)} />
        </>
    );
}