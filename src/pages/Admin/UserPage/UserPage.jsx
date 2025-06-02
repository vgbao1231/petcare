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
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const users = [
    {
        id: 'USR001',
        name: 'Dr. John Smith',
        role: '2',
        email: 'john.smith@petcare.com',
        phone: '+1-555-1234',
        status: 'Active',
    },
    {
        id: 'USR002',
        name: 'Sarah Johnson',
        role: '2',
        email: 'sarah.j@petcare.com',
        phone: '+1-555-5678',
        status: 'Active',
    },
    {
        id: 'USR003',
        name: 'Michael Brown',
        role: '1',
        email: 'michael.b@petcare.com',
        phone: '+1-555-8765',
        status: 'Active',
    },
    {
        id: 'USR004',
        name: 'Emily Davis',
        role: '2',
        email: 'emily.d@petcare.com',
        phone: '+1-555-4321',
        status: 'Inactive',
    },
    {
        id: 'USR005',
        name: 'Robert Wilson',
        role: '2',
        email: 'robert.w@petcare.com',
        phone: '+1-555-7890',
        status: 'Active',
    },
];

// Chuyển role id thành tên role nếu cần
const ROLE_MAP = {
    1: 'Admin',
    2: 'Veterinarian',
};

const fetchUsers = ({ page = 1, limit = 10 }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedUsers = users.slice(start, end).map((u) => ({
                ...u,
                role: ROLE_MAP[u.role] || u.role,
            }));
            resolve({
                data: paginatedUsers,
                total: users.length,
                page,
                limit,
            });
        }, 400); // delay mô phỏng
    });
};

const UserPage = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['users', page, rowsPerPage],
        queryFn: () => fetchUsers({ page: page + 1, limit: rowsPerPage }),
        keepPreviousData: true,
    });

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
                            Users
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <TextField
                                size="small"
                                placeholder="Search users..."
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    },
                                    htmlInput: { sx: { py: 0.6 } },
                                }}
                            />
                            <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                                + Add User
                            </Button>
                        </Box>
                    </Box>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Status</TableCell>
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
                                data?.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align="center">{user.id}</TableCell>
                                        <TableCell align="center">{user.name}</TableCell>
                                        <TableCell align="center">{user.role}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.phone}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                size="small"
                                                label={user.status}
                                                color={user.status === 'Active' ? 'success' : 'error'}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, user.id)}>
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
                        count={data?.total || 0}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[2, 5, 10, 20]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <Typography sx={{ px: 2, pb: 1, fontWeight: 500 }}>Actions</Typography>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Edit User</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose} sx={{ color: 'red' }}>
                            Deactivate User
                        </MenuItem>
                    </Menu>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserPage;
