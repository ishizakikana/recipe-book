'use client'
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

/**
 * 開始ボタン
 */
export default function StartButton() {
    const router = useRouter();

    // クリックイベント
    const onClick = () => {
        router.push('/login');
    }

    return (
        <Button onClick={onClick}>
            はじめる
        </Button>
    )
}