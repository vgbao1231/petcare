import { Search } from '@mui/icons-material';
import { Box, InputAdornment, MenuItem, Paper, Select, Slider, TextField, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { capitalizeWords } from '@src/utils/formatters';
import ProductCard from '@ui/ProductCard/ProductCard';
import { useCallback, useState } from 'react';

const products = [
    {
        id: 1,
        type: 'foods',
        name: 'Premium Dog Food',
        desc: 'High-quality dog food with essential nutrients',
        price: 25,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        id: 1,
        type: 'accessories',
        name: 'Cat Scratching Post',
        desc: 'Durable scratching post to keep your cat entertained',
        price: 35,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        id: 2,
        type: 'medicines',
        name: 'Pet Shampoo',
        desc: 'Gentle and effective shampoo for a clean and healthy coat',
        price: 15,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        id: 2,
        type: 'accessories',
        name: 'Chew Toy',
        desc: 'Safe and fun chew toy for dogs of all sizes',
        price: 10,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        id: 3,
        type: 'accessories',
        name: 'Automatic Water Dispenser',
        desc: 'Ensures a fresh water supply for your pet at all times',
        price: 45,
        imgUrl: '/src/assets/gura.jpg',
    },
];

const productTypes = [
    { singular: 'All Product', plural: 'All Products', api: '' },
    { singular: 'Food', plural: 'Foods', api: '/foods' },
    { singular: 'Accessory', plural: 'Accessories', api: '/accessories' },
    { singular: 'Medicine', plural: 'Medicines', api: '/medicines' },
];

const ProductPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortBy, setSortBy] = useState('0');

    const handleClick = useCallback((index) => setCurrentTab(index), []);

    // const { data: products = [] } = useQuery({
    //     queryKey: ['products', currentTab],
    //     queryFn: () => productServices.getProductsByType(productTypes[currentTab].api),
    //     keepPreviousData: true, // giữ data cũ khi đổi tab
    // });

    return (
        <Box
            sx={{
                pt: 11,
                px: 20,
                pb: 5,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Typography fontSize={24} fontWeight={500}>
                Pet Shop
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Browse our selection of premium pet products, from nutritious food to fun toys and essential
                accessories.
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, height: 1 }}>
                {/* Filter Box */}
                <Paper sx={{ borderRadius: 2, width: 240, mb: 0.5, p: 2, display: 'flex', flexDirection: 'column' }}>
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
                        sx={{ bgcolor: '#fff' }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body2">Price</Typography>
                        <Typography fontSize={12} color="text.secondary">
                            ${priceRange[0]} - ${priceRange[1]}
                        </Typography>
                    </Box>
                    <Slider
                        size="small"
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                        sx={{
                            mt: -0.5,
                            mx: 'auto',
                            width: 0.95,
                            '& .MuiSlider-thumb': {
                                '&:focus, &:hover, &.Mui-active': { boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)' },
                            },
                        }}
                    />
                </Paper>

                {/* Product Box */}
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', flex: 1 }}>
                    {/* Box Header */}
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        {/* Product Types */}
                        <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, ...centerSx, gap: 2, flex: 1 }}>
                            {productTypes.map(({ plural }, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        px: 2,
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
                        <Box {...centerSx} gap={2}>
                            <Typography sx={{ whiteSpace: 'nowrap', fontSize: 14 }}>Sort by: </Typography>
                            <Select
                                sx={{ fontSize: '14px', minWidth: 180, '.MuiSelect-select': { py: 0.6 } }}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="0">Lastest</MenuItem>
                                <MenuItem value="1">Price: Low to High</MenuItem>
                                <MenuItem value="2">Price: High to Low</MenuItem>
                            </Select>
                        </Box>
                    </Box>

                    {/* Product List */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            gap: 3,
                            maxHeight: 500,
                            overflow: 'auto',
                            p: 0.4,
                        }}
                    >
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                id={product.id}
                                imgUrl={product.imgUrl}
                                name={product.name}
                                price={product.price}
                                type={capitalizeWords(product.type) || productTypes[currentTab].singular}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;
