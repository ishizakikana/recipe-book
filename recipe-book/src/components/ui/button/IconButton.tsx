import { Box, Theme, Tooltip } from '@mui/material'
import MuiIconButton, { IconButtonPropsColorOverrides, IconButtonPropsSizeOverrides } from '@mui/material/IconButton'
import { SxProps } from '@mui/system'
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
            aria-label={tipTitle ? tipTitle : ariaLabel}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {icon}
            </span>
        </MuiIconButton>
    );

    if (tooltip) {
        return (
            <Box>
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
                    <span style={{ display: 'flex' }}>{iconButton}</span>
                </Tooltip>
            </Box >
        )
    } else {
        return iconButton
    }
}