import { useController, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AccessTime } from '@mui/icons-material';

const FormInput = ({
    name,
    label,
    rules,
    type,
    defaultValue = '',
    formatValue = (v) => v,
    formatOnBlur,
    sx,
    slotProps,
    ...rest
}) => {
    const { onChange, onBlur, ...props } = rest;
    const { control } = useFormContext();
    const { field, fieldState } = useController({ name, control, rules, defaultValue: formatValue(defaultValue) });

    const handleChange = useCallback(
        (e) => {
            if (!formatOnBlur && e?.target?.value) e.target.value = formatValue(e.target.value);
            field.onChange(e);
            onChange?.(e);
        },
        [field, formatOnBlur, formatValue, onChange]
    );

    const handleBlur = useCallback(
        (e) => {
            if (formatOnBlur && e?.target?.value) {
                e.target.value = formatValue(e.target.value);
                field.onChange(e);
            }
            field.onBlur(e);
            onBlur?.(e);
        },
        [field, formatOnBlur, formatValue, onBlur]
    );

    if (type === 'time') {
        console.log(dayjs(field.value).format('HH:mm'));

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    value={dayjs(field.value)}
                    inputRef={field.ref}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={label}
                    type={type}
                    skipDisabled
                    minutesStep={props.minutesStep}
                    sx={{
                        '.MuiOutlinedInput-root fieldset': { border: label ? undefined : 'none !important' },
                        ...sx,
                    }}
                    slots={{
                        openPickerIcon: () => <AccessTime fontSize="small" />,
                    }}
                    slotProps={{
                        textField: {
                            size: 'small',
                            sx: {
                                '& .MuiFormHelperText-root': label
                                    ? { fontSize: 14 }
                                    : { fontSize: 14, mt: -0.5, mb: 0.5 },
                                '& .MuiOutlinedInput-root': { pr: '18px' },
                                ...sx,
                            },
                            slotProps: {
                                ...slotProps,
                                htmlInput: { readOnly: props.readOnly, ...slotProps?.htmlInput },
                            },
                            ...(rules ? { error: !!fieldState.error, helperText: fieldState.error?.message } : {}),
                            ...props,
                        },
                    }}
                />
            </LocalizationProvider>
        );
    }

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
                ...slotProps,
                htmlInput: { readOnly: props.readOnly, ...slotProps?.htmlInput },
                formHelperText: { sx: label ? { fontSize: '14px' } : { fontSize: '14px', mt: -0.5, mb: 0.5 } },
            }}
            {...(rules ? { error: !!fieldState.error, helperText: fieldState.error?.message } : {})}
            {...props}
        />
    );
};

export default FormInput;
