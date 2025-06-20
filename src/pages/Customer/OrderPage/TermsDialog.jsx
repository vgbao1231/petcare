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
                sx={{ '& .MuiDialog-paper': { width: 520 } }}
            >
                <DialogTitle>
                    <Typography fontSize={22} fontWeight={700} color="primary.main">
                        Terms & Conditions – Pet Care
                    </Typography>
                    <Typography fontSize={14} color="text.secondary" sx={{ ml: 0.4 }}>
                        Please read these terms carefully before order our products.
                    </Typography>
                </DialogTitle>

                <DialogContent dividers sx={{ typography: 'body1' }}>
                    {/* Section 1 */}
                    <Typography variant="subtitle1" fontWeight="bold">
                        1. Pickup Time
                    </Typography>
                    <Box>
                        <ListText text="You may select a pickup time during store operating hours." />
                        <ListText text="Please arrive on time to ensure a smooth handover." />
                    </Box>

                    {/* Section 2 */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        2. Order Holding Policy
                    </Typography>
                    <Box>
                        <ListText text="Orders will be held for a maximum of 2 hours from your selected pickup time." />
                        <ListText text="If not picked up within this time frame, the order will be automatically canceled." />
                    </Box>

                    {/* Section 3 */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        3. Late Arrivals
                    </Typography>
                    <Box>
                        <ListText text="If you're running late, please call us before the holding period ends to request an extension." />
                    </Box>

                    {/* Section 4 */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        4. Payment
                    </Typography>
                    <Box>
                        <ListText text="Payment can be made in-store via cash or bank transfer." />
                        <ListText text="If payment is made in advance but the order is not picked up on time without notice, it may still be canceled without refund." />
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
