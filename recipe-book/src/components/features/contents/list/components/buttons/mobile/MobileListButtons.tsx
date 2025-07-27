import IconButton from "@/components/ui/button/iconButton/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from "@mui/material";
import { ListCategory } from "@prisma/client";
import { useState } from "react";
import { CreateFormInput } from "../../../type";
import BulkToggleStatusButton from "../buttons/bulkToggleStatus/BulkToggleStatusButton";
import CreateButton from "../buttons/create/CreateButton";
import DeleteButton from "../buttons/delete/DeleteButton";

/**
 * リストボタン群（モバイル用）
 */
export default function MobileListButtons({
    listCategories,
    onCreate,
    onUpdateAll,
    onDeleteAll
}: {
    listCategories: ListCategory[],
    onCreate: (item: CreateFormInput) => void,
    onUpdateAll: (isDone: boolean, onFinally: () => void) => void
    onDeleteAll: (onFinally: () => void) => void
}) {

    // メニュー開閉状態管理
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const onClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                icon={<MoreVertIcon />}
                color='ui'
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 2
                }}
                onClick={onOpen}
            />

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}>

                <CreateButton
                    onCreate={onCreate}
                    listCategories={listCategories}
                    mobile />

                {[false, true].map((markAsDone, idx) => (
                    <BulkToggleStatusButton
                        key={idx}
                        markAsDone={markAsDone}
                        onUpdateAll={onUpdateAll}
                        mobile />
                ))}

                <DeleteButton
                    onDeleteAll={onDeleteAll}
                    mobile />
            </Menu>
        </>
    )
}