import { AttachFile, Diamond, Fastfood, MedicationLiquid, MoreVert, Search } from '@mui/icons-material';
import {
    Avatar,
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
import { productServices } from '@services/productServices';
import { useBranch } from '@src/hooks/useBranch';
import { textEllipsisSx } from '@src/theme';
import { capitalizeWords, formatCurrency } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EditProductDialog from './EditProductDialog';

const statusOptions = [
    { label: 'All Products', value: 'all' },
    { label: 'Attachable Only', value: 'attachable' },
    { label: 'Non-Attachable Only', value: 'non-attachable' },
];

const statusColors = {
    'In Stock': 'success',
    'Low Stock': 'warning',
    'Out of Stock': 'error',
};

const productTypesIcon = {
    food: Fastfood,
    medicine: MedicationLiquid,
    accessory: Diamond,
};

const ProductTable = () => {
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [branchFilter, setBranchFilter] = useState('all');
    const [attachableFilter, setAttachableFilter] = useState('all');
    const [openAdd, setOpenAdd] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const { branches } = useBranch();

    const handleMenuOpen = (event, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => productServices.getAllProductWithStock(),
        keepPreviousData: true,
    });

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = (data || []).filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            String(product.id).toLowerCase().includes(searchLower) ||
            String(product.name).toLowerCase().includes(searchLower) ||
            String(product.description).toLowerCase().includes(searchLower) ||
            String(product.product_type).toLowerCase().includes(searchLower);

        const matchesType = typeFilter === 'all' || product.product_type === typeFilter;

        const matchesAttachable =
            attachableFilter === 'all' ||
            (attachableFilter === 'attachable' && product.isAttachable) ||
            (attachableFilter === 'non-attachable' && !product.isAttachable);

        return matchesSearch && matchesType && matchesAttachable;
    });

    const pageData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Get total stock across all branches
    const getTotalStock = (p) => {
        return (p.inventory || []).reduce((total, inv) => total + inv.quantity, 0);
    };

    // Get current branch stock or total if "all" is selected
    const getCurrentStock = (p) => {
        if (branchFilter === 'all') {
            return getTotalStock(p);
        }
        const branchInventory = (p.inventory || []).find((inv) => inv.branch_id === branchFilter);
        return branchInventory ? branchInventory.quantity : 0;
    };

    // Get current stock status
    const getCurrentStockStatus = (p) => {
        if (branchFilter === 'all') {
            const totalStock = getTotalStock(p);
            if (totalStock <= 0) return 'Out of Stock';
            if (totalStock < 50) return 'Low Stock';
            return 'In Stock';
        } else {
            const branchInventory = (p.inventory || []).find((inv) => inv.branch_id === branchFilter);
            if (!branchInventory) return 'Out of Stock';

            const stock = branchInventory.quantity;
            if (stock <= 0) return 'Out of Stock';
            if (stock < 10) return 'Low Stock';
            return 'In Stock';
        }
    };

    return (
        <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Products</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={() => setOpenAdd(true)}
                    >
                        + Add Product
                    </Button>
                </Box>

                <Box display="flex" gap={2} mb={2} flexWrap="wrap">
                    <TextField select size="small" defaultValue="all" onChange={(e) => setBranchFilter(e.target.value)}>
                        <MenuItem value="all">All Branches (Total)</MenuItem>
                        {branches.map((opt) => (
                            <MenuItem key={opt.id} value={opt.id}>
                                {opt.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField select size="small" defaultValue="all" onChange={(e) => setTypeFilter(e.target.value)}>
                        <MenuItem value="all">All Types</MenuItem>
                        <MenuItem value="food">Food</MenuItem>
                        <MenuItem value="accessory">Accessory</MenuItem>
                        <MenuItem value="medicine">Medicine</MenuItem>
                    </TextField>
                    <TextField
                        select
                        size="small"
                        defaultValue="all"
                        onChange={(e) => setAttachableFilter(e.target.value)}
                    >
                        {statusOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        placeholder="Search products..."
                        size="small"
                        sx={{ ml: 'auto' }}
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
                </Box>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Attachable</TableCell>
                            <TableCell align="center">Total Stock</TableCell>
                            <TableCell align="center">Status</TableCell>
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
                            pageData.map((p) => {
                                const IconComponent = productTypesIcon[p.product_type];
                                return (
                                    <TableRow key={p.product_id}>
                                        <TableCell align="center">{p.product_id}</TableCell>
                                        <TableCell sx={{ maxWidth: 280 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{ width: 48, height: 48, mr: 2 }}
                                                    src={p.imgurl}
                                                />
                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Typography sx={textEllipsisSx}>{p.name}</Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={textEllipsisSx}
                                                    >
                                                        {p.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                icon={<IconComponent fontSize="small" />}
                                                label={capitalizeWords(p.product_type)}
                                                size="small"
                                                variant="outlined"
                                                sx={{ p: 1 }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" fontWeight={600}>
                                            {formatCurrency(p.price)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {p.is_attachable ? (
                                                <Chip
                                                    icon={<AttachFile fontSize="small" />}
                                                    label="Yes"
                                                    color="success"
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ p: 1 }}
                                                />
                                            ) : (
                                                <Chip label="No" variant="outlined" size="small" />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>{getCurrentStock(p)} units</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                sx={{ p: 1 }}
                                                label={getCurrentStockStatus(p)}
                                                size="small"
                                                color={statusColors[getCurrentStockStatus(p)]}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, p)}>
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
                            setOpenDetail(true);
                            handleMenuClose();
                        }}
                    >
                        Edit Product
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                        Delete Product
                    </MenuItem>
                </Menu>
                {openDetail && (
                    <EditProductDialog
                        open={openDetail}
                        onClose={() => setOpenDetail(false)}
                        product={selectedProduct}
                    />
                )}
                {openAdd && <EditProductDialog open={openAdd} onClose={() => setOpenAdd(false)} />}
            </CardContent>
        </Card>
    );
};

export default ProductTable;
