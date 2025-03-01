import { useCallback } from 'react';
import { Chip } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

function FormChip({
    name,
    checkedLabel,
    unCheckedLabel,
    checkedColor = 'success',
    unCheckedColor = 'error',
    defaultValue = false,
    ...props
}) {
    const { control } = useFormContext();
    const {
        field: { value, onChange },
    } = useController({ name, control, defaultValue });

    const handleToggle = useCallback(() => {
        !props.readOnly && onChange(!value);
    }, [onChange, value, props.readOnly]);

    return (
        <Chip
            size="small"
            label={value ? checkedLabel : unCheckedLabel}
            color={value ? checkedColor : unCheckedColor}
            {...(props.readOnly ? {} : { onClick: handleToggle })}
            sx={{ cursor: 'pointer' }}
            {...props}
        />
    );
}

export default FormChip;
