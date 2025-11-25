'use client'

import Button from '@/components/ui/button/Button'
import { Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * エラー画面
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    const router = useRouter();

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Container>
            <Stack direction='column' gap={2} sx={{ pt: 8, textAlign: 'center' }}>

                <Typography variant='h5' fontWeight={700}>エラーが発生しました。</Typography>
                <Typography variant='body1'>{error.message}</Typography>

                <Stack direction='row' gap={2} justifyContent='center' pt={2}>
                    <Button onClick={() => reset()}>
                        再試行
                    </Button>
                    <Button onClick={() => router.push('/recipe')}>
                        トップページに戻る
                    </Button>
                </Stack>

            </Stack>
        </Container>
    )
}
