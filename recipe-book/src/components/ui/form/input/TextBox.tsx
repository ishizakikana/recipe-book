import { Box, FilledInput, FormControl, FormControlPropsSizeOverrides, FormHelperText, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode, Ref } from 'react';

/**
 * テキスト入力ボックス
 */
export default function TextBox({
    id,
    name,
    label,
    type,
    variant = 'outlined',
    size,
    width,
    value,
    defaultValue,
    required,
    disabled,
    readOnly,
    error,
    helperText,
    multiline,
    rows,
    startAdornment,
    endAdornment,
    ref,
    onChange
}: {
    id?: string
    name?: string
    label?: string
    type?: HTMLInputTypeAttribute
    variant?: 'outlined' | 'filled' | 'standard'
    size?: OverridableStringUnion<'small' | 'medium', FormControlPropsSizeOverrides>
    width?: string | number
    value?: unknown
    defaultValue?: unknown
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    error?: boolean
    helperText?: ReactNode
    multiline?: boolean
    rows?: string | number
    startAdornment?: ReactNode | string | number
    endAdornment?: ReactNode | string | number
    ref?: Ref<HTMLInputElement>
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}) {
    const hasAdornment = startAdornment || endAdornment;
    let input: ReactNode;

    if (!hasAdornment) {

        // 装飾がないとき、TextFieldを使用
        input = (
            <TextField
                id={id}
                name={name}
                label={label}
                variant={variant}
                type={type}
                value={value}
                defaultValue={defaultValue}
                required={required}
                disabled={disabled}
                error={error}
                size={size}
                fullWidth
                multiline={multiline}
                rows={rows}
                helperText={helperText}
                inputRef={ref}
                slotProps={{
                    input: {
                        readOnly: readOnly,
                    }
                }}
                onChange={onChange} />
        )
    } else {

        // 装飾があるとき、FormControlを使用
        // startAdornmentとendAdornmentをInputAdornmentでラップ
        const inputProps = {
            id: id,
            name: name,
            type: type,
            readOnly: readOnly,
            error: error,
            value: value,
            defaultValue: defaultValue,
            helperText: helperText,
            multiline: multiline,
            rows: rows,
            inputRef: ref,
            onChange: onChange
        }

        const adornments = {
            start: <InputAdornment position='start'>{startAdornment}</InputAdornment>,
            end: <InputAdornment position='end'>{endAdornment}</InputAdornment>,
        }

        if (variant === 'outlined') {
            input = (
                <TextField
                    label={label}
                    variant={variant}
                    required={required}
                    disabled={disabled}
                    size={size}
                    fullWidth
                    slotProps={{
                        input: {
                            readOnly: readOnly,
                            startAdornment: adornments.start,
                            endAdornment: adornments.end,
                        }
                    }}
                    {...inputProps} />
            )
        } else {
            input = (
                <FormControl
                    variant={variant}
                    disabled={disabled}
                    error={error}
                    size={size}
                    fullWidth>
                    {label && (
                        <InputLabel htmlFor={id} required={required}>
                            {label}
                        </InputLabel>
                    )}

                    {variant == 'filled' && (
                        <FilledInput
                            {...inputProps}
                            sx={{ pt: startAdornment ? 1 : 0.5 }}
                            startAdornment={adornments.start}
                            endAdornment={adornments.end} />
                    )}

                    {variant == 'standard' && (
                        <Input {...inputProps}
                            startAdornment={adornments.start}
                            endAdornment={adornments.end} />
                    )}

                    {helperText && (
                        <FormHelperText id={`${id}-helper-text`}>
                            {helperText}
                        </FormHelperText>
                    )}

                </FormControl>
            )
        }
    }

    return (
        <Box width={width} sx={{ py: 1 }}>
            {input}
        </Box>
    )
}