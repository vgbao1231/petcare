import { Box, Divider, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import InformationStep from './InformationStep';
import ConfirmStep from './ConfirmStep';
import { useCart } from '@src/hooks/useCart';
import ProductCard from './ProductCard';
import { AssignmentTurnedInOutlined, Check, ListAlt, Person } from '@mui/icons-material';
import { centerSx } from '@src/theme';
import DeliveryStep from './DeliveryStep';
import { FormProvider, useForm } from 'react-hook-form';

const steps = [
    { label: 'Information', sub: 'Customer', icon: <Person /> },
    { label: 'Delivery', sub: 'Delivery Method', icon: <ListAlt /> },
    { label: 'Confirmation', sub: 'Order Complete', icon: <AssignmentTurnedInOutlined /> },
];

const CustomStepIcon = (props) => {
    const { active, completed, icon } = props;
    const index = Number(icon) - 1;

    return (
        <Box
            sx={{
                zIndex: 1,
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: active || completed ? 'primary.main' : 'background.default',
                border: '2px solid',
                borderColor: active || completed ? 'primary.main' : 'divider',
                color: active || completed ? 'white' : 'grey',
                ...centerSx,
            }}
        >
            {completed ? <Check /> : steps[index].icon}
        </Box>
    );
};

const CustomConnector = (props) => (
    <StepConnector
        {...props}
        sx={{
            '&.MuiStepConnector-alternativeLabel': { top: 24 },
            '& .MuiStepConnector-line': { height: 2, bgcolor: '#e0e0e0', border: 0, borderRadius: 1 },
            [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: { backgroundColor: 'primary.light' },
        }}
    />
);

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { cart } = useCart();
    const methods = useForm({ mode: 'all' });

    const subTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const shippingCost = 5;
    const tax = useMemo(() => subTotal * 0.08, [subTotal]);
    const total = useMemo(() => subTotal + shippingCost + tax, [subTotal, shippingCost, tax]);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const stepsContent = [
        <InformationStep key={0} activeStep={activeStep} handleNext={handleNext} />,
        <DeliveryStep key={1} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />,
        <ConfirmStep key={2} activeStep={activeStep} handleBack={handleBack} />,
    ];

    return (
        <Box sx={{ pt: 12, px: 32 }}>
            <Stepper activeStep={activeStep} connector={<CustomConnector />} alternativeLabel sx={{ m: 2 }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            slots={{ stepIcon: CustomStepIcon }}
                            sx={{ '.MuiStepLabel-label.MuiStepLabel-alternativeLabel': { mt: 0.5 } }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    sx={{
                                        fontWeight: activeStep === index ? 600 : 500,
                                        color: activeStep === index ? 'primary.light' : 'text.secondary',
                                    }}
                                >
                                    {step.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {step.sub}
                                </Typography>
                            </Box>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <FormProvider {...methods}>
                    <Box sx={{ flex: 1, p: 3, pt: 0 }}>{stepsContent[activeStep]}</Box>
                </FormProvider>
                <Box
                    sx={{
                        alignSelf: 'flex-start',
                        minWidth: 320,
                        p: 3,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Typography variant="h6" fontWeight={500} mb={1}>
                        Order Summary
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {cart.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                sx={{ borderTop: index !== 0 ? 1 : 0, borderColor: 'divider', p: 2 }}
                            />
                        ))}
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.secondary">Subtotal: </Typography>
                            <Typography>${subTotal.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.secondary">Shipping: </Typography>
                            <Typography>${shippingCost.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.secondary">Tax: </Typography>
                            <Typography>${tax.toFixed(2)}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={500}>Total: </Typography>
                            <Typography fontWeight={500}>${total.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CheckoutPage;
