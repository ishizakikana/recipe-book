'use client'

import FloatingButton from '@/components/ui/button/FloatingButton';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useRecipeContext } from '../../hooks/useRecipeContext';

/**
 * レシピ追加ボタン
 */
export default function RecipeAddButton() {
    const router = useRouter();
    const { setRecipeDetail } = useRecipeContext();

    // クリックイベント
    const handleClick = () => {
        router.push('/recipe/000000/edit');
        setRecipeDetail(null);
    }

    return (
        <FloatingButton
            color='primary'
            bottom={32}
            left={32}
            tooltip={{ title: '追加', placement: 'top' }}
            onClick={handleClick}>
            <AddIcon />
        </FloatingButton>
    )
}