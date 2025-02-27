import { memo, useCallback, useContext, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { TableDataContext } from './TableDataContext';
import { centerSx, textEllipsisSx } from '@src/theme';
import { ArrowDownward, ArrowUpward, DeleteForever, FilterAlt, MoreVert } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const TableHead = ({ rowIds, allChecked, indeterminate, filterData, sortData }) => {
    console.log('table head');

    const {
        columns,
        columnsWidth,
        handleMouseDown,
        tableMethods: { toggleSelectAll, setFilterData, setSortData, setSelectedRows },
    } = useContext(TableDataContext);
    const { register, handleSubmit, setValue } = useForm({ defaultValues: filterData });

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(0); // 0: close | 1: menu | 2: filter
    const [currentField, setCurrentField] = useState('');

    const isAsc = useCallback((field) => sortData[field] === true, [sortData]);
    const isSorted = useCallback((field) => sortData[field] !== undefined, [sortData]);
    const isFiltered = useCallback((field) => filterData[field] !== undefined, [filterData]);

    const handleOpenMenu = useCallback((e, openMenu, field) => {
        e && setAnchorEl(e.currentTarget);
        setOpenMenu(openMenu);
        setCurrentField(field);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
        setOpenMenu(0);
    }, []);

    const handleSort = useCallback(
        (value) => {
            setSortData((p) => (value === null ? (delete p[currentField], { ...p }) : { ...p, [currentField]: value }));
            handleClose();
        },
        [setSortData, handleClose, currentField]
    );

    const handleFilter = useCallback(
        (data) => {
            const value = data[currentField];
            setFilterData((p) => (value === '' ? (delete p[currentField], { ...p }) : { ...p, [currentField]: value }));
            handleClose();
        },
        [setFilterData, handleClose, currentField]
    );

    const handleSelectAll = useCallback(
        (e) => {
            e.ctrlKey ? setSelectedRows(new Set()) : toggleSelectAll(rowIds, e.target.checked);
        },
        [rowIds, toggleSelectAll, setSelectedRows]
    );

    return (
        // Header Row
        <Box sx={{ display: 'flex', borderBottom: 1, minHeight: 40, overflow: 'hidden' }}>
            {columns.map((column, index) => {
                return (
                    <Box key={index} sx={{ ...centerSx, position: 'relative' }}>
                        {/* Header Cell*/}
                        <Tooltip title={column.description} enterDelay={500}>
                            <Box sx={{ ...centerSx, textAlign: column.headerAlign, width: columnsWidth[index], px: 1 }}>
                                {column.type === 'action' ? (
                                    <Checkbox
                                        size="small"
                                        checked={allChecked}
                                        indeterminate={indeterminate && !allChecked}
                                        onClick={handleSelectAll}
                                    />
                                ) : (
                                    <>
                                        <Typography sx={{ ...textEllipsisSx, width: 1 }}>
                                            {column.headerName}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            {isFiltered(column.field) && (
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleOpenMenu(e, 2, column.field)}
                                                >
                                                    <FilterAlt fontSize="small" />
                                                </IconButton>
                                            )}
                                            {isSorted(column.field) && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleSort(!isAsc(column.field))}
                                                >
                                                    {sortData[column.field] ? (
                                                        <ArrowUpward fontSize="small" />
                                                    ) : (
                                                        <ArrowDownward fontSize="small" />
                                                    )}
                                                </IconButton>
                                            )}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleOpenMenu(e, 1, column.field)}
                                            >
                                                <MoreVert fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Tooltip>

                        {/* Divider */}
                        <Box
                            sx={{
                                p: 0.5,
                                height: 1,
                                position: 'absolute',
                                right: -5,
                                zIndex: 1,
                                '&:hover': {
                                    cursor: 'col-resize',
                                    '.MuiDivider-root': { backgroundColor: 'primary.main' },
                                },
                            }}
                            onMouseDown={(e) => handleMouseDown(e, index)}
                        >
                            <Divider orientation="vertical" sx={{ borderRightWidth: 2, width: 2 }} />
                        </Box>
                    </Box>
                );
            })}
            <Menu
                anchorEl={anchorEl}
                open={openMenu === 1}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{ paper: { elevation: 1 } }}
            >
                <>
                    <MenuItem onClick={() => handleSort(isSorted(currentField) ? !isAsc(currentField) : true)}>
                        <ListItemIcon>
                            {isAsc(currentField) ? (
                                <ArrowDownward fontSize="small" />
                            ) : (
                                <ArrowUpward fontSize="small" />
                            )}
                        </ListItemIcon>
                        <ListItemText>Sort by {isAsc(currentField) ? 'DESC' : 'ASC'}</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleSort(isSorted(currentField) ? null : false)}>
                        <ListItemIcon>{!isSorted(currentField) && <ArrowDownward fontSize="small" />}</ListItemIcon>
                        <ListItemText>{isSorted(currentField) ? 'Unsort' : 'Sort by DESC'}</ListItemText>
                    </MenuItem>
                </>

                <Divider />
                <MenuItem onClick={() => handleOpenMenu(null, 2, currentField)}>
                    <ListItemIcon>
                        <FilterAlt fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Filter</ListItemText>
                </MenuItem>
            </Menu>

            <Menu
                component="form"
                anchorEl={anchorEl}
                open={openMenu === 2}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                onSubmit={handleSubmit(handleFilter)}
            >
                <Box sx={{ px: 1 }}>
                    {/* TODO: operator theo type */}
                    {/* <TextField
                        select
                        size="small"
                        label="Operator"
                        placeholder="Filter value"
                        variant="standard"
                        sx={{ width: 150 }}
                        slotProps={{ inputLabel: { shrink: true } }}
                        {...register(currentField)}
                    /> */}
                    <TextField
                        fullWidth
                        size="small"
                        label="Value"
                        placeholder="Filter value"
                        variant="standard"
                        slotProps={{ inputLabel: { shrink: true } }}
                        {...register(currentField)}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, px: 1, pt: 1 }}>
                    <Button type="submit" size="small" sx={{ px: 1 }} startIcon={<FilterAlt />}>
                        Filter
                    </Button>
                    <Button
                        type="submit"
                        size="small"
                        sx={{ px: 1 }}
                        startIcon={<DeleteForever />}
                        onClick={() => setValue(currentField, '')}
                    >
                        Remove
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default memo(TableHead);
