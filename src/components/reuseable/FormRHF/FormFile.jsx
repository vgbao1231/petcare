import { useController, useFormContext } from 'react-hook-form';
import { memo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const FormInput = ({
    name,
    label = 'Upload',
    accept = '*',
    rules,
    sx,
    onFileChange,
    multiple,
    showFileName,
    ...rest
}) => {
    const { control } = useFormContext();
    const {
        field: { onChange },
        fieldState: { error },
    } = useController({ name, control, rules });
    const [fileNames, setFileNames] = useState([]);

    const handleChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            setFileNames(files.map((f) => f.name));
            onChange(multiple ? files : files[0]);
            onFileChange?.(multiple ? files : files[0]);
        }
    };

    return (
        <>
            <Button component="label" sx={sx} {...rest}>
                {label}
                <input type="file" accept={accept} hidden multiple={multiple} onChange={handleChange} />
            </Button>

            {showFileName && fileNames.length > 0 && (
                <Box sx={{ mt: 1 }}>
                    {fileNames.map((name, idx) => (
                        <Typography key={idx} variant="body2">
                            {name}
                        </Typography>
                    ))}
                </Box>
            )}
            {error && (
                <Typography color="error" variant="caption">
                    {error.message}
                </Typography>
            )}
        </>
    );
};

export default memo(FormInput);
