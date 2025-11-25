'use client'

import FloatingButton from '@/components/ui/button/FloatingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

/**
 * レシピ一覧画面に戻るボタン
 */
export default function BackButton() {
    const router = useRouter();

    // クリックイベント
    const handleClick = () => {
        router.push('/recipe');
    }

    return (
        <FloatingButton
            color='primary'
            bottom={32}
            left={32}
            tooltip={{ title: '戻る', placement: 'top' }}
            onClick={handleClick}>
            <ArrowBackIcon />
        </FloatingButton>
    )
}