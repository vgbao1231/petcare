import { Box, Button } from '@mui/material';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import TableData from '@src/components/reuseable/TableData/TableData';
import FormChip from '@src/components/reuseable/FormRHF/FormChip';
import { useTable } from '@src/hooks/useTable';
import { useCallback } from 'react';
import { ContentCopy, ContentCut, EditOutlined } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';

function TestPage() {
    return (
        <Box
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                flex: 1,
                maxHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <FormCompo />
            <TableCompo />
        </Box>
    );
}

function TableCompo() {
    console.log('table compo');

    const tableInfo = useTable({
        pageSize: 2,
        tableData,
        features: {
            // editable: true,
            dragable: true,
            enableClipboard: true,
        },
    });

    const { primaryKey, tableMethods } = tableInfo;

    const createRowProps = useCallback(
        (row) => {
            const { setContextMenu, setEditingRow, updateRow } = tableMethods;
            const handleContextMenu = (e) => {
                e.preventDefault();
                setContextMenu({
                    x: e.pageX,
                    y: e.pageY,
                    menuItems: [
                        {
                            icon: <EditOutlined fontSize="small" />,
                            text: 'Edit Row',
                            onClick: () => setEditingRow(row[primaryKey]),
                        },
                        {
                            icon: <ContentCopy fontSize="small" />,
                            text: 'Copy Row',
                            onClick: () => console.log(`Cut row id: ${row[primaryKey]}?`),
                        },
                        {
                            icon: <ContentCut fontSize="small" />,
                            text: 'Cut Row',
                            onClick: () => console.log(`Cut row id: ${row[primaryKey]}?`),
                        },
                    ],
                });
            };

            const handleSubmit = (formData, methods) => {
                if (window.confirm('Save ?')) {
                    console.log(formData);
                    updateRow(formData[primaryKey], formData);
                } else methods.reset(row);
            };

            return {
                onContextMenu: handleContextMenu,
                onSubmit: handleSubmit,
            };
        },
        [primaryKey, tableMethods]
    );

    const createCellProps = useCallback(() => {
        return {
            // onClick: () => console.log('cell click'),a
        };
    }, []);

    return (
        <Box sx={{ p: 2, border: 1, backgroundColor: 'background.paper' }}>
            <TableData
                columns={columns}
                tableInfo={tableInfo}
                createRowProps={createRowProps}
                createCellProps={createCellProps}
            />
            <Button variant="contained" onClick={() => console.log(Array.from(tableInfo.selectedRows))}>
                Submit Selected Rows
            </Button>
            <Button variant="contained" onClick={() => console.log(tableInfo.pageData)}>
                Submit Page Data
            </Button>
            <Button variant="contained" onClick={() => console.log(tableInfo.tableData)}>
                Submit Table Data
            </Button>
            <Button variant="contained" onClick={() => console.log(tableInfo.sortData)}>
                Submit Sort Data
            </Button>
            <Button variant="contained" onClick={() => console.log(tableInfo.filterData)}>
                Submit Filter Data
            </Button>
            <Button variant="contained" onClick={() => console.log(tableInfo.clipboard)}>
                Submit Clipboard Data
            </Button>
        </Box>
    );
}

/*
const columnFormat = {
    field: 'id',                // Tên trường (key của dữ liệu hàng)
    headerName: 'ID',           // Tên hiển thị trong tiêu đề cột
    width: 100,                 // Chiều rộng cố định của cột
    sortable: true,             // Cho phép sắp xếp
    hide: true,                 // Ẩn cột
    align: 'center',            // Căn giữa dữ liệu trong cell
    headerAlign: 'center',      // Căn giữa tiêu đề
    description: 'Unique ID',   // Mô tả hiển thị khi di chuột vào tiêu đề
    type: 'string|date|boolean|select|multiSelect|action', // Loại dữ liệu (number, string, date, boolean) (đang phát triển trong filter)
    renderCell: (row) => (   // Render custom cell với row là dữ liệu của hàng hiện tại
        <FormInput name="cellId" defaultValue={row.id} /> // name này là tên của dữ liệu sẽ gửi cho BE
    ),
};
*/

