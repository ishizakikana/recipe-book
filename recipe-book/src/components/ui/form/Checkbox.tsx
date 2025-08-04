import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CircularProgress } from '@mui/material';
import MuiCheckBox from '@mui/material/Checkbox';

/**
 * チェックボックス
 */
export default function Checkbox({
    id,
    checked,
    loading = false,
    onChange
}: {
    id?: string;
    checked: boolean;
    loading?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}) {

    return (
        <MuiCheckBox
            edge='start'
            checked={checked}
            tabIndex={-1}
            disableRipple
            icon={
                loading ? (
                    <CircularProgress size={24} color='ui' />
                ) : (
                    <CheckBoxOutlineBlankIcon />
                )
            }
            checkedIcon={
                loading ? (
                    <CircularProgress size={24} color='ui' />
                ) : (
                    <CheckBoxIcon />
                )
            }
            slotProps={{
                input: {
                    'aria-labelledby': id,
                }
            }}
            onChange={onChange}
        />
    );
}