import { NotificationsOutlined, Pets, ShoppingCartOutlined } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, Link, Paper, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { useState } from 'react';

const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');

    return (
        <Box sx={{ position: 'fixed', top: 24, width: 1, ...centerSx }}>
            <Paper
                sx={{ bgcolor: '#fff', px: 5, py: 1, width: 0.7, borderRadius: 10, display: 'flex', gap: 8 }}
                elevation={4}
            >
                <Box {...centerSx} gap={1}>
                    <Pets />
                    <Typography variant="h6" component="div">
                        Petcare
                    </Typography>
                </Box>
                <Box {...centerSx} gap={4}>
                    {['Home', 'Shop', 'About Us', 'Contact Us'].map((item) => (
                        <Link
                            key={item}
                            underline="none"
                            // href="/forgot-password"
                            onClick={() => setActiveTab(item)}
                            sx={{
                                cursor: 'pointer',
                                fontWeight: '500',
                                color: activeTab === item ? 'primary.main' : 'black',
                                position: 'relative',
                                transition: 'color 0.3s',
                                '&:after': {
                                    content: "''",
                                    position: 'absolute',
                                    left: 0,
                                    bottom: -4,
                                    width: activeTab === item ? 1 : 0,
                                    height: 2,
                                    backgroundColor: 'primary.main',
                                    transition: 'width 0.3s',
                                },
                                '&:hover': {
                                    color: 'primary.main',
                                    '&:after': { width: 1 },
                                },
                            }}
                        >
                            {item}
                        </Link>
                    ))}
                </Box>
                <Box {...centerSx} ml="auto" gap={2}>
                    <IconButton size="small">
                        <Badge
                            badgeContent={44}
                            color="primary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '10px',
                                    height: '16px',
                                    minWidth: '16px',
                                    color: 'white',
                                },
                            }}
                        >
                            <NotificationsOutlined sx={{ color: '#111' }} />
                        </Badge>
                    </IconButton>
                    <IconButton size="small">
                        <Badge
                            badgeContent={4}
                            color="primary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '10px',
                                    height: '16px',
                                    minWidth: '16px',
                                    color: 'white',
                                },
                            }}
                        >
                            <ShoppingCartOutlined sx={{ color: '#111' }} />
                        </Badge>
                    </IconButton>
                    <IconButton size="small">
                        <Avatar alt="Remy Sharp" src="/src/assets/gura.jpg" />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default Header;
