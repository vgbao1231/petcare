import { Person } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { routesConfig } from '@src/configs/routesConfig';
import { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuSetting from '../Sidebar/MenuSetting';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const title = routesConfig.admin.find((r) => r.path === location.pathname).label;

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    return (
        <Box
            sx={{
                width: 1,
                zIndex: 10,
                px: 4,
                py: 1,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h6">
                {title} {!['/'].includes(location.pathname) ? ' Management' : null}
            </Typography>
            <IconButton size="small" onClick={handleClick}>
                <Person />
            </IconButton>
            <MenuSetting
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </Box>
    );
};

export default memo(Header);
