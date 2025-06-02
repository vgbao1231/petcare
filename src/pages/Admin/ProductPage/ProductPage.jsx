import { AttachFile, Diamond, Fastfood, MedicationLiquid, MoreVert, Search } from '@mui/icons-material';
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
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { capitalizeWords } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const products = [
    {
        id: 'PRD001',
        name: 'Premium Dog Food',
        description: 'High-quality dog food with balanced nutrition for adult dogs',
        price: 45.99,
        image: '/placeholder.svg?height=80&width=80',
        productType: 'Food',
        isAttachable: false,
        inventory: [
            { branchId: 'BR001', stock: 120 },
            { branchId: 'BR002', stock: 85 },
            { branchId: 'BR003', stock: 65 },
            { branchId: 'BR004', stock: 0 },
            { branchId: 'BR005', stock: 30 },
        ],
    },
    {
        id: 'PRD002',
        name: 'Cat Litter Box',
        description: 'Spacious and easy to clean litter box for cats',
        price: 29.99,
        image: '/placeholder.svg?height=80&width=80',
        productType: 'Accessories',
        isAttachable: false,
        inventory: [],
    },
    {
        id: 'PRD003',
        name: 'Pet Shampoo',
        description: 'Gentle shampoo for all pet types, with natural ingredients',
        price: 12.5,
        image: '/placeholder.svg?height=80&width=80',
        productType: 'Accessories',
        isAttachable: true,
        inventory: [
            { branchId: 'BR001', stock: 80 },
            { branchId: 'BR002', stock: 65 },
            { branchId: 'BR003', stock: 50 },
            { branchId: 'BR004', stock: 35 },
            { branchId: 'BR005', stock: 20 },
        ],
    },
    {
        id: 'PRD004',
        name: 'Dog Collar',
        description: 'Adjustable collar for medium to large dogs',
        price: 15.99,
        image: '/placeholder.svg?height=80&width=80',
        productType: 'Accessories',
        isAttachable: false,
        inventory: [
            { branchId: 'BR001', stock: 60 },
            { branchId: 'BR002', stock: 40 },
            { branchId: 'BR003', stock: 35 },
            { branchId: 'BR004', stock: 25 },
            { branchId: 'BR005', stock: 15 },
        ],
    },
    {
        id: 'PRD005',
        name: 'Bird Cage',
        description: 'Spacious cage for small to medium birds',
        price: 89.99,
        image: '/placeholder.svg?height=80&width=80',
        productType: 'Accessories',
        isAttachable: false,
        inventory: [
            { branchId: 'BR001', stock: 10 },
            { branchId: 'BR002', stock: 8 },
            { branchId: 'BR003', stock: 5 },
            { branchId: 'BR004', stock: 3 },
            { branchId: 'BR005', stock: 0 },
        ],
    },
    {
        id: 'PRD006',
        name: 'Flea Treatment',
        description: 'Effective treatment for fleas and ticks',
        price: 22.5,
        image: '/placeholder.svg?height=80&width=80',
        productType: 'Medicine',
        isAttachable: true,
        inventory: [
            { branchId: 'BR001', stock: 75 },
            { branchId: 'BR002', stock: 60 },
            { branchId: 'BR003', stock: 45 },
            { branchId: 'BR004', stock: 30 },
            { branchId: 'BR005', stock: 15 },
        ],
    },
];

const branches = [
    { id: 'BR001', name: 'Downtown Branch', address: '123 Main St, Downtown' },
    { id: 'BR002', name: 'Uptown Branch', address: '456 Oak Ave, Uptown' },
    { id: 'BR003', name: 'Westside Branch', address: '789 Pine St, Westside' },
    { id: 'BR004', name: 'Eastside Branch', address: '321 Oak St, Eastside' },
    { id: 'BR005', name: 'Northside Branch', address: '654 Pine Ave, Northside' },
];

const productTypes = [
    { id: 'TYPE001', name: 'Food' },
    { id: 'TYPE002', name: 'Medicine' },
    { id: 'TYPE003', name: 'Accessories' },
];

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
    Food: Fastfood,
    Medicine: MedicationLiquid,
    Accessories: Diamond,
};

