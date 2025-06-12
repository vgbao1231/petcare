import { MoreVert } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
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
import { serviceServices } from '@services/serviceServices';
import { textEllipsisSx } from '@src/theme';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ServiceDialog from './ServiceDialog';
import ConfirmDialog from '@ui/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';
import { formatCurrency } from '@src/utils/formatters';

const ServiceTable = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState();
    const [open, setOpen] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const queryClient = useQueryClient();

    const handleMenuOpen = (event, service) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(service);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: () => serviceServices.getAllServices(),
        keepPreviousData: true,
    });

    const { mutate: deleteService } = useMutation({
        mutationFn: () => serviceServices.deleteService(selectedRow?.serviceId),
        onError: () => toast.error('Failed to delete service'),
        onSuccess: () => {
            toast.success('Delete service successfully');
            queryClient.invalidateQueries(['services']);
        },
    });

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const pageData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Services</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={() => {
                            setSelectedRow();
                            setOpen(true);
                        }}
                    >
                        + Add Service
                    </Button>
                </Box>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Service</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ p: 4 }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            pageData.map((s) => {
                                return (
                                    <TableRow key={s.serviceId}>
                                        <TableCell align="center">{s.serviceId}</TableCell>
                                        <TableCell sx={{ maxWidth: 280 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{ width: 48, height: 48, mr: 2 }}
                                                    src={s.imgUrl}
                                                />
                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Typography sx={textEllipsisSx}>{s.name}</Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={textEllipsisSx}
                                                    >
                                                        {s.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">{formatCurrency(s.price)}</TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, s)}>
                                                <MoreVert fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={data.length}
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
                            setOpen(true);
                            handleMenuClose();
                        }}
                    >
                        Edit Service
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setOpenConfirmDialog(true);
                            handleMenuClose();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        Delete Service
                    </MenuItem>
                </Menu>
                {open && <ServiceDialog open={open} onClose={() => setOpen(false)} defaultValues={selectedRow} />}
                <ConfirmDialog
                    open={openConfirmDialog}
                    onClose={() => setOpenConfirmDialog(false)}
                    onConfirm={deleteService}
                    title="Delete this service?"
                    description="Do you really want to delete this service? This action cannot be undone."
                />
            </CardContent>
        </Card>
    );
};

export default ServiceTable;
