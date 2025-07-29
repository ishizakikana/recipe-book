'use client'

import Button from '@/components/ui/button/button/Button'
import { Container, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Container>
            <Stack direction='column' gap={2} sx={{ pt: 8, textAlign: 'center' }}>

                <Typography variant='h5' fontWeight={700}>エラーが発生しました</Typography>
                <Typography variant='body1'>{error.message}</Typography>

                <Button pt={3} onClick={() => reset()}>
                    再試行
                </Button>
            </Stack>
        </Container>
    )
}
