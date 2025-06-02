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
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { capitalizeWords, ISOtoLocale } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const statusColors = {
    PENDING: 'info',
    PAID: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'error',
};

const orders = [
    {
        id: 1,
        customerId: 101,
        branchId: 1,
        appointmentId: 201,
        totalPrice: 1200000,
        status: 'COMPLETED',
        createdAt: '2025-05-20T08:15:00Z',
        updatedAt: '2025-05-20T10:00:00Z',
        location: '123 Lý Thường Kiệt, Q.10, TP.HCM',
        items: [
            {
                orderId: 1,
                productId: 501,
                productType: 'service',
                quantity: 1,
                unitPrice: 800000,
                productName: 'Gói khám tổng quát',
            },
            {
                orderId: 1,
                productId: 502,
                productType: 'service',
                quantity: 1,
                unitPrice: 400000,
                productName: 'Xét nghiệm máu',
            },
        ],
    },
    {
        id: 2,
        customerId: 102,
        branchId: 2,
        appointmentId: null,
        totalPrice: 600000,
        status: 'PENDING',
        createdAt: '2025-05-25T10:45:00Z',
        updatedAt: '2025-05-25T10:45:00Z',
        location: '234 Nguyễn Trãi, Q.5, TP.HCM',
        items: [
            {
                orderId: 2,
                productId: 503,
                productType: 'service',
                quantity: 1,
                unitPrice: 600000,
                productName: 'Gói xét nghiệm máu',
            },
        ],
    },
    {
        id: 3,
        customerId: 103,
        branchId: 1,
        appointmentId: 202,
        totalPrice: 850000,
        status: 'PAID',
        createdAt: '2025-05-27T09:00:00Z',
        updatedAt: '2025-05-27T10:00:00Z',
        location: '456 CMT8, Q.3, TP.HCM',
        items: [
            {
                orderId: 3,
                productId: 504,
                productType: 'service',
                quantity: 1,
                unitPrice: 850000,
                productName: 'Khám chuyên khoa nội',
            },
            {
                orderId: 3,
                productId: 505,
                productType: 'service',
                quantity: 1,
                unitPrice: 500000,
                productName: 'Tư vấn dinh dưỡng',
            },
        ],
    },
    {
        id: 4,
        customerId: 104,
        branchId: 3,
        appointmentId: 203,
        totalPrice: 500000,
        status: 'CANCELLED',
        createdAt: '2025-05-18T14:30:00Z',
        updatedAt: '2025-05-19T08:00:00Z',
        location: '789 Trường Chinh, Q.Tân Bình, TP.HCM',
        items: [
            {
                orderId: 4,
                productId: 505,
                productType: 'service',
                quantity: 1,
                unitPrice: 500000,
                productName: 'Tư vấn dinh dưỡng',
            },
        ],
    },
    {
        id: 5,
        customerId: 105,
        branchId: 1,
        appointmentId: 204,
        totalPrice: 2500000,
        status: 'COMPLETED',
        createdAt: '2025-05-22T16:00:00Z',
        updatedAt: '2025-05-23T08:00:00Z',
        location: '101 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
        items: [
            {
                orderId: 5,
                productId: 506,
                productType: 'service',
                quantity: 1,
                unitPrice: 2500000,
                productName: 'Gói khám VIP',
            },
        ],
    },
];

const statusOptions = [
    { label: 'Tất cả trạng thái', value: 'all' },
    { label: 'Chờ xử lý', value: 'PENDING' },
    { label: 'Đã thanh toán', value: 'PAID' },
    { label: 'Hoàn thành', value: 'COMPLETED' },
    { label: 'Đã huỷ', value: 'CANCELLED' },
];

const fetchOrders = ({ page = 1, limit = 10 }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedOrders = orders.slice(start, end);
            resolve({
                data: paginatedOrders,
                total: orders.length,
                page,
                limit,
            });
        }, 400); // delay mô phỏng
    });
};

const OrderPage = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrder(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedOrder(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['orders', page, rowsPerPage],
        queryFn: () => fetchOrders({ page: page + 1, limit: rowsPerPage }),
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
                            Orders
                        </Typography>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                            + Add Order
                        </Button>
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            placeholder="Tìm theo tên, số điện thoại, ID..."
                            size="small"
                            sx={{ flex: 1 }}
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
                    </Stack>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Customer Name</TableCell>
                                <TableCell align="center">Items</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Location</TableCell>
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
                                data?.data.map((o) => (
                                    <TableRow key={o.id}>
                                        <TableCell align="center">{o.id}</TableCell>
                                        <TableCell align="center">
                                            <Typography>{o.customerId}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {o.customerId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>{o.items[0].productName}</Typography>
                                            {o.items.length - 1 !== 0 && (
                                                <Typography variant="body2" color="text.secondary">
                                                    +{o.items.length - 1} items
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">{o.totalPrice}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                size="small"
                                                variant="outlined"
                                                label={capitalizeWords(o.status)}
                                                color={statusColors[o.status]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{o.branch ? o.branch : o.location}</TableCell>
                                        <TableCell align="center">{ISOtoLocale(o.createdAt)}</TableCell>

                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, o.id)}>
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
                        <MenuItem onClick={handleMenuClose}>Edit Order</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Assign Staff</MenuItem>
                    </Menu>
                </CardContent>
            </Card>
        </Box>
    );
};

export default OrderPage;
