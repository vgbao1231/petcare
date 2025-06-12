import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab } from '@mui/material';
import PetInfoTab from './PetInfoTab';

const PaymentDialog = ({ open, onClose, pet }) => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
    };

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { backgroundImage: 'none' } } }}>
            <DialogTitle>Thông tin chi tiết - {pet.name}</DialogTitle>
            <DialogContent sx={{ p: 4 }}>
                <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" centered>
                    <Tab label="Thông tin" />
                    <Tab label="Lịch sử khám" />
                    <Tab label="Lịch sử tiêm" />
                </Tabs>
                {tab === 0 && <PetInfoTab pet={pet} />}
                {/* Tab khác có thể thêm sau */}
            </DialogContent>
        </Dialog>
    );
};

export default PaymentDialog;
