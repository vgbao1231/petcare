import { EmailOutlined, LocalPhoneOutlined, PersonOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';

const petsArray = [
    { id: '1', img: '/src/assets/gura.jpg', name: 'Gura' },
    { id: '2', img: '/src/assets/gura.jpg', name: 'Goob' },
    { id: '3', img: '/src/assets/gura.jpg', name: 'Goomba' },
];

const PetTrackingPage = () => {
    const [currentPet, setCurrentPet] = useState(0);
    return (
        <Box sx={{ pt: 12, px: 20, pb: 5 }}>
            <Typography fontSize={30} fontWeight="bold">
                Pet Tracking Dashboard
            </Typography>

            {/* Pets Selection */}
            <Box sx={{ display: 'flex', gap: 2, my: 2, mt: 1 }}>
                {petsArray.map(({ id, img, name }, index) => (
                    <Chip
                        key={id}
                        variant={index === currentPet ? 'filled' : 'outlined'}
                        avatar={<Avatar src={img} />}
                        label={name}
                        color="brand"
                        sx={{ bgcolor: index !== currentPet ? 'background.paper' : 'none', px: 1 }}
                        onClick={() => setCurrentPet(index)}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Pet Info */}
                <Box
                    sx={{
                        minWidth: 300,
                        border: 1,
                        borderColor: 'grey.300',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Typography fontSize={18} sx={{ alignSelf: 'start' }} fontWeight={500}>
                            Pet Information
                        </Typography>
                        <Avatar sx={{ width: 100, height: 100 }} />
                        <Typography>{petsArray[currentPet].name}</Typography>
                        <Chip
                            color="brand"
                            label={petsArray[currentPet].name}
                            size="small"
                            variant="outlined"
                            sx={{ bgcolor: 'brand.bgcolor' }}
                        />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography fontSize={18} fontWeight={500}>
                            Owner Information
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'brand.bgcolor' }}>
                                        <PersonOutlined sx={{ color: 'brand.light' }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'brand.bgcolor' }}>
                                        <LocalPhoneOutlined sx={{ color: 'brand.light' }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'brand.bgcolor' }}>
                                        <EmailOutlined sx={{ color: 'brand.light' }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>

                {/* Current Services */}
                <Box
                    sx={{
                        flex: 1,
                        border: 1,
                        borderColor: 'grey.300',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Typography fontSize={18} sx={{ alignSelf: 'start' }} fontWeight={500}>
                        Pet Information
                    </Typography>
                    <Typography fontSize={14} color="text.secondary" sx={{ alignSelf: 'start' }}>
                        Services currently being provided to Max
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PetTrackingPage;
