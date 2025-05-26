import { Box, ListItemIcon, ListItemText, Menu, MenuItem, Pagination } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { TableDataContext } from './TableDataContext';

const TableData = ({ columns, tableInfo, createRowProps = () => ({}), createCellProps = () => ({}), sx, ...props }) => {
    console.log('table data');

    const {
        primaryKey,
        columnsWidth,
        selectedRows,
        currentPage,
        pageData,
        rowIds,
        tableMethods,
        contextMenu,
        features,
        isCustom,
        isLoading,
        editingRow,
        filterData,
        sortData,
        clipboard,
    } = tableInfo;
    const { setColumnsWidth, setCurrentPage, setContextMenu } = tableMethods;
    const tableRef = useRef(null);

    const customColumns = useMemo(() => {
        const { selectable, dragable } = features;
        const actionWidth = 20 + ['selectable', 'dragable'].reduce((acc, f) => acc + (features[f] ? 40 : 0), 0);
        const newColumn = {
            headerAlign: 'center',
            align: 'center',
            field: 'action',
            width: actionWidth,
            type: 'action',
        };
        return selectable || dragable ? [newColumn, ...columns] : columns;
    }, [columns, features]);

    const handleMouseDown = useCallback(
        (e, index) => {
            const startX = e.clientX;
            const startWidth = columnsWidth[index];

            const handleMouseMove = (event) => {
                const newWidth = startWidth + event.clientX - startX;
                if (newWidth >= 100) {
                    setColumnsWidth((prev) => {
                        prev[index] = newWidth;
                        return [...prev];
                    });
                }
            };

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                document.body.style.userSelect = '';
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
        },
        [columnsWidth, setColumnsWidth]
    );

    const handleCloseContextmenu = useCallback(
        (e) => {
            e.preventDefault();
            setContextMenu();
        },
        [setContextMenu]
    );

    useEffect(() => {
        if (columnsWidth.length === 0) {
            const tableWidth = tableRef.current.clientWidth;
            const remainingWidth = tableWidth - customColumns.reduce((acc, column) => acc + (column.width || 0), 0);
            const remainingColumn = customColumns.filter((column) => !column.width).length;
            const flexibleColumnWidth = Math.floor((remainingWidth / remainingColumn) * 10) / 10;

            setColumnsWidth(customColumns.map((column) => column.width || flexibleColumnWidth));
        }
    }, [customColumns, columnsWidth, setColumnsWidth]);

    useEffect(() => {
        if (isCustom && pageData.length === 0 && currentPage > 1) setCurrentPage(currentPage - 1);
    }, [isCustom, currentPage, setCurrentPage, pageData.length]);

    const contextValue = useMemo(
        () => ({
            columns: customColumns,
            primaryKey,
            columnsWidth,
            handleMouseDown,
            createRowProps,
            createCellProps,
            tableMethods,
            features,
            isLoading,
        }),
        [
            customColumns,
            primaryKey,
            columnsWidth,
            handleMouseDown,
            createRowProps,
            createCellProps,
            tableMethods,
            features,
            isLoading,
        ]
    );

    return (
        <TableDataContext.Provider value={contextValue}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    ...sx,
                }}
                {...props}
            >
                <Box
                    ref={tableRef}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'auto',
                    }}
                >
                    <TableHead
                        rowIds={rowIds}
                        allChecked={rowIds.every((r) => selectedRows.has(r))}
                        indeterminate={rowIds.some((r) => selectedRows.has(r))}
                        filterData={filterData}
                        sortData={sortData}
                    />
                    <TableBody
                        pageData={pageData}
                        rowIds={rowIds}
                        selectedRows={selectedRows}
                        editingRow={editingRow}
                        clipboard={clipboard}
                    />
                </Box>
                <Pagination
                    count={tableInfo.totalPages}
                    page={tableInfo.currentPage}
                    onChange={(_, newPage) => setCurrentPage(newPage)}
                    variant="outlined"
                    shape="rounded"
                    sx={{ alignSelf: 'center' }}
                />
                <Menu
                    open={!!contextMenu}
                    onClose={handleCloseContextmenu}
                    onContextMenu={handleCloseContextmenu}
                    anchorReference="anchorPosition"
                    anchorPosition={contextMenu ? { top: contextMenu.y, left: contextMenu.x } : undefined}
                    disableAutoFocusItem
                    slotProps={{ paper: { sx: { minWidth: 180 } } }}
                >
                    {contextMenu?.menuItems.map(({ icon, text, onClick, ...action }, index) => (
                        <MenuItem
                            key={index}
                            onClick={(e) => {
                                handleCloseContextmenu(e);
                                onClick(e);
                            }}
                            {...action}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{text}</ListItemText>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </TableDataContext.Provider>
    );
};

export default memo(TableData);
