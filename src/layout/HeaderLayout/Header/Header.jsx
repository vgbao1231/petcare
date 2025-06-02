import { Pets, ShoppingCartOutlined } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, Link, Paper, Typography } from '@mui/material';
import { routesConfig } from '@src/configs/routesConfig';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx } from '@src/theme';
import { memo, useCallback, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ProfilePopover from './ProfilePopOver';
import CartPopover from './CartPopover';
import { genAvatarColor } from '@src/utils/helpers';
import { useCart } from '@src/hooks/useCart';

const Header = () => {
    const location = useLocation();
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const { userInfo } = useAuth();
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const isActive = useCallback(
        (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)),
        [location.pathname]
    );

    return (
        <Box sx={{ position: 'fixed', top: 20, width: 1, zIndex: 10, ...centerSx }}>
            <Paper
                sx={{
                    bgcolor: 'background.paper',
                    px: 5,
                    py: 0.5,
                    width: 0.8,
                    borderRadius: 10,
                    display: 'flex',
                    gap: 8,
                }}
                elevation={2}
            >
                <Box component={RouterLink} to="/" {...centerSx} gap={1}>
                    <Pets />
                    <Typography variant="h6" component="div">
                        Petcare
                    </Typography>
                </Box>
                <Box {...centerSx} gap={4}>
                    {routesConfig.customer.map(
                        ({ path, label }, index) =>
                            index < 3 && (
                                <Link
                                    component={RouterLink}
                                    key={path}
                                    underline="none"
                                    to={path}
                                    sx={{
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        color: isActive(path) ? 'primary.main' : 'black',
                                        position: 'relative',
                                        transition: 'color 0.3s',
                                        '&:after': {
                                            content: "''",
                                            position: 'absolute',
                                            left: 0,
                                            bottom: -4,
                                            width: isActive(path) ? 1 : 0,
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
                                    {label}
                                </Link>
                            )
                    )}
                </Box>
                <Box {...centerSx} ml="auto" gap={2}>
                    {/* <IconButton size="small">
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
                    </IconButton> */}
                    <IconButton size="small" onClick={(e) => setCartAnchorEl(e.currentTarget)}>
                        <Badge
                            badgeContent={totalItems}
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
                    <IconButton size="small" onClick={(e) => setProfileAnchorEl(e.currentTarget)}>
                        <Avatar
                            alt="Avatar"
                            sx={{ width: 36, height: 36, bgcolor: genAvatarColor(userInfo?.name), color: '#fff' }}
                        >
                            {userInfo?.name?.[0] || 'C'}
                        </Avatar>
                    </IconButton>
                </Box>
            </Paper>
            <ProfilePopover anchorEl={profileAnchorEl} setAnchorEl={setProfileAnchorEl} />
            <CartPopover anchorEl={cartAnchorEl} setAnchorEl={setCartAnchorEl} />
        </Box>
    );
};

export default memo(Header);
