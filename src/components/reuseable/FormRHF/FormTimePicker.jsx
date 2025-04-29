import { useController, useFormContext } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AccessTime } from '@mui/icons-material';

const FormTimePicker = ({
    name,
    label,
    rules,
    type,
    defaultValue = '',
    formatValue = (v) => v,
    formatOnBlur,
    sx,
    slotProps,
    noBorder,
    ...rest
}) => {
    const { onChange, onBlur, ...props } = rest;
    const { control } = useFormContext();
    const { field, fieldState } = useController({ name, control, rules, defaultValue: formatValue(defaultValue) });
    const [error, setError] = useState(null);

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

    const CompoType = useMemo(() => {
        if (type === 'datetime') {
            return DateTimePicker;
        } else if (type === 'date') {
            return DatePicker;
        } else return TimePicker;
    }, [type]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CompoType
                value={field.value ? dayjs(field.value) : null}
                inputRef={field.ref}
                onChange={handleChange}
                onBlur={handleBlur}
                label={label}
                skipDisabled
                onError={setError}
                slots={{ openPickerIcon: () => <AccessTime fontSize="small" /> }}
                slotProps={{
                    textField: {
                        size: 'small',
                        sx: {
                            '& .MuiFormHelperText-root': {
                                fontSize: '0.875rem',
                                ...(label ? {} : { mt: -0.5, mb: 0.5 }),
                            },
                            '& fieldset': { border: noBorder ? 'none !important' : undefined },
                            ...sx,
                        },
                        slotProps: {
                            ...slotProps,
                            htmlInput: { readOnly: props.readOnly, ...slotProps?.htmlInput },
                        },
                        error: !!fieldState.error || !!error,
                        helperText: fieldState.error?.message || (error ? 'Time is not valid' : ''),
                        ...props,
                    },
                }}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default FormTimePicker;
