import { Box, Dialog, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import { Close } from '@mui/icons-material';

const ProfileDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 600 } } }}>
            {/* Tiêu đề */}
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 18 }}>
                        My Profile
                    </Typography>
                    <IconButton size="small" onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Manage your account information and preferences
                </Typography>
            </DialogTitle>

            {/* Nội dung */}
            <DialogContent>
                <Tabs
                    variant="fullWidth"
                    value={tabIndex}
                    onChange={(_, newIndex) => setTabIndex(newIndex)}
                    sx={{ minHeight: 32 }}
                >
                    <Tab sx={{ minHeight: 32, p: 0.5, textTransform: 'none' }} label="Personal Info" />
                    <Tab sx={{ minHeight: 32, p: 0.5, textTransform: 'none' }} label="Security" />
                    <Tab sx={{ minHeight: 32, p: 0.5, textTransform: 'none' }} label="Payment Methods" />
                </Tabs>

                {/* Nội dung của từng tab */}
                <Box sx={{ mt: 2 }}>
                    {tabIndex === 0 && <ProfileTab />}
                    {tabIndex === 1 && <SecurityTab />}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDialog;
