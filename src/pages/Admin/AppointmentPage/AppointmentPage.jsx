import { MoreVert, Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import { useBranch } from '@src/hooks/useBranch';
import { formatUnixToLocale } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AddAppointmentDialog from './AddAppointmentDialog/AddAppointmentDialog';
import AssignStaffDialog from './AssignStaffDialog/AssignStaffDialog';

const statusColors = {
    1: 'warning',
    2: 'success',
    3: 'error',
    4: 'info',
};

const statusLabels = {
    1: 'In Progress',
    2: 'Completed',
    3: 'Cancelled',
    4: 'Pending',
};

const statusOptions = [
    { label: 'Tất cả trạng thái', value: 'all' },
    { label: 'Chờ xử lý', value: '1' },
    { label: 'Đang thực hiện', value: '2' },
    { label: 'Hoàn thành', value: '3' },
    { label: 'Đã huỷ', value: '4' },
];

const AppointmentPage = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const { branches } = useBranch();

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => appointmentServices.getAllAppointments(),
        keepPreviousData: true,
    });

    const filteredData = (data || []).filter((appointment) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            String(appointment.id).toLowerCase().includes(searchLower) ||
            String(appointment.customerName).toLowerCase().includes(searchLower) ||
            String(appointment.assignedTo || '')
                .toLowerCase()
                .includes(searchLower) ||
            String(appointment.phone).toLowerCase().includes(searchLower);

        return matchesSearch;
    });

    const pageData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box p={4}>
            <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={600}>
                            Appointments
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ textTransform: 'none' }}
                            onClick={() => setOpenAdd(true)}
                        >
                            + Add Appointment
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            placeholder="Search appointments..."
                            size="small"
                            sx={{ mr: 'auto', minWidth: 500 }}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                        <TextField select size="small" defaultValue="all">
                            {statusOptions.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField select size="small" defaultValue="all">
                            <MenuItem value="all">Tất cả chi nhánh</MenuItem>
                            <MenuItem value="Chi nhánh Quận 1">Chi nhánh Quận 1</MenuItem>
                            <MenuItem value="Chi nhánh Quận 3">Chi nhánh Quận 3</MenuItem>
                            <MenuItem value="Chi nhánh Quận 7">Chi nhánh Quận 7</MenuItem>
                        </TextField>
                    </Box>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Customer Name</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Date & Time</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Staff</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ p: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pageData.map((a) => (
                                    <TableRow key={a.appointment.id}>
                                        <TableCell align="center">{a.appointment.id}</TableCell>

                                        <TableCell align="center">
                                            <Typography>{a.customer_name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {a.customer_email}
                                            </Typography>
                                        </TableCell>

                                        {a.appointment.customer_address ? (
                                            <TableCell align="center">
                                                <Typography>{a.appointment.customer_address}</Typography>
                                            </TableCell>
                                        ) : (
                                            <TableCell align="center">
                                                <Typography>
                                                    {branches.find((b) => b.id === a.appointment.branch_id)?.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {branches.find((b) => b.id === a.appointment.branch_id)?.location}
                                                </Typography>
                                            </TableCell>
                                        )}

                                        <TableCell align="center">
                                            <Typography>
                                                {formatUnixToLocale(a.appointment.scheduled_time.seconds)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Chip
                                                size="small"
                                                variant="outlined"
                                                label={statusLabels[a.appointment.status]}
                                                color={statusColors[a.appointment.status]}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            {a.employee_name ? (
                                                <>
                                                    <Typography>{a.employee_name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {a.employee_email}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Chip size="small" variant="outlined" label="Chưa giao" color="error" />
                                            )}
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, a)}>
                                                <MoreVert fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={filteredData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[2, 5, 10, 20]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <Typography sx={{ px: 2, pb: 1, fontWeight: 500 }}>Actions</Typography>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>Edit Appointment</MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                setOpenAssign(true);
                            }}
                        >
                            Assign Staff
                        </MenuItem>
                    </Menu>
                    {openAdd && (
                        <AddAppointmentDialog
                            open={openAdd}
                            onClose={() => setOpenAdd(false)}
                            defaultValues={selectedRow?.appointment}
                        />
                    )}
                    {openAssign && (
                        <AssignStaffDialog
                            open={openAssign}
                            onClose={() => setOpenAssign(false)}
                            defaultValues={selectedRow}
                        />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default AppointmentPage;
