'use client'
import IconButton from "@/components/ui/button/iconButton/IconButton";
import { useNavigation as defaultUseNavigation } from "@/hooks/useNavigation";
import EditIcon from '@mui/icons-material/Edit';

/**
 * レシピ編集ボタン
 */
export default function RecipeEditButton({
    useNavigation = defaultUseNavigation
}: {
    useNavigation?: typeof defaultUseNavigation
}) {
    const { navigateAppend } = useNavigation();

    // クリックイベント
    const onClick = () => {
        navigateAppend('edit');
    }

    return (
        <IconButton
            icon={<EditIcon />}
            color='ui'
            tooltip
            tipTitle='編集'
            tipPlacement='top'
            tipOffset={[0, -8]}
            onClick={onClick} />
    )
}