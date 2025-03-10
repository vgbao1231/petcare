import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
    Tooltip,
    useColorScheme,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import gura from '@assets/gura.jpg';
import { centerSx, textEllipsisSx } from '@src/theme';
import { Link } from 'react-router-dom';
import {
    AccountCircleOutlined,
    DarkModeOutlined,
    LightModeOutlined,
    Logout,
    SettingsOutlined,
} from '@mui/icons-material';
import SidebarItem from './SidebarItem';

export default function Sidebar({ sidebarItems }) {
    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const { mode, setMode } = useColorScheme();
    const toggleTheme = useCallback(() => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }, [mode, setMode]);
    const mouseIndexRef = useRef();

    // Xử lý mở đóng/thay đổi kích thước khi nhấp/kéo trên Sidebar border
    const handleMouseDown = useCallback((e) => {
        const newWidth = e.clientX;
        mouseIndexRef.current = newWidth;
        setIsResizing(true);

        const handleMouseMove = (e) => {
            const newWidth = e.clientX;
            if (newWidth >= 200 && newWidth <= 360) {
                setWidth(newWidth);
            }
        };

        const handleMouseUp = (e) => {
            const newWidth = e.clientX;
            if (newWidth === mouseIndexRef.current) {
                setOpen((prev) => !prev);
            }
            setIsResizing(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = 'none';
    }, []);

    // Mở menu khi nhấn vào Setting
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    // Đóng menu khi chọn mục
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    return (
        <Box sx={{ position: 'relative', boxSizing: 'border-box' }}>
            {/* Sidebar Content*/}
            <Box
                sx={{
                    p: 2,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: !isResizing && 'width 0.3s',
                    width: open ? width : 80,
                    borderRight: 1,
                    borderColor: mode === 'light' ? 'grey.200' : 'grey.900',
                    backgroundColor: 'background.paper',
                }}
            >
                <List disablePadding sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 }}>
                    <ListItem
                        component={Link}
                        to="profile"
                        button={+open}
                        sx={{ px: open ? 1 : 0, borderRadius: 2, transition: 'padding 0.3s, background-color 0.3s' }}
                    >
                        <ListItemAvatar>
                            <Avatar alt="Avatar" src={gura} sx={{ width: 46, height: 46, mr: 2 }} />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ m: 0, opacity: !open && 0, transition: 'opacity 0.3s' }}
                            slotProps={{
                                primary: { sx: { fontWeight: 600, ...textEllipsisSx } },
                                secondary: { sx: textEllipsisSx },
                            }}
                            primary="Võ Gia Bảo"
                            secondary="vgbao1231@gmail.com"
                        />
                    </ListItem>
                    <Divider />
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} open={open} item={item} index={index} />
                    ))}

                    {/* Setting */}
                    <Divider sx={{ mt: 'auto' }} />
                    <Tooltip
                        title={open ? null : 'Setting'}
                        slotProps={{
                            tooltip: { sx: { fontSize: '12px' } },
                            popper: { modifiers: [{ name: 'offset', options: { offset: [0, 12] } }] },
                        }}
                        arrow
                        placement="right"
                    >
                        <>
                            <ListItem
                                button="true"
                                sx={{ p: 1, borderRadius: 2, transition: 'background-color 0.3s' }}
                                onClick={handleClick}
                            >
                                <ListItemIcon sx={{ ...centerSx, width: 1, maxWidth: 30, minWidth: 0 }}>
                                    <SettingsOutlined />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ ml: 1, opacity: !open && 0, transition: 'opacity 0.3s' }}
                                    primary="Setting"
                                />
                            </ListItem>

                            {/* Menu hiển thị khi nhấn vào Setting */}
                            <Menu
                                anchorEl={anchorEl}
                                open={!!anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                                    <ListItemIcon>
                                        {mode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}
                                    </ListItemIcon>
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
                        </>
                    </Tooltip>
                </List>
            </Box>

            {/* Sidebar Border*/}
            {!isResizing && (
                <Tooltip
                    title={
                        open ? (
                            <>
                                <Box sx={{ fontWeight: 'bold' }}>
                                    Close <span style={{ fontWeight: 'normal' }}>Click</span>
                                </Box>
                                <Box sx={{ fontWeight: 'bold' }}>
                                    Resize <span style={{ fontWeight: 'normal' }}>Drag</span>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ fontWeight: 'bold' }}>
                                Expand <span style={{ fontWeight: 'normal' }}>Click</span>
                            </Box>
                        )
                    }
                    placement="right"
                    followCursor
                    arrow
                >
                    <Box
                        sx={{
                            p: 0.5,
                            cursor: 'col-resize',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 'calc(100% - 4px)',
                        }}
                        onMouseDown={handleMouseDown}
                    ></Box>
                </Tooltip>
            )}
        </Box>
    );
}
