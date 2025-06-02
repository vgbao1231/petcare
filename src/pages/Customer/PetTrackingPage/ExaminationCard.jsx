import { CalendarTodayOutlined, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Collapse, Grid2, Typography, useTheme } from '@mui/material';
import { prescriptionServices } from '@services/prescriptionServices';
import { centerSx } from '@src/theme';
import { useQuery } from '@tanstack/react-query';
import { Stethoscope, Syringe } from 'lucide-react';
import { useState } from 'react';

const ExaminationCard = ({ record }) => {
    const [open, setOpen] = useState(false);
    const [openPrescription, setOpenPrescription] = useState(false);
    const theme = useTheme();

    const { data: prescriptions } = useQuery({
        queryKey: ['prescription', record.id],
        queryFn: () => prescriptionServices.getPrescriptionsByExaminationId(record.id),
        enabled: !!record.id,
    });

    const { medications } = prescriptions ?? [];

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
                <Box pl={9} pb={2} pr={3}>
                    <Typography variant="body2" color="text.secondary">
                        Veterinarian
                    </Typography>
                    <Typography>{record.vet_name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Notes
                    </Typography>
                    <Typography>{record.notes}</Typography>
                    {prescriptions && (
                        <>
                            <Box sx={{ ...centerSx, justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Prescription Details
                                </Typography>
                                <Button
                                    size="small"
                                    color="common"
                                    variant="outlined"
                                    sx={{ textTransform: 'none', minWidth: 0 }}
                                    startIcon={
                                        <KeyboardArrowDown
                                            sx={{ transition: '0.3s', transform: openPrescription && 'rotate(180deg)' }}
                                        />
                                    }
                                    onClick={() => setOpenPrescription(!openPrescription)}
                                >
                                    {openPrescription ? 'Hide' : 'View'} Details
                                </Button>
                            </Box>
                            <Collapse in={openPrescription}>
                                <Grid2 container rowSpacing={2} columnSpacing={4}>
                                    {medications.map((m, i) => (
                                        <Grid2
                                            size={6}
                                            key={i}
                                            sx={{
                                                border: 1,
                                                borderColor: 'divider',
                                                borderRadius: 2,
                                                p: 2,
                                            }}
                                        >
                                            <Box sx={{ ...centerSx, justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography color="primary" fontWeight={600}>
                                                        {m.name}
                                                    </Typography>
                                                    <Typography variant="body2">Dosage: {m.dosage}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2">Start Date: {m.start_date}</Typography>
                                                    <Typography variant="body2">End Date: {m.end_date}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Collapse>
                        </>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};

export default ExaminationCard;
