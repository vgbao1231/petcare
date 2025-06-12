import { Pets, RoomOutlined, ShoppingCartOutlined, Menu as MenuIcon } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { routesConfig } from '@src/configs/routesConfig';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx } from '@src/theme';
import { memo, useCallback, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ProfilePopover from './ProfilePopOver';
import CartPopover from './CartPopover';
import { genAvatarColor } from '@src/utils/helpers';
import { useCart } from '@src/hooks/useCart';
import { useBranch } from '@src/hooks/useBranch';

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const { userInfo } = useAuth();
    const { cart } = useCart();
    const { branches, selectedBranch, setSelectedBranch } = useBranch();
    const currentItems = cart[selectedBranch]?.items || [];
    const totalItems = currentItems.reduce((sum, item) => sum + item.quantity, 0);

    const isActive = useCallback(
        (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)),
        [location.pathname]
    );

    return (
        <Box {...centerSx}>
            <Paper
                sx={{
                    position: 'fixed',
                    top: isMobile ? 0 : 20,
                    zIndex: 10,
                    bgcolor: 'background.paper',
                    px: isMobile ? 2 : 5,
                    py: 1,
                    width: isMobile ? 1 : 0.8,
                    borderRadius: isMobile ? 0 : 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    m: '0 auto',
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
                {isMobile ? (
                    <>
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                            <Box width={250} role="presentation" p={2}>
                                <Typography variant="h6" mb={2}>
                                    Menu
                                </Typography>
                                <List>
                                    {routesConfig.customer.slice(1, 7).map(({ path, label, icon }) => {
                                        const Icon = icon;
                                        return (
                                            <ListItemButton
                                                button
                                                key={path}
                                                component={RouterLink}
                                                to={path}
                                                onClick={() => setDrawerOpen(false)}
                                            >
                                                <ListItemIcon>
                                                    <Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={label} />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <>
                        <Box {...centerSx} gap={4}>
                            {routesConfig.customer.slice(0, 4).map(({ path, label }) => (
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
                            ))}
                        </Box>

                        <Box {...centerSx} ml="auto" gap={2}>
                            <Select
                                size="small"
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                displayEmpty
                                renderValue={(selected) => {
                                    const selectedBranch = branches.find((b) => b.id === selected);
                                    if (!selectedBranch) return <Typography variant="body2">Select Branch</Typography>;
                                    return (
                                        <Box>
                                            <Typography lineHeight={1.2} fontSize={12} fontWeight={500}>
                                                {selectedBranch.name}
                                            </Typography>
                                            <Typography lineHeight={1.2} fontSize={11} color="text.secondary">
                                                {selectedBranch.location}
                                            </Typography>
                                        </Box>
                                    );
                                }}
                                sx={{ borderRadius: 2, px: 1, '.MuiSelect-select': { py: 0.6, ...centerSx } }}
                            >
                                {branches.map((branch) => (
                                    <MenuItem key={branch.id} value={branch.id}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <RoomOutlined fontSize="small" color="primary" />
                                            <Box>
                                                <Typography fontSize={12} fontWeight={500}>
                                                    {branch.name}
                                                </Typography>
                                                <Typography fontSize={11} color="text.secondary">
                                                    {branch.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
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
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        bgcolor: genAvatarColor(userInfo?.name),
                                        color: '#fff',
                                    }}
                                >
                                    {userInfo?.name?.[0] || 'C'}
                                </Avatar>
                            </IconButton>
                        </Box>
                    </>
                )}
            </Paper>
            <ProfilePopover anchorEl={profileAnchorEl} setAnchorEl={setProfileAnchorEl} />
            <CartPopover anchorEl={cartAnchorEl} setAnchorEl={setCartAnchorEl} />
        </Box>
    );
};

export default memo(Header);
