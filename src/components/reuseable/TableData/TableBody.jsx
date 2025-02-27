import { Box, CircularProgress, Typography } from '@mui/material';
import { memo, useCallback, useContext, useEffect } from 'react';
import { TableDataContext } from './TableDataContext';
import TableRow from './TableRow';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

const TableBody = ({ pageData, rowIds, selectedRows, editingRow, clipboard }) => {
    console.log('table body');

    const {
        primaryKey,
        isLoading,
        features: { dragable, enableClipboard },
        tableMethods: { sortTableData, copyRows, cutRows, pasteRows },
    } = useContext(TableDataContext);

    const handleDragEnd = useCallback(
        (e) => {
            const { active, over } = e;
            // Nếu vị trí của phần tử bị kéo và thả không giống nhau
            if (active.id !== over.id) {
                sortTableData(active.id, over.id); // Cập nhật lại danh sách
            }
        },
        [sortTableData]
    );

    useEffect(() => {
        if (enableClipboard) {
            const handleCCV = (e) => {
                // Copy (Ctrl + C)
                if (e.ctrlKey && e.key === 'c' && selectedRows.size > 0) {
                    copyRows(pageData.filter((row) => selectedRows.has(row[primaryKey])));
                    console.log(
                        'Copied row:',
                        pageData.filter((row) => selectedRows.has(row[primaryKey]))
                    );
                }
                // Cut (Ctrl + X)
                if (e.ctrlKey && e.key === 'x' && selectedRows.size > 0) {
                    cutRows(pageData.filter((row) => selectedRows.has(row[primaryKey])));
                    console.log(
                        'Cut row:',
                        pageData.filter((row) => selectedRows.has(row[primaryKey]))
                    );
                }
                // Paste (Ctrl + V)
                if (e.ctrlKey && e.key === 'v' && clipboard.length !== 0) {
                    pasteRows(pageData[0].rowIndex, clipboard);
                    console.log('Pasted row:', clipboard);
                }
            };
            window.addEventListener('keydown', handleCCV);
            return () => window.removeEventListener('keydown', handleCCV);
        }
    }, [enableClipboard, clipboard, copyRows, cutRows, pageData, pasteRows, selectedRows, primaryKey]);

    if (isLoading)
        return (
            <Box sx={{ width: 1, textAlign: 'center', p: 2 }}>
                <CircularProgress />
                <Typography>Loading Data...</Typography>
            </Box>
        );

    if (pageData.length === 0)
        return <Box sx={{ width: 1, textAlign: 'center', lineHeight: 2 }}>No Data Available</Box>;

    if (dragable)
        return (
            <Box>
                <DndContext
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                        {pageData.map((row) => (
                            <TableRow
                                key={row[primaryKey]}
                                row={row}
                                isSelected={selectedRows.has(row[primaryKey])}
                                isEditing={editingRow === row[primaryKey]}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </Box>
        );

    return (
        <Box>
            {pageData.map((row) => (
                <TableRow
                    key={row[primaryKey]}
                    row={row}
                    isSelected={selectedRows.has(row[primaryKey])}
                    isEditing={editingRow === row[primaryKey]}
                />
            ))}
        </Box>
    );
};

export default memo(TableBody);
