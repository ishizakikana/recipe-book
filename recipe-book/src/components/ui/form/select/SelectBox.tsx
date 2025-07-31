import { Box, FormControl, FormControlPropsSizeOverrides, FormHelperText, InputLabel, MenuItem } from '@mui/material';
import MuiSelect from '@mui/material/Select';
import { OverridableStringUnion } from '@mui/types';
import { ChangeEvent, ReactNode, Ref } from 'react';

export type SelectOption = {
    label: string
    value: string
}

export default function SelectBox({
    id,
    name,
    label,
    variant = 'outlined',
    size,
    width,
    required,
    disabled,
    error,
    helperText,
    value,
    defaultValue,
    ref,
    options,
    disableDefaultOption,
    onChange
}: {
    id?: string
    name?: string
    label?: string
    variant?: 'outlined' | 'filled' | 'standard' | undefined
    size?: OverridableStringUnion<'small' | 'medium', FormControlPropsSizeOverrides> | undefined
    width?: number | string
    required?: boolean
    disabled?: boolean
    error?: boolean
    helperText?: ReactNode
    value?: string | number
    defaultValue?: string | number
    ref?: Ref<HTMLSelectElement>
    options?: SelectOption[]
    disableDefaultOption?: boolean
    onChange?: ((event: ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string; }; }), child: ReactNode) => void) | undefined
}) {

    return (
        <Box width={width} sx={{ py: 1 }}>
            <FormControl
                fullWidth
                variant={variant}
                size={size}
                required={required}
                disabled={disabled}
                error={error}
            >

                {label && (
                    <InputLabel id={`${id}-label`} htmlFor={id}>
                        {label}
                    </InputLabel>
                )}

                <MuiSelect
                    labelId={`${id}-label`}
                    id={id}
                    name={name}
                    label={label}
                    inputRef={ref}
                    value={value?.toString()}
                    defaultValue={defaultValue?.toString()}
                    onChange={onChange}
                >

                    {/* デフォルトオプション */}
                    {!disableDefaultOption &&
                        <MenuItem value='0'>---</MenuItem>
                    }

                    {options?.map((o) => (
                        <MenuItem key={o.value} value={o.value}>
                            {o.label}
                        </MenuItem>
                    ))}
                </MuiSelect>

                {helperText && (
                    <FormHelperText id={`${id}-helper-text`}>
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        </Box>
    )
}