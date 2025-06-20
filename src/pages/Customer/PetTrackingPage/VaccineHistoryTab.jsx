import { CalendarTodayOutlined, TaskAltOutlined, Vaccines } from '@mui/icons-material';
import {
    Box,
    Chip,
    Divider,
    Grid2,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

const VaccineHistoryTab = ({ vaccinations }) => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const upcomingVaccines = useMemo(() => {
        if (!vaccinations) return [];
        return vaccinations.filter((v) => !!v.next_dose);
    }, [vaccinations]);

    const pageData = (vaccinations ?? []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                            <Typography fontWeight={500}>{v.vaccine_name}</Typography>
                            <Chip
                                label="Up Coming"
                                size="small"
                                variant="outlined"
                                sx={{ bgcolor: '#fff7eb', color: '#e69500', borderColor: '#e69500' }}
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            <CalendarTodayOutlined sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }} />
                            {new Date(v.date).toLocaleDateString('vi-VN')}
                        </Typography>
                        <Typography variant="body2" color="error.main">
                            <CalendarTodayOutlined sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }} />
                            Due: {new Date(v.next_dose).toLocaleDateString('vi-VN')}
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
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary' }}>Vaccine Name</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Date</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Next Dose</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Veterinarian</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.vaccine_name}</TableCell>
                                <TableCell>{new Date(item.date).toLocaleDateString('vi-VN')}</TableCell>
                                <TableCell>
                                    {item.next_dose ? new Date(item.next_dose).toLocaleDateString('vi-VN') : 'None'}
                                </TableCell>
                                <TableCell>{item.vet_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={vaccinations?.length || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[2, 5, 10, 20]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
};

export default VaccineHistoryTab;
