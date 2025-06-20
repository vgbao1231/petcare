import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Link, Box } from '@mui/material';
import { useState } from 'react';

const ListText = ({ text }) => (
    <Typography variant="body2" sx={{ pl: 2, mb: 0.5, lineHeight: 1.6 }}>
        • {text}
    </Typography>
);

const TermsDialog = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Link component="button" type="button" onClick={handleOpen} underline="always" color="primary">
                Terms & Conditions
            </Link>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth
                scroll="paper"
                sx={{ '& .MuiDialog-paper': { width: 620 } }}
            >
                <DialogTitle>
                    <Typography fontSize={22} fontWeight={700} color="primary.main">
                        Terms & Conditions – Pet Care Services
                    </Typography>
                    <Typography fontSize={14} color="text.secondary" sx={{ ml: 0.4 }}>
                        Please read these terms carefully before booking our services.
                    </Typography>
                </DialogTitle>

                <DialogContent dividers sx={{ typography: 'body1' }}>
                    {/* Appointment Policy */}
                    <Typography variant="subtitle1" fontWeight="bold">
                        1. Appointment Policy
                    </Typography>
                    <Box>
                        <ListText text="Please make sure to arrive on time for your scheduled appointment to ensure smooth service." />
                        <ListText text="If you need to cancel or reschedule, kindly notify us at least 2 hours in advance." />
                        <ListText text="The duration of services typically ranges from 1 to 3 hours depending on the type of pet and service." />
                    </Box>

                    {/* Important Notes */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        2. Important Notes
                    </Typography>
                    <Box>
                        <ListText text="All pets must be fully vaccinated and up-to-date with required shots before receiving services." />
                        <ListText text="Please inform us in advance about any health conditions, allergies, or behavioral concerns your pet may have." />
                        <ListText text="We do not assume responsibility for any pre-existing medical or behavioral issues." />
                    </Box>

                    {/* Payment Policy */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        3. Payment Policy
                    </Typography>
                    <Box>
                        <ListText text="All payments are required immediately after the completion of the service." />
                        <ListText text="We currently accept both cash and card payments at the store." />
                        <ListText text="Service charges may vary depending on your pet’s condition or any extra care needed." />
                    </Box>

                    {/* Quality Guarantee */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        4. Quality Guarantee
                    </Typography>
                    <Box>
                        <ListText text="Our team consists of trained, experienced, and caring professionals." />
                        <ListText text="We are committed to using only safe, premium-quality products during the service." />
                        <ListText text="If you're not satisfied, we offer a 7-day guarantee to address any concerns." />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TermsDialog;
