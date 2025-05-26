import { Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import TableData from '@src/components/reuseable/TableData/TableData';
import { useTable } from '@src/hooks/useTable';

const statusColors = {
    PENDING: 'info',
    IN_PROGRESS: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'error',
};

const statusLabels = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Canceled',
};

const appointments = [
    {
        id: 'APT001',
        customerName: 'Nguyễn Văn A',
        phone: '0901234567',
        dateTime: '2023-05-20 10:00',
        status: 'PENDING',
        branch: 'Chi nhánh Quận 1',
        assignedTo: null,
    },
    {
        id: 'APT002',
        customerName: 'Trần Thị B',
        phone: '0912345678',
        dateTime: '2023-05-20 14:30',
        status: 'IN_PROGRESS',
        location: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        assignedTo: 'Lê Văn C',
    },
    {
        id: 'APT003',
        customerName: 'Phạm Văn D',
        phone: '0923456789',
        dateTime: '2023-05-21 09:00',
        status: 'COMPLETED',
        branch: 'Chi nhánh Quận 3',
        assignedTo: 'Bác sĩ Hùng',
    },
    {
        id: 'APT004',
        customerName: 'Lê Thị E',
        phone: '0934567890',
        dateTime: '2023-05-22 16:00',
        status: 'CANCELLED',
        location: '456 Lê Lợi, Quận 5, TP.HCM',
        assignedTo: null,
    },
    {
        id: 'APT005',
        customerName: 'Hoàng Văn F',
        phone: '0945678901',
        dateTime: '2023-05-23 11:30',
        status: 'PENDING',
        branch: 'Chi nhánh Quận 7',
        assignedTo: 'Bác sĩ Lan',
    },
];

const statusOptions = [
    { label: 'Tất cả trạng thái', value: 'all' },
    { label: 'Chờ xử lý', value: 'PENDING' },
    { label: 'Đang thực hiện', value: 'IN_PROGRESS' },
    { label: 'Hoàn thành', value: 'COMPLETED' },
    { label: 'Đã huỷ', value: 'CANCELLED' },
];

const typeOptions = [
    { label: 'Tất cả loại', value: 'all' },
    { label: 'Chi nhánh', value: 'branch' },
    { label: 'Tại nhà', value: 'location' },
];

const AppointmentPage = () => {
    const tableInfo = useTable({
        tableData: appointments,
        features: {
            // sortable: true,
            // filterable: false,
        },
    });

    const columns = [
        {
            headerName: 'ID',
            field: 'id',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            headerName: 'Khách hàng',
            field: 'customerName',
            headerAlign: 'center',
            align: 'center',
            description: 'Tên và số điện thoại khách hàng',
            type: 'custom',
            renderCell: (r) => (
                <Box sx={{ py: 0.5 }}>
                    <Typography>{r.customerName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {r.phone}
                    </Typography>
                </Box>
            ),
        },
        {
            headerName: 'Loại',
            field: 'type',
            headerAlign: 'center',
            align: 'center',
            type: 'custom',
            width: 120,
            renderCell: (r) => (
                <Chip size="small" label={r.branch ? 'Store' : 'Home'} color={r.branch ? 'info' : 'success'} />
            ),
        },
        {
            headerName: 'Địa điểm',
            field: 'location',
            headerAlign: 'center',
            description: 'Địa điểm phục vụ',
            type: 'custom',
            renderCell: (r) => <Typography>{r.branch ? r.branch : r.location}</Typography>,
        },
        {
            headerName: 'Ngày & Giờ',
            field: 'dateTime',
            headerAlign: 'center',
            align: 'center',
            description: 'Thời gian hẹn',
        },
        {
            headerName: 'Trạng thái',
            field: 'status',
            headerAlign: 'center',
            align: 'center',
            type: 'custom',
            width: 160,
            renderCell: (r) => <Chip label={statusLabels[r.status]} color={statusColors[r.status]} size="small" />,
        },
        {
            headerName: 'Nhân viên',
            field: 'assignedTo',
            headerAlign: 'center',
            align: 'center',
            description: 'Người được giao việc',
            type: 'custom',
            renderCell: (r) =>
                r.assignedTo ? (
                    <Typography>{r.assignedTo}</Typography>
                ) : (
                    <Chip size="small" label="Chưa giao" color="error" />
                ),
        },
    ];

    return (
        <Box p={4}>
            <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={600}>
                            Appointments
                        </Typography>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                            + Add Appointment
                        </Button>
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            placeholder="Tìm theo tên, số điện thoại, ID..."
                            size="small"
                            sx={{ flex: 1 }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search fontSize="small" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <TextField select size="small" defaultValue="all">
                            {statusOptions.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField select size="small" defaultValue="all">
                            <MenuItem value="all">Tất cả chi nhánh</MenuItem>
                            <MenuItem value="Chi nhánh Quận 1">Chi nhánh Quận 1</MenuItem>
                            <MenuItem value="Chi nhánh Quận 3">Chi nhánh Quận 3</MenuItem>
                            <MenuItem value="Chi nhánh Quận 7">Chi nhánh Quận 7</MenuItem>
                        </TextField>
                        <TextField select size="small" defaultValue="all">
                            {typeOptions.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <TableData columns={columns} tableInfo={tableInfo} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default AppointmentPage;
