import { useController, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';

const FormInput = ({
    name,
    label,
    rules,
    type,
    defaultValue = '',
    formatValue = (v) => v,
    formatOnBlur,
    sx,
    ...rest
}) => {
    const { onChange, onBlur, ...props } = rest;
    const { control } = useFormContext();
    const { field, fieldState } = useController({ name, control, rules, defaultValue: formatValue(defaultValue) });

    const handleChange = useCallback(
        (e) => {
            if (!formatOnBlur && e.target.value) e.target.value = formatValue(e.target.value);
            field.onChange(e);
            onChange?.(e);
        },
        [field, formatOnBlur, formatValue, onChange]
    );

    const handleBlur = useCallback(
        (e) => {
            if (formatOnBlur) {
                e.target.value = formatValue(e.target.value);
                field.onChange(e);
            }
            field.onBlur(e);
            onBlur?.(e);
        },
        [field, formatOnBlur, formatValue, onBlur]
    );

    return (
        <TextField
            size="small"
            value={field.value}
            inputRef={field.ref}
            onChange={handleChange}
            onBlur={handleBlur}
            label={label}
            type={type}
            sx={{ '.MuiOutlinedInput-root fieldset': { border: label ? undefined : 'none !important' }, ...sx }}
            slotProps={{
                htmlInput: { readOnly: props.readOnly },
                formHelperText: { sx: label ? {} : { mt: -0.5, mb: 0.5 } },
            }}
            {...(rules ? { error: !!fieldState.error, helperText: fieldState.error?.message } : {})}
            {...props}
        />
    );
};

export default FormInput;
