import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, Switch, useColorScheme } from '@mui/material';
import { useCallback } from 'react';
import { AccountCircleOutlined, DarkModeOutlined, LightModeOutlined, Logout } from '@mui/icons-material';

const MenuSetting = ({ anchorEl, setAnchorEl, anchorOrigin, transformOrigin }) => {
    const { mode, setMode } = useColorScheme();
    const toggleTheme = useCallback(() => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }, [mode, setMode]);

    // Đóng menu khi chọn mục
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    return (
        <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            onClose={handleClose}
            slotProps={{ paper: { elevation: 2 }, list: { sx: { width: 208 } } }}
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
            <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
                <ListItemIcon sx={{ color: 'error.main' }}>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </MenuItem>
        </Menu>
    );
};

export default MenuSetting;
