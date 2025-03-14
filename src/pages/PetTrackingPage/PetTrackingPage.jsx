import { Avatar, Box, Chip, Typography } from '@mui/material';
import { useState } from 'react';

const petsArray = [
    { id: '1', img: '/src/assets/gura.jpg', name: 'Gura' },
    { id: '2', img: '/src/assets/gura.jpg', name: 'Goob' },
    { id: '3', img: '/src/assets/gura.jpg', name: 'Goomba' },
];

const PetTrackingPage = () => {
    const [currentPet, setCurrentPet] = useState();
    return (
        <Box sx={{ pt: 15, px: 20, pb: 5 }}>
            <Typography variant="h4" fontWeight="bold">
                Pet Tracking Dashboard
            </Typography>

            {/* Pets Selection */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                {petsArray.map(({ id, img, name }) => (
                    <Chip
                        key={id}
                        variant={id == currentPet ? 'filled' : 'outlined'}
                        avatar={<Avatar src={img} />}
                        label={name}
                        color="brand"
                        onClick={() => setCurrentPet(id)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default PetTrackingPage;
