'use client'
import { useMediaQuery, useTheme } from '@mui/material'
import { ListCategory } from '@prisma/client'
import { CreateFormInput } from '../../type'
import DesktopListButtons from './desktop/DesktopListButtons'
import MobileListButtons from './mobile/MobileListButtons'

/**
 * リストボタンコンテナ
 */
export default function ListButtonContainer({
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

    const props = {
        listCategories, onCreate, onUpdateAll, onDeleteAll
    }

    // スマホ判定
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    return mobile
        ? <MobileListButtons {...props} />
        : <DesktopListButtons {...props} />
}