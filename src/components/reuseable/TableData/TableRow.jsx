import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { TableDataContext } from './TableDataContext';
import TableCell from './TableCell';
import useClickOutside from '@src/hooks/useClickOutside';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TableActionCell from './TableActionCell';
import useEscape from '@src/hooks/useEscape';

const TableRow = ({ row, isSelected, isEditing }) => {
    console.log('table row');

    const {
        columns,
        columnsWidth,
        primaryKey,
        createRowProps,
        tableMethods: { updateRow, setEditingRow },
    } = useContext(TableDataContext);
    const methods = useForm({ defaultValues: { ...row }, mode: 'all' });
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: row[primaryKey],
    });

    const [cellEditing, setCellEditing] = useState(); // Lưu tên của cell đang edit (column.field)
    const rowRef = useRef();

    const { sx, onSubmit, ...rowProps } = useMemo(() => createRowProps(row), [createRowProps, row]);

    const handleRowSubmit = useCallback(
        (formData) => {
            onSubmit(formData, methods);
            setEditingRow();
            setCellEditing();
        },
        [methods, setEditingRow, onSubmit]
    );

    const handleEscape = useCallback(() => {
        if (isEditing) {
            rowRef.current.requestSubmit();
        } else {
            updateRow(row[primaryKey], methods.getValues());
            setCellEditing();
        }
    }, [isEditing, methods, primaryKey, row, updateRow]);

    useClickOutside(rowRef, handleEscape, isEditing || cellEditing);
    useEscape(handleEscape, isEditing || cellEditing);

    useEffect(() => {
        setNodeRef?.(rowRef.current);
    }, [setNodeRef]);

    return (
        <FormProvider {...methods}>
            <Box
                onSubmit={methods.handleSubmit(handleRowSubmit)}
                component={'form'}
                ref={rowRef}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    transition: `background-color 0.3s, box-shadow 0.3s, ${transition}`,
                    backgroundColor: isSelected || isEditing ? 'background.active' : 'background.paper',
                    transform: CSS.Transform.toString(transform),
                    zIndex: isDragging ? 1 : null,
                    position: isDragging ? 'relative' : null,
                    ':hover': {
                        boxShadow: (theme) =>
                            `inset 0 0 0 100vw ${theme.palette.mode === 'light' ? '#00000009' : '#ffffff09'}`,
                    },
                    ...sx,
                }}
                className="table-row"
                {...rowProps}
            >
                {columns.map((column, index) =>
                    column.type === 'action' ? (
                        <TableActionCell
                            key={index}
                            column={column}
                            row={row}
                            columnWidth={columnsWidth[index]}
                            isSelected={isSelected}
                            isEditing={isEditing}
                            rowRef={rowRef}
                            attributes={attributes}
                            listeners={listeners}
                            isDragging={isDragging}
                        />
                    ) : (
                        <TableCell
                            key={index}
                            column={column}
                            row={row}
                            columnWidth={columnsWidth[index]}
                            setCellEditing={setCellEditing}
                            cellEditing={cellEditing === column.field}
                            rowEditing={isEditing}
                        />
                    )
                )}
            </Box>
        </FormProvider>
    );
};

export default memo(TableRow);
