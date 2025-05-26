import { Search } from '@mui/icons-material';
import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material';
import FormChip from '@src/components/reuseable/FormRHF/FormChip';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import TableData from '@src/components/reuseable/TableData/TableData';
import { useTable } from '@src/hooks/useTable';
import { useCallback } from 'react';

const users = [
    {
        id: 'USR001',
        name: 'Dr. John Smith',
        role: '2',
        email: 'john.smith@petcare.com',
        phone: '+1-555-1234',
        status: 'Active',
    },
    {
        id: 'USR002',
        name: 'Sarah Johnson',
        role: '2',
        email: 'sarah.j@petcare.com',
        phone: '+1-555-5678',
        status: 'Active',
    },
    {
        id: 'USR003',
        name: 'Michael Brown',
        role: '1',
        email: 'michael.b@petcare.com',
        phone: '+1-555-8765',
        status: 'Active',
    },
    {
        id: 'USR004',
        name: 'Emily Davis',
        role: '2',
        email: 'emily.d@petcare.com',
        phone: '+1-555-4321',
        status: 'Inactive',
    },
    {
        id: 'USR005',
        name: 'Robert Wilson',
        role: '2',
        email: 'robert.w@petcare.com',
        phone: '+1-555-7890',
        status: 'Active',
    },
];

const UserPage = () => {
    const tableInfo = useTable({
        pageSize: 2,
        tableData: users,
        features: {
            // sortable: true,
            // filterable: false,
        },
    });

    const columns = [
        {
            headerName: 'ID',
            headerAlign: 'center',
            align: 'center',
            field: 'id',
            width: 150,
        },
        {
            headerName: 'Name',
            field: 'name',
            headerAlign: 'center',
            align: 'center',
            description: 'Name of employee',
            renderCell: () => <FormInput name="name" fullWidth />,
        },
        {
            headerName: 'Email',
            field: 'email',
            headerAlign: 'center',
            align: 'center',
            description: 'Email of employee',
            renderCell: () => <FormInput name="email" fullWidth />,
        },
        {
            headerName: 'Role',
            field: 'role',
            headerAlign: 'center',
            align: 'center',
            description: 'Role of employee',
            type: 'select',
            renderCell: () => (
                <FormSelect
                    fullWidth
                    name="role"
                    disableClearable
                    options={[
                        { label: 'Admin', value: '1' },
                        { label: 'Staff', value: '2' },
                        { label: 'Customer', value: '3' },
                    ]}
                />
            ),
        },
        {
            headerName: 'Phone',
            field: 'phone',
            headerAlign: 'center',
            align: 'center',
            description: 'Phone of employee',
            renderCell: () => <FormInput name="phone" fullWidth />,
        },
        {
            headerName: 'Status',
            headerAlign: 'center',
            align: 'center',
            field: 'status',
            type: 'boolean',
            width: 180,
            renderCell: () => <FormChip name="status" checkedLabel="Active" unCheckedLabel="Unactive" />,
        },
    ];

    const createRowProps = useCallback(() => {
        return {
            sx: { minHeight: 40 },
        };
    }, []);

    return (
        <Box p={4}>
            <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={600}>
                            Users
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <TextField
                                size="small"
                                placeholder="Search users..."
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    },
                                    htmlInput: { sx: { py: 0.6 } },
                                }}
                            />
                            <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                                + Add User
                            </Button>
                        </Box>
                    </Box>
                    <TableData columns={columns} tableInfo={tableInfo} createRowProps={createRowProps} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserPage;
