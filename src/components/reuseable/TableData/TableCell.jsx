import { Box, Typography } from '@mui/material';
import { textEllipsisSx } from '@src/theme';
import { cloneElement, memo, useCallback, useContext, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TableDataContext } from './TableDataContext';

const TableCell = ({ column, row, columnWidth, setCellEditing, cellEditing, rowEditing }) => {
    const {
        createCellProps,
        features: { editable },
    } = useContext(TableDataContext);
    const { control } = useFormContext();
    const {
        field: { value },
    } = useController({ name: column.field, control });
    const { onFocus, onClick, sx, ...cellProps } = useMemo(
        () => createCellProps(row, column),
        [column, createCellProps, row]
    );

    const readCell = useMemo(() => {
        switch (column.type) {
            case 'boolean':
            case 'multiSelect':
                return cloneElement(column.renderCell(row), { readOnly: true });
            case 'select':
                return (
                    <Typography sx={{ ...textEllipsisSx }}>
                        {column.renderCell(row).props.options.find((o) => o.value === value)?.label}
                    </Typography>
                );
            case 'date':
                return (
                    <Typography sx={{ ...textEllipsisSx }}>{new Date(value).toLocaleDateString('vi-VN')}</Typography>
                );
            default:
                return <Typography sx={{ ...textEllipsisSx }}>{value}</Typography>;
        }
    }, [column, row, value]);

    const editCell = useMemo(() => {
        if (rowEditing) return column.renderCell(row);
        return column.renderCell && cellEditing
            ? cloneElement(column.renderCell(row), { autoFocus: true, open: true })
            : readCell;
    }, [column, row, cellEditing, readCell, rowEditing]);

    const handleFocus = useCallback(
        (e) => {
            if (editable || rowEditing) setCellEditing(column.field);
            onFocus?.(e);
            onClick?.(e); // Có thể bỏ
        },
        [editable, rowEditing, setCellEditing, onFocus, onClick, column.field]
    );

    return (
        <Box
            onClick={handleFocus}
            onFocus={handleFocus}
            sx={{
                width: columnWidth,
                display: 'flex',
                justifyContent: column.align,
                alignItems: 'center',
                border: cellEditing ? 2 : 0,
                borderColor: 'primary.main',
                borderRadius: 1,
                ...sx,
            }}
            className="table-cell"
            {...cellProps}
        >
            {editCell}
        </Box>
    );
};

export default memo(TableCell);
