import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import ExaminationCard from './ExaminationCard';

const ExaminationRecordTab = ({ examinationHistory }) => {
    const [searchValue, setSearchValue] = useState('');

    // Đảm bảo examinationHistory là mảng
    const filteredHistory = useMemo(() => {
        if (!Array.isArray(examinationHistory)) return [];
        return examinationHistory.filter((r) => r.diagnosis?.toUpperCase().includes(searchValue.toUpperCase()));
    }, [examinationHistory, searchValue]);

    return (
        <>
            <Typography fontSize={18} sx={{ alignSelf: 'start' }} fontWeight={500}>
                Examination Records
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
                {filteredHistory.length === 0 ? (
                    <Typography color="text.secondary">No records found.</Typography>
                ) : (
                    filteredHistory.map((r, i) => <ExaminationCard key={i} record={r} />)
                )}
            </Stack>
        </>
    );
};

export default ExaminationRecordTab;
