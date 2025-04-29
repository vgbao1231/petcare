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
import { Box, Button, Typography } from '@mui/material';
import landingImg from '@src/assets/login-background/login9.png';
import { centerSx } from '@src/theme';
import PolicyCard from '@ui/PolicyCard/PolicyCard';
import ProductCard from '@ui/ProductCard/ProductCard';
import ServiceCard from '@ui/ServiceCard/ServiceCard';

const LandingPage = () => {
    return (
        <Box>
            {/* First Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `url(${landingImg}) center top / cover no-repeat`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        left: '10%',
                        bottom: '20%',
                        bgcolor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(4px)',
                        p: 3,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '35%',
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" color="text.tertiary">
                        Best Care for Your Pet
                    </Typography>
                    <Typography color="text.tertiary">
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
                    <Box display="flex" gap={2}>
                        <Button variant="contained">Our Services</Button>
                        <Button variant="outlined">Shop Now</Button>
                    </Box>
                </Box>
            </Box>
            {/* Second Section */}
            <Box sx={{ ...centerSx, flexDirection: 'column', p: 6, px: 15 }}>
                <Typography variant="h4" fontWeight="bold" color="text.tertiary" mb={1}>
                    Our Services
                </Typography>
                <Typography color="text.secondary" mb={5}>
                    We offer a wide range of high-quality pet care services to ensure the health and happiness of your
                    pets.
                </Typography>
                <Box sx={{ display: 'flex', gap: 4, mb: 6 }}>
                    <ServiceCard
                        icon={<AutoFixHigh sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Grooming"
                        description="Bathing, hair trimming, ear cleaning, nail cutting, and other beauty services."
                        price="From $30"
                    />
                    <ServiceCard
                        icon={<MedicalServicesOutlined sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Veterinary Care"
                        description="General check-up, imaging, blood tests, and other medical services."
                        price="From $30"
                    />
                    <ServiceCard
                        icon={<Vaccines sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Vaccinations"
                        description="Vaccination services for all necessary vaccines to protect your pet."
                        price="Price upon request"
                    />
                    <ServiceCard
                        icon={<DirectionsCar sx={{ fontSize: 50, color: 'primary.main' }} />}
                        name="Home Services"
                        description="We bring care to your home, keeping your pet comfortable."
                        price="Price upon request"
                    />
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        textTransform: 'none',
                        gap: 0,
                        transition: '0.3s',
                        ':hover': { gap: 1 },
                    }}
                    endIcon={<East />}
                >
                    View All Services
                </Button>
            </Box>
            {/* Third Section */}
            <Box sx={{ ...centerSx, flexDirection: 'column', p: 6, px: 15, bgcolor: 'background.paper' }}>
                <Typography variant="h4" fontWeight="bold" color="text.tertiary" mb={1}>
                    Featured Products
                </Typography>
                <Typography color="text.secondary" mb={5}>
                    We provide high-quality products for your pets, from food to accessories and medicine.
                </Typography>
                <Box sx={{ display: 'flex', gap: 4, mb: 6, width: 0.9 }}>
                    <ProductCard
                        imgUrl="/src/assets/login-background/login1.png"
                        name="Thức ăn cho chó cao cấp chó cao cấp"
                        type="Food"
                        price="$29.99"
                    />
                    <ProductCard
                        imgUrl="/src/assets/login-background/login2.png"
                        name="Veterinary Care"
                        type="Food"
                        price="$29.99"
                    />
                    <ProductCard
                        imgUrl="/src/assets/login-background/login3.png"
                        name="Vaccinations"
                        type="Food"
                        price="$29.99"
                    />
                    <ProductCard
                        imgUrl="/src/assets/login-background/login4.png"
                        name="Home Services"
                        type="Food"
                        price="$29.99"
                    />
                </Box>
                <Button
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
                    py: 6,
                    background: 'linear-gradient(to right, #fef6ea,rgb(255, 216, 165))',
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Ready to Book an Appointment?
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1, mb: 4 }}>
                    Schedule a visit for your pet with just a few clicks. Our expert team is ready to provide the best
                    care for your furry friend.
                </Typography>

                <Box sx={{ ...centerSx, gap: 4, width: 0.8, mb: 5 }}>
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

                <Button variant="contained">Book Your Appointment Now</Button>

                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Need immediate assistance? Call us at <b>0123456789</b>
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
