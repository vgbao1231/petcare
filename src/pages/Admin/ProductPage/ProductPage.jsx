import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import ProductTable from './ProductTable';
import ServiceTable from './ServiceTable';

const ProductPage = () => {
    const [selectedTab, setSelectedTab] = useState('products');

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
            {selectedTab === 'products' ? <ProductTable /> : <ServiceTable />}
        </Box>
    );
};

export default ProductPage;