const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 400); // delay mô phỏng
    });
};

const ProductPage = () => {
    const [selectedTab, setSelectedTab] = useState('products');
    const [page, setPage] = useState(0); // page index (bắt đầu từ 0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [branchFilter, setBranchFilter] = useState('all');
    const [attachableFilter, setAttachableFilter] = useState('all');

    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ['products', page, rowsPerPage],
        queryFn: () => fetchProducts(),
        keepPreviousData: true,
    });

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProducts = data.filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            product.id.toLowerCase().includes(searchLower) ||
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.productType.toLowerCase().includes(searchLower);

        const matchesType = typeFilter === 'all' || product.productType === typeFilter;

        const matchesAttachable =
            attachableFilter === 'all' ||
            (attachableFilter === 'attachable' && product.isAttachable) ||
            (attachableFilter === 'non-attachable' && !product.isAttachable);

        console.log(product.productType, typeFilter);

        return matchesSearch && matchesType && matchesAttachable;
    });

    const pageData = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Get total stock across all branches
    const getTotalStock = (p) => {
        return p.inventory.reduce((total, inv) => total + inv.stock, 0);
    };

    // Get current branch stock or total if "all" is selected
    const getCurrentStock = (p) => {
        if (branchFilter === 'all') {
            return getTotalStock(p);
        }
        const branchInventory = p.inventory.find((inv) => inv.branchId === branchFilter);
        return branchInventory ? branchInventory.stock : 0;
    };

    // Get current stock status
    const getCurrentStockStatus = (p) => {
        if (branchFilter === 'all') {
            const totalStock = getTotalStock(p);
            if (totalStock <= 0) return 'Out of Stock';
            if (totalStock < 50) return 'Low Stock';
            return 'In Stock';
        } else {
            const branchInventory = p.inventory.find((inv) => inv.branchId === branchFilter);
            if (!branchInventory) return 'Out of Stock';

            const stock = branchInventory.stock;
            if (stock <= 0) return 'Out of Stock';
            if (stock < 10) return 'Low Stock';
            return 'In Stock';
        }
    };

    return (
        <Box p={3}>
            <ToggleButtonGroup
                value={selectedTab}
                exclusive
                size="small"
                onChange={(e, val) => val && setSelectedTab(val)}
                sx={{ mb: 2 }}
            >
                <ToggleButton sx={{ textTransform: 'none', px: 2, py: 0.25 }} value="products">
                    Products
                </ToggleButton>
                <ToggleButton sx={{ textTransform: 'none', px: 2, py: 0.25 }} value="services">
                    Services
                </ToggleButton>
            </ToggleButtonGroup>

            <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Products</Typography>
                        <Button variant="contained" color="secondary" size="small">
                            + Add Product
                        </Button>
                    </Box>

                    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
                        <TextField
                            select
                            size="small"
                            defaultValue="all"
                            onChange={(e) => setBranchFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Branches (Total)</MenuItem>
                            {branches.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>
                                    {opt.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            size="small"
                            defaultValue="all"
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Types</MenuItem>
                            {productTypes.map((opt) => (
                                <MenuItem key={opt.id} value={opt.name}>
                                    {opt.name}
                                </MenuItem>
                            ))}
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

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Product</TableCell>
                                <TableCell align="center">ID</TableCell>
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
                                    const IconComponent = productTypesIcon[p.productType];
                                    return (
                                        <TableRow key={p.id}>
                                            <TableCell align="center">
                                                <Box>
                                                    <Typography>{p.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {p.desc}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">{p.id}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    icon={<IconComponent fontSize="small" />}
                                                    label={capitalizeWords(p.productType)}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ p: 1 }}
                                                />
                                            </TableCell>
                                            <TableCell align="center" fontWeight={600}>
                                                {p.price}
                                            </TableCell>
                                            <TableCell align="center">
                                                {p.isAttachable ? (
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
                                                <IconButton size="small" onClick={(e) => handleMenuOpen(e, p.id)}>
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
                        count={filteredProducts.length || 0}
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
                        <MenuItem onClick={handleMenuClose}>Edit Product</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Assign Staff</MenuItem>
                    </Menu>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductPage;
