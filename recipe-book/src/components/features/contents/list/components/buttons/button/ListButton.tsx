import Button from "@/components/ui/button/Button"
import { CircularProgress, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { MouseEventHandler, ReactNode } from "react"

/**
 * リストボタン
 */
export default function ListButton({
    children,
    icon,
    loading = false,
    mobile = false,
    onClick
}: {
    children: string
    icon: ReactNode
    loading?: boolean
    mobile?: boolean
    onClick: MouseEventHandler<HTMLElement> | undefined
}) {

    if (mobile) return (
        <MenuItem dense onClick={onClick}>
            <ListItemIcon>
                {loading ? <CircularProgress size={16} color="ui" /> : icon}
            </ListItemIcon>
            <ListItemText>{children}</ListItemText>
        </MenuItem>
    )

    return (
        <Button
            variant="outlined"
            startIcon={icon}
            loading={loading}
            onClick={onClick}>
            {children}
        </Button>
    )
}