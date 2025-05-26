import { Box, Radio, RadioGroup, FormControlLabel, Typography, Button } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import { useState } from 'react';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { useBranch } from '@src/hooks/useBranch';

const DeliveryStep = ({ setActiveStep }) => {
    const [method, setMethod] = useState('delivery');
    const { branches } = useBranch();

    return (
        <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
            {/* Staff Delivery */}
            <Box
                sx={{
                    border: 1,
                    mb: 2,
                    borderColor: method === 'delivery' ? 'primary.main' : 'divider',
                    borderRadius: 2,
                }}
            >
                <FormControlLabel
                    sx={{ width: 1, p: 0, m: 0 }}
                    value="delivery"
                    slotProps={{ typography: { sx: { width: 1, p: 2, pl: 0 } } }}
                    control={<Radio sx={{ color: 'primary.main' }} />}
                    label={
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocalShippingIcon sx={{ color: 'primary.main', mr: 1 }} />
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Staff Delivery
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Our staff will deliver your order to your address
                            </Typography>
                            {method === 'delivery' && (
                                <Box mt={2}>
                                    <Typography variant="body2" fontWeight={500} mb={1}>
                                        Delivery Address *
                                    </Typography>
                                    <FormInput
                                        fullWidth
                                        name="address"
                                        sx={{ mb: 2 }}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        rules={{ required: 'Please enter your address' }}
                                        placeholder="Enter your address"
                                    />
                                </Box>
                            )}
                        </>
                    }
                />
            </Box>

            {/* Store Pickup */}
            <Box
                sx={{
                    borderRadius: 2,
                    border: 1,
                    borderColor: method === 'pickup' ? 'primary.main' : 'divider',
                }}
            >
                <FormControlLabel
                    sx={{ width: 1, p: 0, m: 0 }}
                    slotProps={{ typography: { sx: { width: 1, p: 2, pl: 0 } } }}
                    value="pickup"
                    control={<Radio sx={{ color: 'primary.main' }} />}
                    label={
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <StoreIcon sx={{ color: 'primary.main', mr: 1 }} />
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Store Pickup
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Pick up your order from one of our store branches
                            </Typography>
                            {method === 'pickup' && (
                                <Box mt={2}>
                                    <Typography variant="body2" fontWeight={500} mb={1}>
                                        Select Store Branch *
                                    </Typography>
                                    <FormSelect
                                        name="branch"
                                        fullWidth
                                        options={branches.map((b) => ({ value: b.id, label: b.location }))}
                                        sx={{ mb: 2 }}
                                        placeholder="Select a store branch"
                                    />
                                </Box>
                            )}
                        </>
                    }
                />
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
                <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => setActiveStep((prev) => prev - 1)}>
                    Back
                </Button>
                <Button variant="contained" endIcon={<ArrowForward />} type="submit">
                    Confirm
                </Button>
            </Box>
        </RadioGroup>
    );
};

export default DeliveryStep;
