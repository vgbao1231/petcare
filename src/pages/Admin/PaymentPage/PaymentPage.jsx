import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatCurrency } from '@src/utils/formatters';
import ConfirmDialog from '@ui/ConfirmDialog/ConfirmDialog';
import { paymentServices } from '@services/paymentServices';

const methodMap = {
    0: 'Cash',
    1: 'Bank',
};

const statusMap = {
    1: 'Pending',
    2: 'Completed',
    3: 'Failed',
    4: 'Cancelled',
};

const statusColors = {
    1: 'info',
    2: 'success',
    3: 'error',
    4: 'error',
};

const PaymentTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const queryClient = useQueryClient();

    const handleMenuOpen = (event, payment) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(payment);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: () => paymentServices.getAllPayments(),
        keepPreviousData: true,
    });

    const pageData = (data || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const { mutate: deletePayment } = useMutation({
        mutationFn: () => paymentServices.deletePayment(selectedRow?.payment_id),
        onError: () => toast.error('Xoá thanh toán thất bại'),
        onSuccess: () => {
            toast.success('Xoá thành công');
            queryClient.invalidateQueries(['payments']);
        },
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
                        <Typography variant="h6">Payments</Typography>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                            + Add Payment
                        </Button>
                    </Box>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Appointment ID</TableCell>
                                <TableCell align="center">Order ID</TableCell>
                                <TableCell align="center">Method</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Amount</TableCell>
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
                                pageData.map((payment) => (
                                    <TableRow key={payment.payment_id}>
                                        <TableCell align="center">{payment.payment_id}</TableCell>
                                        <TableCell align="center">{payment.description}</TableCell>
                                        <TableCell align="center">{payment.appointment_id || 'N/A'}</TableCell>
                                        <TableCell align="center">{payment.order_id || 'N/A'}</TableCell>
                                        <TableCell align="center">{methodMap[payment.method]}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                size="small"
                                                variant="outlined"
                                                label={statusMap[payment.status]}
                                                color={statusColors[payment.status]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{formatCurrency(payment.amount)}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={(e) => handleMenuOpen(e, payment)}>
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
                        count={(data || []).length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 20]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <Typography sx={{ px: 2, pb: 1, fontWeight: 500 }}>Actions</Typography>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>Edit Payment</MenuItem>
                        <MenuItem
                            onClick={() => {
                                setOpenConfirmDialog(true);
                                handleMenuClose();
                            }}
                            sx={{ color: 'error.main' }}
                        >
                            Delete Payment
                        </MenuItem>
                    </Menu>

                    {/* {open && <PaymentDialog open={open} onClose={() => setOpen(false)} defaultValues={selectedRow} />} */}

                    <ConfirmDialog
                        open={openConfirmDialog}
                        onClose={() => setOpenConfirmDialog(false)}
                        onConfirm={deletePayment}
                        title="Delete this payment?"
                        description="Bạn có chắc muốn xoá thanh toán này? Hành động này không thể hoàn tác."
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default PaymentTable;
