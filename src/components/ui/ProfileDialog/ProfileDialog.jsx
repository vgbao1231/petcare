import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Tab, Tabs, Typography } from '@mui/material';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ProfileDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 600 } } }}>
            {/* Tiêu đề */}
            <DialogTitle>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 18 }}>
                    My Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage your account information and preferences
                </Typography>
                {/* <IconButton onClick={onClose}>
                    <Close />
                </IconButton> */}
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
                <Box sx={{ mt: 2 }}>{tabIndex === 0 && <ProfileTab />}</Box>
            </DialogContent>
        </Dialog>
    );
};

const ProfileTab = () => {
    const methods = useForm({
        defaultValues: { name: 'Bao Vo', email: 'vgbao1231@gmail.com', phone: '0123456789', address: 'Nha Trang' },
        mode: 'all',
    });
    return (
        <>
            <Typography fontWeight={500} m={1}>
                Personal Information
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Avatar và nút chỉnh sửa */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: 300, gap: 2, mt: 2 }}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                    <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Change Photo
                    </Button>
                </Box>

                {/* Form nhập thông tin */}
                <Box>
                    <FormProvider {...methods}>
                        <FormInput label="Name" name="name" fullWidth margin="normal" />
                        <FormInput label="Email" name="email" fullWidth margin="normal" />
                        <FormInput label="Phone" name="phone" fullWidth margin="normal" />
                        <FormInput label="Address" name="address" fullWidth margin="normal" />
                        <Button
                            variant="contained"
                            color="brand"
                            size="small"
                            sx={{ textTransform: 'none', float: 'right', mt: 2 }}
                        >
                            Save Changes
                        </Button>
                    </FormProvider>
                </Box>
            </Box>
        </>
    );
};

export default ProfileDialog;