const columns = [
    {
        headerName: 'Full Name',
        field: 'fullName',
        headerAlign: 'center',
        align: 'center',
        description: 'Full name of employee',
        renderCell: () => <FormInput name="fullName" fullWidth />,
    },
    {
        headerName: 'Birth Date',
        headerAlign: 'center',
        align: 'center',
        field: 'birthDate',
        type: 'date',
        renderCell: () => <FormInput name="birthDate" fullWidth type="date" />,
    },
    {
        headerName: 'Age',
        headerAlign: 'center',
        align: 'center',
        field: 'age',
        width: 150,
        renderCell: () => (
            <FormInput rules={{ min: { value: 18, message: '18+' } }} name="age" fullWidth type="number" />
        ),
    },
    {
        headerName: 'Hobbies',
        headerAlign: 'center',
        align: 'center',
        field: 'hobbies',
        type: 'multiSelect',
        renderCell: () => (
            <FormSelect
                fullWidth
                multiple
                limitTags={2}
                name="hobbies"
                options={[
                    { label: 'Reading', value: 'reading' },
                    { label: 'Traveling', value: 'traveling' },
                    { label: 'Cooking', value: 'cooking' },
                    { label: 'Gardening', value: 'gardening' },
                    { label: 'Painting', value: 'painting' },
                    { label: 'Gaming', value: 'gaming' },
                    { label: 'Cycling', value: 'cycling' },
                    { label: 'Photography', value: 'photography' },
                    { label: 'Yoga', value: 'yoga' },
                ]}
                disableClearable
                disableCloseOnSelect
                rules={{
                    validate: (v) => (v.length <= 2 ? 'Pls select more than 2 options' : null),
                }}
            />
        ),
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
    {
        headerName: 'Gender',
        headerAlign: 'center',
        align: 'center',
        field: 'gender',
        type: 'select',
        width: 200,
        renderCell: () => (
            <FormSelect
                fullWidth
                name="gender"
                disableClearable
                options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                ]}
            />
        ),
    },
];

