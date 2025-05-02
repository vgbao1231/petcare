import { AddCircleOutline, AssignmentOutlined, CalendarTodayOutlined, DeleteOutlined, Pets } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx, textEllipsisSx } from '@src/theme';
import { genAvatarColor } from '@src/utils/helpers';
import { useCallback, useMemo, useState } from 'react';
import VaccineHistoryTab from './VaccineHistoryTab';
import MedicalRecordTab from './MedicalRecordTab';
import { Edit, Syringe } from 'lucide-react';
import PetInformationDialog from './PetInformationDialog';

const petsArray = [
    {
        pet_id: 'p001',
        owner_id: '2',
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        height: 60, // cm
        weight: 30, // kg
        identifier: 'BD123456',
        color: 'Golden',
        medical_history: [
            {
                id: 'mh001',
                date: '2024-02-10',
                diagnosis: 'Ear infection',
                treatment: 'Antibiotics',
                vet: 'Dr. Smith',
                note: 'Clean every day',
            },
            {
                id: 'mh002',
                date: '2024-03-01',
                diagnosis: 'Vaccination',
                treatment: 'Rabies',
                vet: 'Dr. Smith',
                note: '3-year vaccine',
            },
            {
                id: 'mh003',
                date: '2023-06-01',
                diagnosis: 'Vaccination',
                treatment: 'Parvovirus',
                vet: 'Dr. John',
                note: '1-year vaccine',
            },
        ],
        vaccination_reminders: [
            {
                id: 'vr001',
                date: '2025-06-01',
                vaccine: 'Rabies',
                status: 'Pending',
            },
        ],
    },
    {
        pet_id: 'p002',
        owner_id: '3',
        name: 'Mittens',
        species: 'Cat',
        breed: 'Persian',
        height: 25,
        weight: 4.5,
        identifier: 'MT654321',
        color: 'White',
        medical_history: [
            {
                id: 'mh004',
                date: '2023-11-12',
                diagnosis: 'Check-up',
                treatment: 'General examination',
                vet: 'Dr. Jane',
            },
            {
                id: 'mh005',
                date: '2024-07-01',
                diagnosis: 'Vaccination',
                treatment: 'Feline Distemper',
                vet: 'Dr. Jane',
                note: '1-year vaccine',
            },
        ],
        vaccination_reminders: [
            {
                id: 'vr002',
                date: '2025-07-01',
                vaccine: 'Feline Distemper',
                status: 'Scheduled',
            },
        ],
    },
    {
        pet_id: 'p003',
        owner_id: '4',
        name: 'Rocky',
        species: 'Dog',
        breed: 'Bulldog',
        height: 40,
        weight: 24,
        identifier: 'RK789012',
        color: 'Brindle',
        medical_history: [
            {
                id: 'mh006',
                date: '2023-09-05',
                diagnosis: 'Skin allergy',
                treatment: 'Ointment',
                vet: 'Dr. Mike',
            },
            {
                id: 'mh007',
                date: '2024-08-01',
                diagnosis: 'Vaccination',
                treatment: 'Parvovirus',
                vet: 'Dr. Mike',
                note: '1-year vaccine',
            },
        ],
        vaccination_reminders: [
            {
                id: 'vr003',
                date: '2025-08-20',
                vaccine: 'Parvovirus',
                status: 'Pending',
            },
        ],
    },
];

