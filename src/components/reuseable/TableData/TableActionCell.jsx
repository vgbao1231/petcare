import { DragIndicator, Send } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/material';
import { useCallback, useContext } from 'react';
import { TableDataContext } from './TableDataContext';

const TableActionCell = ({
    column,
    row,
    columnWidth,
    isSelected,
    isEditing,
    rowRef,
    attributes,
    listeners,
    isDragging,
}) => {
    const {
        primaryKey,
        features: { dragable, selectable },
        tableMethods: { toggleSelect },
    } = useContext(TableDataContext);

    const handleSelect = useCallback(() => toggleSelect(row[primaryKey]), [primaryKey, row, toggleSelect]);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 0.5,
                p: 0.5,
                width: columnWidth,
                justifyContent: column.align,
                alignItems: 'center',
            }}
            className="table-cell"
        >
            {isEditing ? (
                <IconButton
                    size="small"
                    sx={{
                        width: 32,
                        height: 32,
                        transform: 'rotate(-45deg)',
                        transition: 'transform 0.3s',
                        cursor: 'pointer',
                        ':hover': {
                            transform: 'rotate(0) scale(1.05)',
                        },
                    }}
                    onClick={() => rowRef.current.requestSubmit()}
                >
                    <Send fontSize="small" />
                </IconButton>
            ) : (
                <>
                    {dragable && (
                        <IconButton size="small" sx={{ width: 32, height: 32 }} {...attributes} {...listeners}>
                            <DragIndicator sx={{ cursor: isDragging ? 'grabbing' : 'grab' }} />
                        </IconButton>
                    )}
                    {selectable && (
                        <Checkbox
                            size="small"
                            sx={{ width: 32, height: 32 }}
                            checked={isSelected}
                            onChange={handleSelect}
                        />
                    )}
                </>
            )}
        </Box>
    );
};

export default TableActionCell;
