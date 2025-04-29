import { TextField, Autocomplete } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { useMemo, useCallback, useState } from 'react';

const FormSelect = ({ name, label, rules, defaultValue, options, valueRepeat, multiple, sx, ...rest }) => {
    const { onChange, onBlur, getOptionLookup = (v) => v, noBorder, ...props } = rest;
    const { control } = useFormContext();
    const { field, fieldState } = useController({
        name,
        control,
        rules,
        defaultValue: defaultValue ?? (multiple ? [] : options[0]?.value || ''),
    });
    const [open, setOpen] = useState(false);

    const optionLookup = useMemo(() => {
        return options.reduce((acc, option) => {
            acc[option.value] = option.label;
            return acc;
        }, {});
    }, [options]);

    const selectedOptions = useMemo(() => {
        // Select thông thường
        if (!multiple) return { value: field.value, label: optionLookup[field.value] ?? field.value };
        // Multi select và option có thể lặp lại
        else if (valueRepeat) return field.value.map((value) => ({ value, label: optionLookup[value] ?? value }));
        // Multi select và option không thể lặp lại
        else return options.filter((option) => field.value.includes(option.value));
    }, [field.value, optionLookup, options, valueRepeat, multiple]);

    const handleChange = useCallback(
        (e, newValue) => {
            const value = multiple ? newValue.map((v) => v.value) : newValue?.value;
            field.onChange(value);
            onChange?.(e, value);
        },
        [field, onChange, multiple]
    );

    const handleBlur = useCallback(
        (e) => {
            field.onBlur(e);
            onBlur?.(e);
        },
        [field, onBlur]
    );

    getOptionLookup(optionLookup);

    return (
        <Autocomplete
            size="small"
            multiple={multiple}
            options={options}
            value={selectedOptions}
            isOptionEqualToValue={(option, value) => (valueRepeat ? false : option === value)}
            onChange={handleChange}
            onBlur={handleBlur}
            open={open}
            onOpen={() => !props.readOnly && setOpen(true)}
            onClose={() => setOpen(false)}
            renderInput={(params) => (
                <TextField
                    inputRef={field.ref}
                    {...params}
                    label={label}
                    {...(rules && !props.readOnly
                        ? { error: !!fieldState.error, helperText: fieldState.error?.message }
                        : {})}
                    slotProps={{
                        formHelperText: { sx: noBorder ? { mt: -0.5, mb: 0.5 } : {} },
                    }}
                    sx={{ minWidth: 120, ...(!open ? AutocompleteInputSx : {}) }}
                    {...props}
                />
            )}
            slotProps={{ chip: { variant: 'outlined', color: fieldState.error ? 'error' : 'primary' } }}
            sx={{ '.MuiOutlinedInput-root fieldset': { border: noBorder ? 'none' : undefined }, ...sx }}
            forcePopupIcon={!props.readOnly}
            {...props}
        />
    );
};

// Sx khi ko mở dropdown
const AutocompleteInputSx = {
    '.MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
        minWidth: '1px !important',
        paddingLeft: '4px !important',
    },
};

export default FormSelect;
