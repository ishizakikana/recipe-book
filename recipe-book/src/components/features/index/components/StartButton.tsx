'use client'
import Button from '@/components/ui/button/Button';
import { useNavigation } from '@/hooks/useNavigation';

export default function StartButton({
    onNavigation
}: {
    onNavigation?: (path: string) => void
}) {
    const { navigateTo } = useNavigation();

    // クリックイベント
    const onClick = () => {
        onNavigation?.('/login');
        navigateTo('/login');
    }

    return (
        <Button onClick={onClick}>
            はじめる
        </Button>
    )
}