import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import MedicalCard from './MedicalCard';

const MedicalRecordTab = ({ medicalHistory }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <>
            <Typography fontSize={18} sx={{ alignSelf: 'start' }} fontWeight={500}>
                Medical Records
            </Typography>
            <Typography fontSize={14} color="text.secondary" sx={{ alignSelf: 'start', mb: 2 }}>
                Complete history of examinations and treatments
            </Typography>
            <TextField
                size="small"
                variant="outlined"
                placeholder="Search medical records..."
                fullWidth
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Stack spacing={2} mt={2}>
                {medicalHistory
                    .filter((r) => r.diagnosis.toUpperCase().includes(searchValue.toUpperCase()))
                    .map((r, i) => (
                        <MedicalCard key={i} record={r} />
                    ))}
            </Stack>
        </>
    );
};

export default MedicalRecordTab;
