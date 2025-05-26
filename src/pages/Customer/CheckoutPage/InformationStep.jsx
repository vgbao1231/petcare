import { Box, Button, Grid2, Typography, Alert, AlertTitle } from '@mui/material';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { checkIsAlphabetic, checkIsEmail, checkIsPhoneNumber } from '@src/utils/validators';

const InformationStep = () => {
    return (
        <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Customer Information
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <FormInput
                        sx={{ bgcolor: 'background.paper' }}
                        name="firstName"
                        fullWidth
                        label="First Name"
                        rules={{
                            required: 'Please enter your first name',
                            validate: (v) => checkIsAlphabetic(v) || 'Invalid Name',
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <FormInput
                        sx={{ bgcolor: 'background.paper' }}
                        name="lastName"
                        fullWidth
                        label="Last Name"
                        rules={{
                            required: 'Please enter your last name',
                            validate: (v) => checkIsAlphabetic(v) || 'Invalid Name',
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <FormInput
                        sx={{ bgcolor: 'background.paper' }}
                        name="email"
                        fullWidth
                        label="Email Address"
                        rules={{
                            required: 'Please enter your email',
                            validate: (v) => checkIsEmail(v) || 'Invalid Email',
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <FormInput
                        sx={{ bgcolor: 'background.paper' }}
                        name="phone"
                        fullWidth
                        label="Phone Number"
                        rules={{
                            required: 'Please enter your name',
                            validate: (v) => checkIsPhoneNumber(v) || 'Invalid Phone Number',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Box mt={3}>
                <Alert severity="info">
                    <AlertTitle>Why we need your information</AlertTitle>
                    {
                        "We'll use your contact details to send order confirmations and updates. Your phone number will be used by our staff to coordinate delivery or pickup."
                    }
                </Alert>
            </Box>

            <Box mt={4} display="flex" justifyContent="space-between">
                <Button component={Link} to="/cart" variant="outlined" startIcon={<ArrowBack />}>
                    Back to Cart
                </Button>
                <Button variant="contained" endIcon={<ArrowForward />} type="submit">
                    Continue
                </Button>
            </Box>
        </>
    );
};

export default InformationStep;
