import { Box, Paper, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import ProductCard from '@ui/ProductCard/ProductCard';
import { useCallback, useState } from 'react';

const ProductPage = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleClick = useCallback((index) => {
        setCurrentTab(index);
    }, []);
    return (
        <Box sx={{ pt: 12, px: 20, pb: 5 }}>
            <Typography fontSize={30} fontWeight="bold">
                Pet Shop
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Browse our selection of premium pet products, from nutritious food to fun toys and essential
                accessories.
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, width: 1 }}>
                {/* Filter Box */}
                <Paper sx={{ borderRadius: 2, width: 240 }}></Paper>

                {/* Product Box */}
                <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', flex: 1 }}>
                    {/* Categories */}
                    <Box sx={{ bgcolor: 'grey.200', p: 0.8, borderRadius: 2, ...centerSx, gap: 2 }}>
                        {['All product', 'Food', 'Accessories', 'Medicine'].map((category, index) => (
                            <Box
                                key={index}
                                sx={{
                                    px: 2,
                                    py: 0.5,
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
                                <Typography variant="body2">{category}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Product List */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 3 }}>
                        {products.map((product) => (
                            <ProductCard
                                key={product.productId}
                                img={product.img}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

const products = [
    {
        productId: 1,
        img: '/src/assets/login-background/login1.png',
        name: 'Thức ăn cho chó cao cấp',
        category: 'Food',
        price: '$29.99',
    },
    {
        productId: 2,
        img: '/src/assets/login-background/login2.png',
        name: 'Veterinary Care',
        category: 'Health',
        price: '$49.99',
    },
    {
        productId: 3,
        img: '/src/assets/login-background/login3.png',
        name: 'Vaccinations',
        category: 'Health',
        price: '$19.99',
    },
    {
        productId: 4,
        img: '/src/assets/login-background/login4.png',
        name: 'Home Services',
        category: 'Service',
        price: '$39.99',
    },
    {
        productId: 5,
        img: '/src/assets/login-background/login1.png',
        name: 'Dịch vụ Grooming',
        category: 'Service',
        price: '$59.99',
    },
    {
        productId: 6,
        img: '/src/assets/login-background/login2.png',
        name: 'Thức ăn cho mèo cao cấp',
        category: 'Food',
        price: '$24.99',
    },
    {
        productId: 7,
        img: '/src/assets/login-background/login3.png',
        name: 'Pet Training',
        category: 'Training',
        price: '$79.99',
    },
    {
        productId: 8,
        img: '/src/assets/login-background/login4.png',
        name: 'Dịch vụ kiểm tra sức khỏe',
        category: 'Health',
        price: '$34.99',
    },
    {
        productId: 9,
        img: '/src/assets/login-background/login1.png',
        name: 'Đồ chơi cho thú cưng',
        category: 'Toys',
        price: '$14.99',
    },
    {
        productId: 10,
        img: '/src/assets/login-background/login2.png',
        name: 'Bộ dụng cụ chăm sóc thú cưng',
        category: 'Accessories',
        price: '$44.99',
    },
];

export default ProductPage;
