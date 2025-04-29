import { Typography, Divider, Box, Stack, Avatar, DialogContent, DialogActions, Button } from '@mui/material';
import { Close, Edit, Person } from '@mui/icons-material';
const ViewMode = ({ setEditMode }) => {
    return (
        <>
            <DialogContent sx={{ maxHeight: 420, overflowY: 'auto', pb: 0 }}>
                <Typography variant="body2" fontWeight={500}>
                    Appointment Type
                </Typography>
                <Typography mb={1}>In-Store Visit</Typography>
                <Typography variant="body2" fontWeight={500}>
                    Date & Time
                </Typography>
                <Typography mb={1}>2023-07-20 at 10:00 AM</Typography>
                <Typography variant="body2" fontWeight={500}>
                    Location
                </Typography>
                <Typography>Downtown Branch</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                    123 Main St, City Center
                </Typography>
                <Stack spacing={0.5} mb={1}>
                    <Typography variant="body2" fontWeight={500}>
                        Services
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">Pet Grooming</Typography>
                        <Typography variant="body2">$50.00</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">Health Check-up</Typography>
                        <Typography variant="body2">$75.00</Typography>
                    </Box>
                </Stack>
                <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight={500}>
                        Products
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">Premium Dog Food</Typography>
                        <Typography variant="body2">$29.99</Typography>
                    </Box>
                </Stack>
                <Divider sx={{ my: 1.5 }} />
                <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight={500}>Total Amount</Typography>
                    <Typography fontWeight={500}>$154.99</Typography>
                </Box>
                <Box my={1}>
                    <Typography variant="body2" fontWeight={500} mb={0.5}>
                        Staff
                    </Typography>
                    {/* <Typography>Dr. Michael Chen</Typography> */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar>
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography>Dr. Michael Chen</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Veterinarian
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography variant="body2" fontWeight={500}>
                    Notes
                </Typography>
                <Typography variant="body2">Please bring vaccination records</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Close />}
                    sx={{ textTransform: 'none' }}
                    onClick={() => setEditMode((p) => !p)}
                >
                    Cancel Appointment
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    startIcon={<Edit />}
                    sx={{ textTransform: 'none' }}
                    onClick={() => setEditMode(true)}
                >
                    Edit
                </Button>
            </DialogActions>
        </>
    );
};

export default ViewMode;
