import { Stack } from '@mui/material'
import MuiButton, { ButtonPropsColorOverrides, ButtonPropsSizeOverrides } from '@mui/material/Button'
import { OverridableStringUnion } from '@mui/types'
import { MouseEventHandler, ReactNode } from 'react'

/**
 * ボタン
 */
export default function Button({
    children,
    variant,
    type,
    color,
    size,
    p,
    pt,
    pb,
    pr,
    pl,
    startIcon,
    endIcon,
    disabled,
    loading,
    onClick
}: {
    children: ReactNode
    variant?: 'text' | 'contained' | 'outlined',
    type?: 'button' | 'submit' | 'reset',
    color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>
    p?: number | string
    pt?: number | string
    pb?: number | string
    pr?: number | string
    pl?: number | string
    startIcon?: ReactNode
    endIcon?: ReactNode
    disabled?: boolean
    loading?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}) {

    return (
        <Stack alignItems='center' justifyContent='center'
            p={p} pt={pt} pb={pb} pr={pr} pl={pl}>

            <MuiButton
                variant={variant ? variant : 'contained'}
                type={type}
                color={color}
                size={size}
                startIcon={startIcon}
                endIcon={endIcon}
                disabled={disabled ? disabled : false}
                loading={loading}
                onClick={onClick}>
                {children}
            </MuiButton>
        </Stack>
    )
}