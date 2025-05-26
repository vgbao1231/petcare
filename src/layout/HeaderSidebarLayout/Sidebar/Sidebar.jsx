import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { centerSx, textEllipsisSx } from '@src/theme';
import { Pets, SettingsOutlined } from '@mui/icons-material';
import SidebarItem from './SidebarItem';
import { Link as RouterLink } from 'react-router-dom';
import MenuSetting from './MenuSetting';

export default function Sidebar({ sidebarItems }) {
    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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

    return (
        <Box sx={{ position: 'relative', boxSizing: 'border-box' }}>
            {/* Sidebar Content*/}
            <Box
                sx={{
                    p: 2,
                    pb: 1,
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: !isResizing && 'width 0.3s',
                    width: open ? width : 80,
                    borderRight: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                <List disablePadding sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 }}>
                    <ListItem component={RouterLink} to="/" sx={{ p: 1, display: 'flex' }}>
                        <ListItemIcon sx={{ ...centerSx, width: 1, maxWidth: 30, minWidth: 0, color: 'text.primary' }}>
                            <Pets />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ ml: 1, opacity: open ? 1 : 0, transition: 'opacity 0.3s' }}
                            slotProps={{ primary: { sx: textEllipsisSx, fontWeight: 500, fontSize: 20 } }}
                            primary="Petcare Admin"
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
                            <MenuSetting
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            />
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
