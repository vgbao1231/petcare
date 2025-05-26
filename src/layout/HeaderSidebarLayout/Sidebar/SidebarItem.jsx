import { ExpandMore } from '@mui/icons-material';
import { Box, Collapse, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { centerSx, textEllipsisSx } from '@src/theme';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const activeSx = { backgroundColor: 'background.hover', opacity: 1 };

const SidebarItem = ({ open, item, index }) => {
    const location = useLocation();
    const isActive = location.pathname === item.path;

    return (
        <Tooltip
            title={open ? null : item.label}
            slotProps={{
                tooltip: { sx: { fontSize: '12px' } },
                popper: { modifiers: [{ name: 'offset', options: { offset: [0, 12] } }] },
            }}
            arrow
            placement="right"
        >
            {item.children ? (
                <ExpandableSidebarItem open={open} item={item} index={index} />
            ) : (
                <ListItem
                    component={Link}
                    to={item.path}
                    button="true"
                    sx={{
                        p: 1,
                        borderRadius: 2,
                        transition: 'background-color 0.3s, opacity 0.3s',
                        ...(isActive ? activeSx : { opacity: 0.6 }),
                    }}
                >
                    <ListItemIcon sx={{ ...centerSx, width: 1, maxWidth: 30, minWidth: 0 }}>
                        <item.icon />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ ml: 1, opacity: open ? 1 : 0, transition: 'opacity 0.3s' }}
                        slotProps={{ primary: { sx: textEllipsisSx } }}
                        primary={item.label}
                    />
                </ListItem>
            )}
        </Tooltip>
    );
};

const ExpandableSidebarItem = forwardRef(({ open, item, index, ...props }, ref) => {
    const [openedItems, setOpenedItems] = useState({});
    const location = useLocation();

    const isActiveItem = useMemo(
        () => item.children.some(({ path }) => location.pathname === path),
        [item.children, location.pathname]
    );

    const isActiveSubItem = useCallback((path) => location.pathname === path, [location.pathname]);

    const handleOpenSidebarItem = useCallback((item) => {
        setOpenedItems((p) => ({ ...p, [item]: !p[item] }));
        // setOpenedItems((p) => ({ [item]: !p[item] })); // Mỗi lần chỉ mở rộng một cái
    }, []);

    return (
        <>
            <ListItem
                {...props}
                ref={ref}
                button="true"
                sx={{
                    p: 1,
                    borderRadius: 2,
                    transition: 'background-color 0.3s, opacity 0.3s',
                    ...(isActiveItem ? activeSx : { opacity: 0.6 }),
                }}
                onClick={() => handleOpenSidebarItem(index)}
            >
                <ListItemIcon sx={{ ...centerSx, width: 1, maxWidth: 30, minWidth: 0 }}>
                    <item.icon />
                </ListItemIcon>
                <ListItemText
                    sx={{ ml: 1, opacity: !open && 0, transition: 'opacity 0.3s' }}
                    slotProps={{ primary: { sx: textEllipsisSx } }}
                    primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{item.label}</Typography>
                            <ExpandMore
                                sx={{ transform: openedItems[index] && 'rotate(180deg)', transition: 'transform 0.3s' }}
                            />
                        </Box>
                    }
                />
            </ListItem>

            <Collapse in={openedItems[index] && open} sx={{ mx: -2 }}>
                <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {item.children.map((subItem, subIndex) => (
                        <ListItem
                            key={subIndex}
                            component={Link}
                            to={subItem.path}
                            button="true"
                            sx={{
                                p: 1,
                                pl: 4,
                                borderRadius: 2,
                                transition: 'background-color 0.3s, opacity 0.3s',
                                ...(isActiveSubItem(subItem.path) ? activeSx : { opacity: 0.6 }),
                            }}
                        >
                            <ListItemIcon sx={{ ...centerSx, width: 1, maxWidth: 30, minWidth: 0 }}>
                                <subItem.icon />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ ml: 1, opacity: !open && 0, transition: 'opacity 0.3s' }}
                                slotProps={{ primary: { sx: textEllipsisSx } }}
                                primary={subItem.label}
                            />
                        </ListItem>
                    ))}
                </Box>
            </Collapse>
        </>
    );
});

ExpandableSidebarItem.displayName = 'ExpandableSidebarItem';

export default SidebarItem;