const PetTrackingPage = () => {
    const [currentPetIndex, setCurrentPetIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = useCallback((index) => setCurrentTab(index), []);
    const { userInfo } = useAuth();
    const theme = useTheme();
    const [open, setOpen] = useState(); // undefined / add / edit

    const currentPet = useMemo(() => petsArray[currentPetIndex], [currentPetIndex]);

    const upcomingVaccines = currentPet.vaccination_reminders
        .filter((vac) => new Date(vac.date) > new Date())
        .map((vac) => {
            const pastVaccines = currentPet.medical_history.filter((hist) =>
                hist.treatment?.toLowerCase().includes(vac.vaccine.toLowerCase())
            );

            const lastVaccinatedDate = pastVaccines.length
                ? new Date(Math.max(...pastVaccines.map((h) => new Date(h.date))))
                : null;

            return {
                ...vac,
                lastVaccinatedDate: lastVaccinatedDate ? lastVaccinatedDate.toLocaleDateString('vi-VN') : null,
            };
        });

    const vaccinationHistory = currentPet.medical_history.filter((record) => record.diagnosis === 'Vaccination');

    return (
        <Box sx={{ pt: 12, px: 20, pb: 5 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', mb: 2.5 }}>
                <Typography fontSize={24} fontWeight="bold">
                    Pet Tracking Dashboard
                </Typography>

                {/* Pets Selection */}
                <Select
                    sx={{ fontSize: '14px', minWidth: 180, bgcolor: 'background.paper', ml: 'auto', mr: 2 }}
                    value={currentPetIndex}
                    onChange={(e) => setCurrentPetIndex(e.target.value)}
                    size="small"
                >
                    {petsArray.map((p, i) => (
                        <MenuItem key={i} value={i}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddCircleOutline />}
                    onClick={() => setOpen('add')}
                    sx={{ textTransform: 'none' }}
                >
                    Add Pet
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Pet Info */}
                <Box
                    sx={{
                        alignSelf: 'start',
                        minWidth: 320,
                        border: 1,
                        borderColor: 'divider',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h3" fontSize={20} fontWeight={500}>
                                {currentPet.name}
                            </Typography>
                            <Chip
                                color="blue"
                                label={currentPet.species}
                                variant="outlined"
                                icon={<Pets sx={{ fontSize: 14, mb: 0.25, ml: 2 }} />}
                                sx={{
                                    bgcolor: 'blue.bgcolor',
                                    height: 'auto',
                                    '.MuiChip-icon': {
                                        ml: 0.75,
                                    },
                                }}
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            ID: {currentPet.pet_id}
                        </Typography>
                        <Box sx={{ px: 4, pt: 1 }}>
                            <Stack alignItems="center" spacing={1} mb={1}>
                                <Avatar src="/src/assets/gura.jpg" sx={{ width: 100, height: 100 }} />
                                <Typography variant="h3" fontSize={20} fontWeight={500}>
                                    {currentPet.name}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" fontWeight={500}>
                                    Breed:
                                </Typography>
                                <Typography variant="body2">{currentPet.breed}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" fontWeight={500}>
                                    Color:
                                </Typography>
                                <Typography variant="body2">{currentPet.color}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" fontWeight={500}>
                                    Weight:
                                </Typography>
                                <Typography variant="body2">{currentPet.weight} kg</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" fontWeight={500}>
                                    Height:
                                </Typography>
                                <Typography variant="body2">{currentPet.height} cm</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" fontWeight={500}>
                                    Identifier:
                                </Typography>
                                <Typography variant="body2">{currentPet.identifier}</Typography>
                            </Stack>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Owner
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <ListItemAvatar sx={{ minWidth: 44 }}>
                                <Avatar
                                    alt="Avatar"
                                    sx={{
                                        bgcolor: genAvatarColor(userInfo?.name),
                                        color: '#fff',
                                        width: 34,
                                        height: 34,
                                    }}
                                >
                                    {userInfo?.name?.[0] || 'C'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={userInfo?.name || 'Customer'}
                                secondary={userInfo?.phone || '0123123123'}
                                slotProps={{
                                    primary: { sx: { fontWeight: 500, ...textEllipsisSx, lineHeight: 1.2 } },
                                    secondary: { sx: textEllipsisSx },
                                }}
                                sx={{ m: 0 }}
                            />
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography fontWeight={500} mb={2}>
                            <Syringe
                                color={theme.palette.primary.light}
                                size={20}
                                style={{ verticalAlign: 'middle', marginRight: 8 }}
                            />
                            Upcoming Vaccinations
                        </Typography>
                        <Stack spacing={2}>
                            {upcomingVaccines.map((v, i) => (
                                <Box key={i} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography fontWeight={500}>{v.vaccine}</Typography>
                                        <Chip
                                            label="Up Coming"
                                            size="small"
                                            variant="outlined"
                                            sx={{ bgcolor: '#fff7eb', color: '#e69500', borderColor: '#e69500' }}
                                        />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        <CalendarTodayOutlined
                                            sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }}
                                        />
                                        {new Date(v.lastVaccinatedDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography variant="body2" color="error.main">
                                        <CalendarTodayOutlined
                                            sx={{ fontSize: 14, verticalAlign: 'middle', mb: 0.2, mr: 0.5 }}
                                        />
                                        Due: {new Date(v.date).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4, pt: 2, float: 'bottom' }}>
                        <Button
                            variant="outlined"
                            color="common"
                            sx={{ textTransform: 'none', flex: 1 }}
                            startIcon={<Edit size={16} />}
                            onClick={() => setOpen('edit')}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: 'none', flex: 1 }}
                            startIcon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>

                {/* Tab Content */}
                <Stack spacing={2} sx={{ flex: 1 }}>
                    <Box sx={{ bgcolor: 'grey.100', p: 0.6, borderRadius: 2, ...centerSx, gap: 2, alignSelf: 'start' }}>
                        {['Medical Records', 'Vaccination History'].map((tab, index) => (
                            <Box
                                key={index}
                                sx={{
                                    px: 2,
                                    py: 0.5,
                                    bgcolor: index === currentTab ? '#fff' : 'none',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    ':hover': {
                                        bgcolor: index === currentTab ? 'none' : '#fafafa',
                                    },
                                }}
                                onClick={() => handleClick(index)}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={index === currentTab ? 500 : undefined}
                                    sx={{ color: index === currentTab ? undefined : 'text.secondary' }}
                                >
                                    {index === 0 ? (
                                        <AssignmentOutlined fontSize="small" sx={{ verticalAlign: 'top', mr: 1 }} />
                                    ) : (
                                        <Syringe size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                                    )}
                                    {tab}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            border: 1,
                            borderColor: 'divider',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                        }}
                    >
                        {currentTab === 0 ? (
                            <MedicalRecordTab medicalHistory={currentPet.medical_history} />
                        ) : (
                            <VaccineHistoryTab
                                upcomingVaccines={upcomingVaccines}
                                vaccinationHistory={vaccinationHistory}
                            />
                        )}
                    </Box>
                </Stack>
            </Box>
            {!!open && (
                <PetInformationDialog
                    open={!!open}
                    onClose={() => setOpen()}
                    formData={open === 'edit' ? currentPet : undefined}
                />
            )}
        </Box>
    );
};

export default PetTrackingPage;
