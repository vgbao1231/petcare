import { CalendarTodayOutlined, TaskAltOutlined, Vaccines } from '@mui/icons-material';
import {
    Box,
    Chip,
    Divider,
    Grid2,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

const VaccineHistoryTab = ({ upcomingVaccines, vaccinationHistory }) => {
    console.log(vaccinationHistory);

    return (
        <>
            <Typography fontSize={18} sx={{ alignSelf: 'start' }} fontWeight={500}>
                Vaccination History
            </Typography>
            <Typography fontSize={14} color="text.secondary" sx={{ alignSelf: 'start', mb: 2 }}>
                Complete vaccination history and upcoming schedule
            </Typography>
            <Typography fontSize={18} mb={2}>
                <Vaccines fontSize="small" color="primary" sx={{ mr: 1 }} />
                Upcoming Vaccinations
            </Typography>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {upcomingVaccines.map((v, i) => (
                    <Grid2 key={i} size={6} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontWeight={500}>{v.vaccine}</Typography>
                            <Chip
                                label="Up Coming"
                                size="small"
                                variant="outlined"
                                sx={{ bgcolor: '#fff7eb', color: '#e69500', borderColor: '#e69500' }}
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            <CalendarTodayOutlined sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }} />
                            {new Date(v.lastVaccinatedDate).toLocaleDateString('vi-VN')}
                        </Typography>
                        <Typography variant="body2" color="error.main">
                            <CalendarTodayOutlined sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }} />
                            Due: {new Date(v.date).toLocaleDateString('vi-VN')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Annual booster required by law
                        </Typography>
                    </Grid2>
                ))}
            </Grid2>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <TaskAltOutlined fontSize="small" sx={{ color: 'success.main', mr: 1 }} />
                    <Typography fontSize={18} fontWeight={500}>
                        Vaccination History
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary' }}>Date</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Vaccine</TableCell>
                                <TableCell sx={{ color: 'text.secondary', textAlign: 'center' }}>Status</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vaccinationHistory.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.treatment}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Chip
                                            size="small"
                                            label="Completed"
                                            variant="outlined"
                                            sx={{ color: 'success.dark', bgcolor: 'success.bgcolor' }}
                                        />
                                    </TableCell>
                                    <TableCell>{item.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default VaccineHistoryTab;
