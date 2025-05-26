import { CalendarTodayOutlined, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Collapse, Typography, useTheme } from '@mui/material';
import { Stethoscope, Syringe } from 'lucide-react';
import { useState } from 'react';

const MedicalCard = ({ record }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
            {/* Card Content */}
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 3 }} onClick={() => setOpen(!open)}>
                <Box
                    sx={{
                        bgcolor: 'primary.bgcolor',
                        p: 1,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                    }}
                >
                    {record.diagnosis === 'Vaccination' ? (
                        <Syringe color={theme.palette.primary.light} size={20} />
                    ) : (
                        <Stethoscope color={theme.palette.primary.light} size={20} />
                    )}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={500}>{record.diagnosis}</Typography>

                    <Typography variant="body2" color="text.secondary">
                        <CalendarTodayOutlined sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }} />
                        {new Date(record.date).toLocaleDateString('vi-VN')}
                    </Typography>
                </Box>
                <Button size="small" color="common" sx={{ textTransform: 'none', minWidth: 0 }}>
                    <KeyboardArrowDown sx={{ transition: '0.3s', transform: open && 'rotate(180deg)' }} />
                </Button>
            </Box>

            {/* Card Details */}
            <Collapse in={open}>
                <Box pl={9} pb={2}>
                    <Typography variant="body2" color="text.secondary">
                        Treatment
                    </Typography>
                    <Typography>{record.treatment}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Veterinarian
                    </Typography>
                    <Typography>{record.vet}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Note
                    </Typography>
                    <Typography>{record.note}</Typography>
                </Box>
            </Collapse>
        </Box>
    );
};

export default MedicalCard;
