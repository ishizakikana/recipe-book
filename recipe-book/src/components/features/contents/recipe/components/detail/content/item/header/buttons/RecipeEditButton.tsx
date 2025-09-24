'use client'
import IconButton from '@/components/ui/button/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

/**
 * レシピ編集ボタン
 */
export default function RecipeEditButton({
    recipeId
}: {
    recipeId: number
}) {
    const router = useRouter();

    // クリックイベント
    const onClick = () => {
        const path = `/recipe/${recipeId}/edit`;
        router.push(path);
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