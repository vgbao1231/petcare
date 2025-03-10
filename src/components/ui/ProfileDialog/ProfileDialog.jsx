import { Edit } from '@mui/icons-material';
import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography } from '@mui/material';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ProfileDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                <Tabs variant="fullWidth" value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
                    <Tab label="Personal Info" />
                    <Tab label="Security" />
                    <Tab label="Payment Methods" />
                </Tabs>

                {/* Nội dung của từng tab */}
                <Box sx={{ mt: 2 }}>{tabIndex === 0 && <ProfileForm />}</Box>
            </DialogContent>
        </Dialog>
    );
};

const ProfileForm = () => {
    const methods = useForm({ mode: 'all' });
    return (
        <Box>
            {/* Avatar và nút chỉnh sửa */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 2 }} />
                <IconButton>
                    <Edit />
                </IconButton>
            </Box>

            {/* Form nhập thông tin */}
            <FormProvider {...methods}>
                <FormInput name="name" value="John Doe" fullWidth margin="normal" disabled />
                <FormInput name="email" value="john.doe@example.com" fullWidth margin="normal" disabled />
                <FormInput name="phone" value="+1 (555) 123-4567" fullWidth margin="normal" disabled />
                <FormInput
                    name="address"
                    value="123 Pet Street, Animalia, CA 90210"
                    fullWidth
                    margin="normal"
                    disabled
                />
            </FormProvider>
        </Box>
    );
};

export default ProfileDialog;
