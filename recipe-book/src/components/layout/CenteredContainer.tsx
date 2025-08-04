import { Stack, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

/**
 * 子要素を上下左右中央に配置するコンテナ
 * 
 * 横幅・高さは親要素に依存します。
 */
export default function CenteredContainer({
    children,
    direction,
    gap,
    sx
}: {
    children: ReactNode
    direction?: 'row' | 'column' | undefined
    gap?: number
    sx?: SxProps<Theme> | undefined
}) {
    return (
        <Stack
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                flexDirection: direction,
                gap: gap,
                ...sx
            }}>
            {children}
        </Stack>
    )
}