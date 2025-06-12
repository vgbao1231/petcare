import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, Switch, useColorScheme } from '@mui/material';
import { useCallback } from 'react';
import { AccountCircleOutlined, DarkModeOutlined, LightModeOutlined, Logout } from '@mui/icons-material';
import { authServices } from '@services/authServices';
import { toast } from 'react-toastify';
import { useAuth } from '@src/hooks/useAuth';

const MenuSetting = ({ open, anchorEl, setAnchorEl, anchorOrigin, transformOrigin }) => {
    const { mode, setMode } = useColorScheme();
    const { setToken } = useAuth();
    const toggleTheme = useCallback(() => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }, [mode, setMode]);

    // Đóng menu khi chọn mục
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const handleLogout = useCallback(async () => {
        authServices.logout();
        setToken();
        toast.success('Logout successful!');
    }, [setToken]);

    return (
        <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            onClose={handleClose}
            slotProps={{ paper: { elevation: 2, sx: open ? { mt: -1 } : { ml: 4 } }, list: { sx: { width: 208 } } }}
            disableAutoFocusItem
        >
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={toggleTheme}>
                <ListItemIcon>{mode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}</ListItemIcon>
                <ListItemText primary="Mode" />
                <Switch size="small" checked={mode === 'light'} />
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                    <Logout fontSize="small" color="error" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
};

export default MenuSetting;
