import { CalendarMonth, Logout, PersonOutline, PetsOutlined, Settings, ShoppingBagOutlined } from '@mui/icons-material';
import { Avatar, Divider, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { authServices } from '@services/authServices';
import { useAuth } from '@src/hooks/useAuth';
import { textEllipsisSx } from '@src/theme';
import { genAvatarColor } from '@src/utils/helpers';
import ProfileDialog from '@ui/ProfileDialog/ProfileDialog';
import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfilePopover = ({ anchorEl, setAnchorEl }) => {
    const { setToken, userInfo } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => setAnchorEl(null);

    const handleLogout = useCallback(async () => {
        authServices.logout();
        setToken();
        toast.success('Logout successful!');
    }, [setToken]);

    return (
        <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            disableScrollLock
            sx={{ maxWidth: '260px' }}
        >
            <MenuItem onClick={() => setOpenDialog(true)}>
                <ListItemAvatar>
                    <Avatar alt="Avatar" sx={{ bgcolor: genAvatarColor(userInfo?.name), color: '#fff' }}>
                        {userInfo?.name?.[0] || 'C'}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={userInfo?.name || 'Customer'}
                    secondary={userInfo?.email || 'customer@gmail.com'}
                    slotProps={{
                        primary: { sx: { fontWeight: 500, ...textEllipsisSx } },
                        secondary: { sx: textEllipsisSx },
                    }}
                />
            </MenuItem>

            <Divider />

            <MenuItem onClick={() => setOpenDialog(true)} sx={{ fontSize: '14px' }}>
                <ListItemIcon>
                    <PersonOutline />
                </ListItemIcon>
                Profile
            </MenuItem>
            <ProfileDialog open={openDialog} onClose={() => setOpenDialog(false)} />

            <MenuItem component={RouterLink} to="/pet-tracking" sx={{ fontSize: '14px' }} onClick={handleClose}>
                <ListItemIcon>
                    <PetsOutlined fontSize="small" />
                </ListItemIcon>
                Pet Tracking
            </MenuItem>

            <MenuItem component={RouterLink} to="/my-order" sx={{ fontSize: '14px' }} onClick={handleClose}>
                <ListItemIcon>
                    <ShoppingBagOutlined fontSize="small" />
                </ListItemIcon>
                My Order
            </MenuItem>

            <MenuItem component={RouterLink} to="/my-appointment" sx={{ fontSize: '14px' }} onClick={handleClose}>
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
    );
};

export default ProfilePopover;
