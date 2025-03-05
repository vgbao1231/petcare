import { Logout, NotificationsOutlined, PersonAdd, Pets, Settings, ShoppingCartOutlined } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    Link,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import { routesConfig } from '@src/configs/routesConfig';
import { centerSx } from '@src/theme';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isActive = useCallback(
        (path) => {
            if (path === '/') {
                return location.pathname === '/';
            }
            return location.pathname.startsWith(path);
        },
        [location.pathname]
    );

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
                    {routesConfig.user.map(({ path, label }) => (
                        <Link
                            key={path}
                            underline="none"
                            href={path}
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
                    <IconButton size="small" onClick={handleClick}>
                        <Avatar alt="Remy Sharp" src="/src/assets/gura.jpg" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={!!anchorEl}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Paper>
        </Box>
    );
};

export default Header;
