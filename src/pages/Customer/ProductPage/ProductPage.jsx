import { Inventory2Outlined, Search } from '@mui/icons-material';
import { Box, InputAdornment, MenuItem, Paper, Select, Slider, TextField, Typography } from '@mui/material';
import { productServices } from '@services/productServices';
import { useBranch } from '@src/hooks/useBranch';
import { centerSx } from '@src/theme';
import { capitalizeWords } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@ui/ProductCard/ProductCard';
import { useCallback, useState } from 'react';

const productTypes = [
    { singular: 'All Product', plural: 'All Products', api: '' },
    { singular: 'Food', plural: 'Foods', api: 'FOOD' },
    { singular: 'Accessory', plural: 'Accessories', api: 'ACCESSORY' },
    { singular: 'Medicine', plural: 'Medicines', api: 'MEDICINE' },
];

const ProductPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [priceRange, setPriceRange] = useState([0, 200]);
    const { selectedBranch } = useBranch();
    const [sortBy, setSortBy] = useState('0');

    const handleClick = useCallback((index) => setCurrentTab(index), []);

    const { data: products } = useQuery({
        queryKey: ['products', currentTab, selectedBranch],
        queryFn: () => productServices.getProductsByType(selectedBranch, productTypes[currentTab].api),
        keepPreviousData: true,
        enabled: !!selectedBranch,
    });

    const filteredProducts = (products || []).filter((product) => {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch =
            product.name.toLowerCase().includes(searchLower) ||
            product.price.toString().toLowerCase().includes(searchLower) ||
            product.product_type.toLowerCase().includes(searchLower);
        const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesPriceRange;
    });

    return (
        <Box sx={{ pt: 11, px: { xs: 2, md: 20 }, pb: 2 }}>
            <Typography fontSize={24} fontWeight={500}>
                Pet Shop
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Browse our selection of premium pet products, from nutritious food to fun toys and essential
                accessories.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                {/* Filter Box */}
                <Paper
                    sx={{
                        borderRadius: 2,
                        width: { xs: '100%', md: 240 },
                        mb: { xs: 2, md: 0.5 },
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography fontSize={18} fontWeight={500} mb={1}>
                        Filter
                    </Typography>

                    <Typography variant="body2" mb={0.5}>
                        Search
                    </Typography>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search products..."
                        sx={{ bgcolor: '#fff', mb: 1 }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography variant="body2" mb={0.5}>
                        Sort By
                    </Typography>
                    <Select
                        size="small"
                        sx={{ fontSize: '14px', minWidth: '100%' }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <MenuItem value="0">Lastest</MenuItem>
                        <MenuItem value="1">Price: Low to High</MenuItem>
                        <MenuItem value="2">Price: High to Low</MenuItem>
                    </Select>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body2">Price</Typography>
                        <Typography fontSize={12} color="text.secondary">
                            ${priceRange[0]} - ${priceRange[1]}
                        </Typography>
                    </Box>
                    <Slider
                        size="small"
                        value={priceRange}
                        onChange={(event, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={200}
                        step={1}
                        sx={{
                            mt: -0.5,
                            mx: 'auto',
                            width: 0.95,
                            '& .MuiSlider-thumb': {
                                '&:focus, &:hover, &.Mui-active': {
                                    boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
                                },
                            },
                        }}
                    />
                </Paper>

                {/* Product Box */}
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', flex: 1 }}>
                    {/* Product Types */}
                    <Box
                        sx={{
                            bgcolor: 'grey.100',
                            borderRadius: 2,
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'center' },
                            gap: 1,
                            p: 1,
                        }}
                    >
                        {productTypes.map(({ plural }, index) => (
                            <Box
                                key={index}
                                sx={{
                                    px: { xs: 0.8, md: 3 },
                                    py: 0.2,
                                    bgcolor: index === currentTab ? '#fff' : 'none',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    ':hover': {
                                        bgcolor: index === currentTab ? 'none' : '#fafafa',
                                    },
                                }}
                                onClick={() => handleClick(index)}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={index === currentTab ? 500 : undefined}
                                    sx={{ color: index === currentTab ? undefined : 'text.secondary' }}
                                >
                                    {plural}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Product List */}
                    {filteredProducts.length === 0 ? (
                        <Box sx={{ ...centerSx, flexDirection: 'column', gap: 1.5, height: '50vh' }}>
                            <Box sx={{ ...centerSx, p: 2, bgcolor: '#f0f0f0', borderRadius: '50%' }}>
                                <Inventory2Outlined sx={{ fontSize: 50, color: '#78716c' }} />
                            </Box>
                            <Typography variant="h5" fontWeight={500}>
                                No products available
                            </Typography>
                            <Typography color="text.secondary">
                                {'There are currently no products available.'}
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: '1fr 1fr',
                                    md: '1fr 1fr 1fr',
                                    lg: '1fr 1fr 1fr 1fr',
                                },
                                gap: 3,
                                maxHeight: '100%',
                                overflow: 'auto',
                                p: 0.4,
                            }}
                        >
                            {filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    id={product.product_id}
                                    imgUrl={product.imgurl}
                                    name={product.name}
                                    price={product.price}
                                    stock={product.available_quantity}
                                    type={capitalizeWords(product.product_type) || productTypes[currentTab].singular}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;
