import { MoreVert, Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
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
import { userServices } from '@services/userServices';
import { useBranch } from '@src/hooks/useBranch';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EditUserDialog from './EditUserDialog';
import AddUserDialog from './AddUserDialog';

// Chuyển role id thành tên role nếu cần
const ROLE_MAP = {
    3: 'Admin',
    2: 'Employee',
    1: 'Customer',
};

const UserPage = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [branchFilter, setBranchFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { branches } = useBranch();

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => userServices.getAllUserWithRole(),
        keepPreviousData: true,
    });

    const filteredData = (data || []).filter((user) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            String(user.userId).toLowerCase().includes(searchLower) ||
            String(user.name).toLowerCase().includes(searchLower) ||
            String(user.email).toLowerCase().includes(searchLower) ||
            String(user.phoneNumber).toLowerCase().includes(searchLower);

        const matchesBranch = branchFilter === 'all' || branchFilter === user.branchId;
        const matchesRole = roleFilter === 'all' || roleFilter === ROLE_MAP[user.roleId];

        return matchesSearch && matchesBranch && matchesRole;
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
                            Users
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ textTransform: 'none' }}
                            onClick={() => setOpenAdd(true)}
                        >
                            + Add User
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            placeholder="Search users..."
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
                        <TextField
                            select
                            size="small"
                            defaultValue="all"
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Role</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Employee">Employee</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                        </TextField>
                        <TextField
                            select
                            size="small"
                            defaultValue="all"
                            onChange={(e) => setBranchFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Branches</MenuItem>
                            {branches.map((branch) => (
                                <MenuItem key={branch.id} value={branch.id}>
                                    {branch.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Branch</TableCell>
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
                                pageData.map((user) => (
                                    <TableRow key={user.userId}>
                                        <TableCell align="center">{user.userId}</TableCell>
                                        <TableCell align="center">{user.name}</TableCell>
                                        <TableCell align="center">{ROLE_MAP[user.roleId]}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.address || 'None'}</TableCell>
                                        <TableCell align="center">{user.phoneNumber || 'None'}</TableCell>
                                        <TableCell align="center">
                                            {user.branchId === 0 ? (
                                                'None'
                                            ) : (
                                                <>
                                                    <Typography>
                                                        {branches.find((b) => b.id === user.branchId)?.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {branches.find((b) => b.id === user.branchId)?.location}
                                                    </Typography>
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
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
                        <MenuItem
                            onClick={() => {
                                setOpenEdit(true);
                                handleMenuClose();
                            }}
                        >
                            Edit User
                        </MenuItem>
                    </Menu>
                    {openEdit && (
                        <EditUserDialog
                            open={openEdit}
                            onClose={() => setOpenEdit(false)}
                            defaultValues={selectedRow}
                        />
                    )}
                    {openAdd && (
                        <AddUserDialog open={openAdd} onClose={() => setOpenAdd(false)} defaultValues={selectedRow} />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserPage;
