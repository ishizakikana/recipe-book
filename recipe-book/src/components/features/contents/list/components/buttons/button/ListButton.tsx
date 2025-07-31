import Button from "@/components/ui/button/button/Button"
import { CircularProgress, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { MouseEventHandler, ReactNode } from "react"

/**
 * リストボタン
 */
export default function ListButton({
    text,
    icon,
    loading = false,
    mobile = false,
    onClick
}: {
    text: string
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
            <ListItemText>{text}</ListItemText>
        </MenuItem>
    )

    return (
        <Button
            variant="outlined"
            startIcon={icon}
            loading={loading}
            onClick={onClick}>
            {text}
        </Button>
    )
}