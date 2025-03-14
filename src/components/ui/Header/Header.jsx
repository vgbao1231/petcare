import {
    CalendarMonth,
    Logout,
    NotificationsOutlined,
    PersonOutline,
    Pets,
    PetsOutlined,
    Settings,
    ShoppingBagOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import { authServices } from '@services/authServices';
import { routesConfig } from '@src/configs/routesConfig';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx, textEllipsisSx } from '@src/theme';
import ProfileDialog from '@ui/ProfileDialog/ProfileDialog';
import { memo, useCallback, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const { setRole } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isActive = useCallback(
        (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)),
        [location.pathname]
    );

    const handleLogout = useCallback(async () => {
        try {
            await authServices.logout();
            setRole();
            toast.success('Logout successful!');
        } catch {
            toast.error('Logout failed!');
        }
    }, [setRole]);

    return (
        <Box sx={{ position: 'fixed', top: 24, width: 1, zIndex: 10, ...centerSx }}>
            <Paper
                sx={{ bgcolor: '#fff', px: 5, py: 1, width: 0.8, borderRadius: 10, display: 'flex', gap: 8 }}
                elevation={4}
            >
                <Box {...centerSx} gap={1}>
                    <Pets />
                    <Typography variant="h6" component="div">
                        Petcare
                    </Typography>
                </Box>
                <Box {...centerSx} gap={4}>
                    {routesConfig.user.map(
                        ({ path, label }, index) =>
                            index < 4 && (
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
                    <IconButton size="small" onClick={handleClick}>
                        <Avatar alt="Avatar" src="/src/assets/gura.jpg" />
                    </IconButton>
                </Box>
            </Paper>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock
                sx={{ maxWidth: '260px' }}
            >
                <ListItem sx={{ py: 0.5 }}>
                    <ListItemAvatar>
                        <Avatar alt="Avatar" src="/src/assets/gura.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Bảo Võ"
                        secondary="vgbao1231@gmail.com asdasd asdas "
                        slotProps={{
                            primary: { sx: { fontWeight: 500, ...textEllipsisSx } },
                            secondary: { sx: textEllipsisSx },
                        }}
                    />
                </ListItem>
                <Divider />
                <MenuItem onClick={() => setOpen(true)} sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <PersonOutline />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <ProfileDialog open={open} onClose={() => setOpen(false)} />
                <MenuItem component={RouterLink} to="/pet-tracking" sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <PetsOutlined fontSize="small" />
                    </ListItemIcon>
                    Pet Tracking
                </MenuItem>
                <MenuItem component={RouterLink} to="/my-order" sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <ShoppingBagOutlined fontSize="small" />
                    </ListItemIcon>
                    My Order
                </MenuItem>
                <MenuItem component={RouterLink} to="/my-appointment" sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <CalendarMonth fontSize="small" />
                    </ListItemIcon>
                    My Appointment
                </MenuItem>
                <MenuItem sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontSize: '14px' }}>
                    <ListItemIcon>
                        <Logout fontSize="small" color="error" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default memo(Header);
