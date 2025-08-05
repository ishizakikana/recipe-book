import { Theme, Tooltip } from '@mui/material'
import MuiIconButton, { IconButtonPropsColorOverrides, IconButtonPropsSizeOverrides } from '@mui/material/IconButton'
import { Box, SxProps } from '@mui/system'
import { OverridableStringUnion } from '@mui/types'
import { MouseEventHandler, ReactNode } from 'react'

/**
 * アイコンボタン
 */
export default function IconButton({
    icon,
    color,
    size,
    edge,
    sx,
    tooltip,
    tipTitle,
    tipPlacement,
    tipOffset,
    ariaLabel,
    onClick,
    onMouseDown,
    onMouseUp
}: {
    icon: ReactNode
    color?: OverridableStringUnion<'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'ui', IconButtonPropsColorOverrides>
    size?: OverridableStringUnion<'small' | 'medium' | 'large', IconButtonPropsSizeOverrides>
    edge?: false | 'start' | 'end'
    sx?: SxProps<Theme>
    tooltip?: boolean
    tipTitle?: string
    tipPlacement?: 'bottom' | 'left' | 'right' | 'top'
    tipOffset?: [number, number]
    ariaLabel?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    onMouseDown?: MouseEventHandler<HTMLButtonElement>
    onMouseUp?: MouseEventHandler<HTMLButtonElement>
}) {

    const iconButton = (
        <MuiIconButton
            color={color ? color : 'primary'}
            size={size}
            edge={edge}
            sx={sx}
            aria-label={tipTitle ?? ariaLabel}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>
            {icon}
        </MuiIconButton>
    );

    if (tooltip) {
        return (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tooltip
                    title={tipTitle}
                    placement={tipPlacement}
                    arrow
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: tipOffset
                                    }
                                }
                            ]
                        }
                    }}>
                    {iconButton}
                </Tooltip>
            </Box>
        )
    } else {
        return (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {iconButton}
            </Box>
        )
    }
}