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
import { orderServices } from '@services/orderServices';
import { useBranch } from '@src/hooks/useBranch';
import { capitalizeWords, ISOtoLocale } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AddOrderDialog from './AddOrderDialog/AddOrderDialog';

const statusMapping = {
    1: 'Pending',
    2: 'Paid',
    3: 'Completed',
    4: 'Cancelled',
};

const statusColors = {
    1: 'info',
    2: 'warning',
    3: 'success',
    4: 'error',
};

const OrderPage = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { branches } = useBranch();
    const [openAdd, setOpenAdd] = useState(false);

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: () => orderServices.getAllOrders(),
        keepPreviousData: true,
    });

    const filteredData = (data || []).filter((row) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            String(row.order.id).toLowerCase().includes(searchLower) ||
            String(row.customer_name).toLowerCase().includes(searchLower) ||
            String(row.customer_email).toLowerCase().includes(searchLower);

        const matchesStatus = statusFilter === 'all' || statusFilter === row.status;

        return matchesSearch && matchesStatus;
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
                            Orders
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ textTransform: 'none' }}
                            onClick={() => setOpenAdd(true)}
                        >
                            + Add Order
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <TextField
                            placeholder="Search orders..."
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
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value="0">Pending</MenuItem>
                            <MenuItem value="1">Paid</MenuItem>
                            <MenuItem value="2">Complete</MenuItem>
                            <MenuItem value="3">Cancelled</MenuItem>
                        </TextField>
                    </Box>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Customer Name</TableCell>
                                <TableCell align="center">Items</TableCell>
                                <TableCell align="center">Total ($)</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Pickup Location</TableCell>
                                <TableCell align="center">Order Date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ p: 4 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pageData.map(({ order, customer_name, customer_email }) => (
                                    <TableRow key={order.id}>
                                        <TableCell align="center">{order.id}</TableCell>
                                        <TableCell align="center">
                                            <Typography>{customer_name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {customer_email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>{order.items[0].product_name}</Typography>
                                            {order.items.length > 1 && (
                                                <Typography variant="body2" color="text.secondary">
                                                    +{order.items.length - 1} items
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">{order.total_price}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                size="small"
                                                variant="outlined"
                                                label={capitalizeWords(statusMapping[order.status])}
                                                color={statusColors[order.status]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>
                                                {branches.find((b) => b.id === order.branch_id)?.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {branches.find((b) => b.id === order.branch_id)?.location}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>{ISOtoLocale(order.created_at, 'date')}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {ISOtoLocale(order.created_at, 'time')}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, order.id)}>
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
                        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Edit Order</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                            Delete Order
                        </MenuItem>
                    </Menu>
                    {openAdd && (
                        <AddOrderDialog open={openAdd} onClose={() => setOpenAdd(false)} defaultValues={selectedRow} />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default OrderPage;
