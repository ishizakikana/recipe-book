import { Box, Fab, FabPropsColorOverrides, Tooltip } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { MouseEventHandler, ReactNode } from 'react';

/**
 * フローティングアクションボタン
 */
export default function FloatingButton({
    children,
    extended,
    color = 'primary',
    size = 'medium',
    top,
    bottom,
    left,
    right,
    tooltip,
    onClick
}: {
    children?: ReactNode
    extended?: boolean
    color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', FabPropsColorOverrides>,
    size?: 'small' | 'medium' | 'large',
    top?: number | string,
    bottom?: number | string,
    left?: number | string,
    right?: number | string,
    tooltip?: {
        title: string,
        placement?: 'bottom' | 'top' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
    },
    onClick?: MouseEventHandler<HTMLButtonElement>
}) {

    return (
        <Box position='absolute' top={top} bottom={bottom} left={left} right={right}>
            <Tooltip title={tooltip?.title} placement={tooltip?.placement} arrow>
                <Fab
                    variant={extended ? 'extended' : 'circular'}
                    color={color}
                    size={size}
                    onClick={onClick}>
                    {children}
                </Fab>
            </Tooltip>
        </Box>
    )
}