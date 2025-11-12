'use client'

import CenteredContainer from '@/components/layout/CenteredContainer'
import { CircularProgress } from '@mui/material'

/**
 * ローディング画面
 */
export default function Loading() {
    return (
        <CenteredContainer>
            <CircularProgress role='progressbar' />
        </CenteredContainer>
    )
}
