import { Box, Card, CardContent, Typography } from '@mui/material';

const PolicyCard = ({ icon, name, description }) => {
    return (
        <Card
            sx={{
                flex: 1,
                borderRadius: 2,
            }}
            elevation={2}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                }}
            >
                {icon}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PolicyCard;