const tableData = [
    {
        personId: 1,
        fullName: 'John Doe',
        birthDate: '1990-05-15',
        age: 33,
        hobbies: ['reading', 'traveling', 'cooking'],
        status: true,
        gender: 'male',
    },
    {
        personId: 2,
        fullName: 'Jane Smith',
        birthDate: '1985-10-20',
        age: 38,
        hobbies: ['gardening', 'painting'],
        status: false,
        gender: 'female',
    },
    {
        personId: 3,
        fullName: 'Mike Johnson',
        birthDate: '1992-12-10',
        age: 31,
        hobbies: ['gaming', 'cycling'],
        status: true,
        gender: 'male',
    },
    {
        personId: 4,
        fullName: 'Emily Davis',
        birthDate: '1995-08-22',
        age: 28,
        hobbies: ['photography', 'yoga'],
        status: false,
        gender: 'female',
    },
    {
        personId: 5,
        fullName: 'Chris Martin',
        birthDate: '1988-07-12',
        age: 36,
        hobbies: ['traveling', 'reading'],
        status: true,
        gender: 'male',
    },
    {
        personId: 6,
        fullName: 'Olivia Brown',
        birthDate: '1993-03-19',
        age: 31,
        hobbies: ['traveling', 'cooking'],
        status: true,
        gender: 'female',
    },
    {
        personId: 7,
        fullName: 'Liam Williams',
        birthDate: '1989-11-30',
        age: 34,
        hobbies: ['cooking', 'photography'],
        status: false,
        gender: 'male',
    },
    {
        personId: 8,
        fullName: 'Will Armstrong',
        birthDate: '1989-11-30',
        age: 34,
        hobbies: ['cooking', 'photography'],
        status: false,
        gender: 'male',
    },
    {
        personId: 9,
        fullName: 'Sophia Wilson',
        birthDate: '1991-04-25',
        age: 32,
        hobbies: ['reading', 'yoga'],
        status: true,
        gender: 'female',
    },
    {
        personId: 10,
        fullName: 'James Anderson',
        birthDate: '1987-09-14',
        age: 36,
        hobbies: ['gaming', 'cycling'],
        status: false,
        gender: 'male',
    },
    {
        personId: 11,
        fullName: 'Isabella Thomas',
        birthDate: '1994-02-28',
        age: 29,
        hobbies: ['painting', 'gardening'],
        status: true,
        gender: 'female',
    },
    {
        personId: 12,
        fullName: 'Mason Jackson',
        birthDate: '1990-06-17',
        age: 33,
        hobbies: ['photography', 'traveling'],
        status: true,
        gender: 'male',
    },
    {
        personId: 13,
        fullName: 'Mia White',
        birthDate: '1996-01-05',
        age: 27,
        hobbies: ['cooking', 'reading'],
        status: false,
        gender: 'female',
    },
    {
        personId: 14,
        fullName: 'Ethan Harris',
        birthDate: '1988-08-23',
        age: 35,
        hobbies: ['gaming', 'painting'],
        status: true,
        gender: 'male',
    },
    {
        personId: 15,
        fullName: 'Ava Martin',
        birthDate: '1992-11-11',
        age: 31,
        hobbies: ['yoga', 'gardening'],
        status: false,
        gender: 'female',
    },
    {
        personId: 16,
        fullName: 'Alexander Thompson',
        birthDate: '1985-03-30',
        age: 38,
        hobbies: ['cycling', 'photography'],
        status: true,
        gender: 'male',
    },
    {
        personId: 17,
        fullName: 'Charlotte Garcia',
        birthDate: '1993-07-19',
        age: 30,
        hobbies: ['traveling', 'cooking'],
        status: true,
        gender: 'female',
    },
    {
        personId: 18,
        fullName: 'Benjamin Martinez',
        birthDate: '1989-12-25',
        age: 34,
        hobbies: ['reading', 'gaming'],
        status: false,
        gender: 'male',
    },
];

function FormCompo() {
    const methods = useForm({ defaultValues: { age: 10 }, mode: 'all' });

    const onSubmit = (data) => {
        console.log(data);
    };

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    return (
        <Box sx={{ p: 2, width: 350, border: 1, backgroundColor: 'background.paper' }}>
            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
                >
                    <FormChip name="status" variant="outlined" checkedLabel="Active" unCheckedLabel="Unactive" />
                    <FormInput
                        // readOnly
                        name="email"
                        label="Email"
                        rules={{ required: 'Fill Pls' }}
                    />
                    <FormInput
                        name="age"
                        label="Age"
                        type="number"
                        rules={{
                            min: {
                                value: 18,
                                message: '18+',
                            },
                        }}
                    />
                    <FormSelect
                        onFocus={() => console.log('123')}
                        name="select"
                        label="Select Options"
                        options={options}
                        disableCloseOnSelect
                        disableClearable
                        // getOptionLookup={(v) => console.log(v)}
                    />
                    <FormSelect
                        onFocus={() => console.log('123')}
                        multiple
                        name="multiSelect"
                        label="Select Mul"
                        options={options}
                        rules={{
                            validate: (v) => (v.length <= 2 ? 'Pls select more than 2 options' : null),
                        }}
                        defaultValue={['option2', 'option1', 'option3', 'option4']}
                        valueRepeat
                        disableCloseOnSelect
                        disableClearable
                        // getOptionLookup={(v) => console.log(v)}
                    />
                    <Button type="submit">Submit</Button>
                </Box>
            </FormProvider>
        </Box>
    );
}
export default TestPage;
