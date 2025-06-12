import {
    AccessTime,
    AutoFixHigh,
    CalendarMonthOutlined,
    DirectionsCar,
    East,
    HeadsetMicOutlined,
    MedicalServicesOutlined,
    Vaccines,
} from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { productServices } from '@services/productServices';
import landingImg from '@src/assets/login-background/login9.png';
import { useBranch } from '@src/hooks/useBranch';
import { centerSx } from '@src/theme';
import { capitalizeWords } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import PolicyCard from '@ui/PolicyCard/PolicyCard';
import ProductCard from '@ui/ProductCard/ProductCard';
import ServiceCard from '@ui/ServiceCard/ServiceCard';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { selectedBranch } = useBranch();

    const { data: products } = useQuery({
        queryKey: ['products', selectedBranch],
        queryFn: () => productServices.getProductsByType(selectedBranch),
        keepPreviousData: true,
        enabled: !!selectedBranch,
    });

    return (
        <Box>
            {/* First Section */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `url(${landingImg}) center top / cover no-repeat`,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: '5%', md: '10%' },
                        bottom: { xs: '10%', md: '20%' },
                        bgcolor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(4px)',
                        p: 3,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: { xs: '90%', sm: '70%', md: '35%' },
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" color="text.tertiary">
                        Best Care for Your Pet
                    </Typography>
                    <Typography variant="body2" color="text.tertiary">
                        Complete pet care services including premium products, veterinary appointments, grooming, and
                        more - all in one place.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }} color="text.tertiary">
                        <Typography component="li" variant="body2">
                            Quality pet food and accessories
                        </Typography>
                        <Typography component="li" variant="body2">
                            Professional grooming services
                        </Typography>
                        <Typography component="li" variant="body2">
                            Expert veterinary care
                        </Typography>
                        <Typography component="li" variant="body2">
                            Convenient online booking
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                        <Button variant="contained" fullWidth={isMobile}>
                            Our Services
                        </Button>
                        <Button variant="outlined" fullWidth={isMobile}>
                            Shop Now
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Second Section */}
            <Box sx={{ ...centerSx, flexDirection: 'column', p: { xs: 4, md: 6 }, px: { xs: 2, md: 15 } }}>
                <Typography variant="h5" fontWeight="bold" color="text.tertiary" mb={1}>
                    Our Services
                </Typography>
                <Typography color="text.secondary" mb={5} align="center">
                    We offer a wide range of high-quality pet care services...
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <ServiceCard
                        icon={<AutoFixHigh sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Grooming"
                        description="Bathing, hair trimming, ear cleaning, nail cutting, and other beauty services."
                    />
                    <ServiceCard
                        icon={<MedicalServicesOutlined sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Veterinary Care"
                        description="General check-up, imaging, blood tests, and other medical services."
                    />
                    <ServiceCard
                        icon={<Vaccines sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Vaccinations"
                        description="Vaccination services for all necessary vaccines to protect your pet."
                    />
                    <ServiceCard
                        icon={<DirectionsCar sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Home Services"
                        description="We bring care to your home, keeping your pet comfortable."
                    />
                </Box>
            </Box>

            {/* Third Section */}
            <Box
                sx={{
                    ...centerSx,
                    flexDirection: 'column',
                    p: { xs: 4, md: 6 },
                    px: { xs: 2, md: 15 },
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="text.tertiary" mb={1}>
                    Featured Products
                </Typography>
                <Typography color="text.secondary" mb={5} align="center">
                    We provide high-quality products...
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 4,
                        mb: 6,
                        width: '100%',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {(products || []).slice(0, 4).map((p, index) => (
                        <ProductCard
                            key={index}
                            imgUrl={p.imgurl}
                            name={p.name}
                            type={capitalizeWords(p.productType)}
                            price={p.price}
                        />
                    ))}
                </Box>
                <Button
                    component={Link}
                    to="/product"
                    variant="outlined"
                    sx={{
                        textTransform: 'none',
                        gap: 0,
                        transition: '0.3s',
                        ':hover': { gap: 1 },
                    }}
                    endIcon={<East />}
                >
                    View All Product
                </Button>
            </Box>

            {/* Fourth Section */}
            <Box
                sx={{
                    ...centerSx,
                    flexDirection: 'column',
                    py: { xs: 4, md: 6 },
                    background: 'linear-gradient(to right, #fef6ea,rgb(255, 216, 165))',
                    px: 2,
                }}
            >
                <Typography variant="h5" fontWeight="bold" align="center">
                    Ready to Book an Appointment?
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1, mb: 4 }} align="center">
                    Schedule a visit for your pet with just a few clicks...
                </Typography>

                <Box
                    sx={{
                        ...centerSx,
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        width: '100%',
                        mb: 5,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <PolicyCard
                        icon={<CalendarMonthOutlined sx={{ fontSize: 40, color: 'primary.main' }} />}
                        name="Flexible Scheduling"
                        description="Vaccination services for all necessary vaccines to protect your pet."
                    />
                    <PolicyCard
                        icon={<MedicalServicesOutlined sx={{ fontSize: 40, color: 'primary.main' }} />}
                        name="Expert Care"
                        description="Vaccination services for all necessary vaccines to protect your pet."
                    />
                    <PolicyCard
                        icon={<AccessTime sx={{ fontSize: 40, color: 'primary.main' }} />}
                        name="Quick Process"
                        description="Vaccination services for all necessary vaccines to protect your pet."
                    />
                    <PolicyCard
                        icon={<HeadsetMicOutlined sx={{ fontSize: 40, color: 'primary.main' }} />}
                        name="24/7 Support"
                        description="Vaccination services for all necessary vaccines to protect your pet."
                    />
                </Box>
                <Button variant="contained">Book Appointment Now</Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }} align="center">
                    Need immediate assistance? Call us at <b>0123456789</b>
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
