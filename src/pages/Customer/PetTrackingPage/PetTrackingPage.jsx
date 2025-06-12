import {
    Add,
    AddCircleOutline,
    AssignmentOutlined,
    DeleteForeverOutlined,
    Pets,
    PetsOutlined,
} from '@mui/icons-material';
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
} from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx, textEllipsisSx } from '@src/theme';
import { genAvatarColor } from '@src/utils/helpers';
import { useCallback, useState } from 'react';
import VaccineHistoryTab from './VaccineHistoryTab';
import ExaminationRecordTab from './ExaminationRecordTab';
import { Calendar, Dog, Edit, IdCard, Palette, Syringe, Weight } from 'lucide-react';
import PetInformationDialog from './PetInformationDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { petServices } from '@services/petServices';
import ConfirmDialog from '@ui/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';

const PetTrackingPage = () => {
    const [currentPetIndex, setCurrentPetIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = useCallback((index) => setCurrentTab(index), []);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [open, setOpen] = useState(); // undefined / add / edit
    const queryClient = useQueryClient();
    const { userInfo } = useAuth();

    const { data: petsArray = [], isLoading } = useQuery({
        queryKey: ['pets', userInfo.userId],
        queryFn: () => petServices.getPetsByOwner(userInfo.userId),
        enabled: !!userInfo.userId,
    });

    const currentPet = petsArray.map((p) => ({ ...p, dob: p.Dob }))[currentPetIndex] ?? null;
    console.log(currentPet);

    const { mutate: deletePet } = useMutation({
        mutationFn: (petId) => petServices.deletePet(petId),
        onError: () => toast.error('Failed to delete pet'),
        onSuccess: () => {
            toast.success('Delete pet successfully');
            queryClient.invalidateQueries({ queryKey: ['pets', userInfo.userId] });
            setCurrentPetIndex(0);
        },
    });

    return (
        <Box sx={{ pt: 12, px: 20, pb: 5 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', mb: 2.5 }}>
                <Typography fontSize={24} fontWeight="bold">
                    Pet Tracking
                </Typography>

                {/* Pets Selection */}
                <Select
                    sx={{ fontSize: '14px', minWidth: 180, bgcolor: 'background.paper', ml: 'auto', mr: 2 }}
                    value={petsArray.length ? currentPetIndex : ''}
                    onChange={(e) => setCurrentPetIndex(e.target.value)}
                    size="small"
                    disabled={petsArray.length === 0}
                    displayEmpty
                >
                    {petsArray.length === 0 ? (
                        <MenuItem value="" disabled>
                            No pets available
                        </MenuItem>
                    ) : (
                        petsArray.map((p, i) => (
                            <MenuItem key={i} value={i}>
                                {p.name}
                            </MenuItem>
                        ))
                    )}
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

            {isLoading ? (
                <Typography>Loading pet data...</Typography>
            ) : petsArray.length === 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    sx={{ py: 4 }}
                >
                    {/* Icon vòng tròn */}
                    <Box
                        sx={{
                            bgcolor: 'primary.bgcolor',
                            borderRadius: '50%',
                            p: 3,
                            mb: 3,
                            width: 80,
                            height: 80,
                            ...centerSx,
                        }}
                    >
                        <PetsOutlined sx={{ fontSize: 36 }} color="primary" />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        No Pets Added Yet
                    </Typography>
                    <Typography color="text.secondary" maxWidth={420} mb={3}>
                        Start tracking your pet&apos;s medical records, vaccinations, and health history by adding your
                        first pet to the system.
                    </Typography>

                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<Add />}
                        onClick={() => setOpen('add')}
                        sx={{ textTransform: 'none', mb: 4 }}
                    >
                        Add Your First Pet
                    </Button>

                    <Box>
                        <Typography fontWeight="bold" gutterBottom>
                            What you can track:
                        </Typography>
                        <Stack spacing={1} alignItems="flex-start">
                            <Typography>📋 Complete medical history and treatments</Typography>
                            <Typography>💉 Vaccination schedules and reminders</Typography>
                            <Typography>📅 Appointment history and upcoming visits</Typography>
                            <Typography>📈 Growth tracking and health metrics</Typography>
                        </Stack>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', gap: 4 }}>
                    {/* Pet Info */}
                    <Box
                        sx={{
                            alignSelf: 'start',
                            minWidth: 360,
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
                                ID: {currentPet.id}
                            </Typography>
                            <Box sx={{ px: 8, pt: 1 }}>
                                <Stack alignItems="center" spacing={1} mb={1}>
                                    <Avatar
                                        src="/src/assets/login-background/login8.png"
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <Typography variant="h3" fontSize={20} fontWeight={500}>
                                        {currentPet.name}
                                    </Typography>
                                </Stack>

                                {[
                                    {
                                        label: 'Dob',
                                        value: new Date(currentPet.Dob).toLocaleDateString('vi-vn'),
                                        icon: Calendar,
                                    },
                                    { label: 'Species', value: currentPet.species, icon: Dog },
                                    { label: 'Color', value: currentPet.color, icon: Palette },
                                    {
                                        label: 'Weight',
                                        value: `${Number(currentPet.weight.toFixed(1))} (kg)`,
                                        icon: Weight,
                                    },
                                    { label: 'Identity Mark', value: currentPet.identity_mark, icon: IdCard },
                                ].map(({ label, value, icon }) => {
                                    const IconCompo = icon;
                                    return (
                                        <Stack key={label} direction="row" alignItems="center" spacing={1}>
                                            <IconCompo size={14} color="#888" />
                                            <Typography variant="body2" fontWeight={500}>
                                                {label}:
                                            </Typography>
                                            <Typography variant="body2">{value}</Typography>
                                        </Stack>
                                    );
                                })}
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
                                    secondary={userInfo?.email || 'customer@gmail.com'}
                                    slotProps={{
                                        primary: { sx: { fontWeight: 500, ...textEllipsisSx, lineHeight: 1.2 } },
                                        secondary: { sx: textEllipsisSx },
                                    }}
                                    sx={{ m: 0 }}
                                />
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', gap: 4, float: 'bottom' }}>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ textTransform: 'none' }}
                                startIcon={<DeleteForeverOutlined fontSize="small" />}
                                onClick={() => setOpenConfirmDialog(true)}
                            >
                                Delete Pet
                            </Button>
                            <Button
                                variant="outlined"
                                color="common"
                                sx={{ textTransform: 'none', flex: 1 }}
                                startIcon={<Edit size={16} />}
                                onClick={() => setOpen('edit')}
                            >
                                Edit
                            </Button>
                            <ConfirmDialog
                                open={openConfirmDialog}
                                onClose={() => setOpenConfirmDialog(false)}
                                onConfirm={() => deletePet(currentPet.id)}
                                title="Cancel appointment?"
                                description="Do you really want to delete this pet? This action cannot be undone."
                            />
                        </Box>
                    </Box>

                    {/* Tab Content */}
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                bgcolor: 'grey.100',
                                p: 0.6,
                                borderRadius: 2,
                                ...centerSx,
                                gap: 2,
                                alignSelf: 'start',
                            }}
                        >
                            {['Examination Records', 'Vaccination History'].map((tab, index) => (
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
                                p: 3,
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                            }}
                        >
                            {currentTab === 0 ? (
                                <ExaminationRecordTab currentPetId={currentPet.id} />
                            ) : (
                                <VaccineHistoryTab currentPetId={currentPet.id} />
                            )}
                        </Box>
                    </Stack>
                </Box>
            )}
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
