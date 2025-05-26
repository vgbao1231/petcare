import { arrayMove } from '@dnd-kit/sortable';
import { genUid } from '@src/utils/helpers';
import { useMemo, useRef, useState } from 'react';

export function useTable(tableConfig) {
    // Save config so when compo rerender useTable won't return new value
    const configRef = useRef(tableConfig);
    const {
        primaryKey = 'rowId',
        pageSize: initialPageSize = 5,
        tableData: initialTableData = [],
        features: initialFeatures,
    } = configRef.current;
    const features = useMemo(
        () => ({
            filterable: false,
            sortable: false,
            selectable: false,
            editable: false,
            dragable: false,
            enableClipboard: false,
            ...initialFeatures,
        }),
        [initialFeatures]
    );
    const isCustom = useMemo(() => primaryKey === 'rowId', [primaryKey]);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [tableData, setTableData] = useState(initialTableData);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedRows, setSelectedRows] = useState(new Set()); // Lưu id selected row
    const [columnsWidth, setColumnsWidth] = useState([]);
    const [contextMenu, setContextMenu] = useState();
    const [isLoading, setIsLoading] = useState(!isCustom);
    const [editingRow, setEditingRow] = useState(); // Lưu id row đang edit
    const [sortData, setSortData] = useState({}); // true = asc | false = desc
    const [filterData, setFilterData] = useState({});
    const [clipboard, setClipboard] = useState([]);

    const formattedTableData = useMemo(() => {
        return tableData.map((r, rowIndex) => {
            if (!r[primaryKey]) r[primaryKey] = genUid();
            r.rowIndex = rowIndex;
            return r;
        });
    }, [tableData, primaryKey]);

    const pageData = useMemo(() => {
        if (isCustom) {
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            return formattedTableData.slice(start, end);
        } else return formattedTableData;
    }, [currentPage, pageSize, formattedTableData, isCustom]);

    const rowIdsRef = useRef([]);
    const rowIds = useMemo(() => {
        const newIds = pageData.map((r) => r[primaryKey]);

        // Kiểm tra xem có sự thay đổi không
        if (newIds.length !== rowIdsRef.current.length || !newIds.every((id, index) => id === rowIdsRef.current[index]))
            rowIdsRef.current = newIds; // Cập nhật ref nhưng không gây re-render

        return rowIdsRef.current; // Luôn trả về tham chiếu cũ nếu không có thay đổi
    }, [pageData, primaryKey]);

    //Build-in methods
    const tableMethods = useMemo(() => {
        const toggleSelect = (rowId, isSelected) => {
            setSelectedRows((prev) => {
                const newSelectedRow = new Set(prev);
                const shouldSelect = isSelected ?? !newSelectedRow.has(rowId);
                shouldSelect ? newSelectedRow.add(rowId) : newSelectedRow.delete(rowId);
                return newSelectedRow;
            });
        };

        const toggleSelectAll = (rowIds, isSelected) => {
            rowIds.forEach((rowId) => toggleSelect(rowId, isSelected));
        };

        const updateRow = (rowId, rowData) => {
            setTableData((p) => {
                const rowIndexInTable = p.findIndex((r) => r[primaryKey] === rowId);
                p[rowIndexInTable] = rowData;
                return [...p];
            });
        };

        const sortTableData = (oldId, newId) => {
            setTableData((p) => {
                const oldRowIndexInTable = p.findIndex((r) => r[primaryKey] === oldId);
                const newRowIndexInTable = p.findIndex((r) => r[primaryKey] === newId);
                return arrayMove(p, oldRowIndexInTable, newRowIndexInTable);
            });
        };

        const copyRows = (rowsData) => setClipboard(rowsData);

        const cutRows = (rowsData) => {
            setClipboard(rowsData);
            const rowsIds = rowsData.map((r) => r[primaryKey]);
            setTableData((p) => p.filter((r) => !rowsIds.includes(r[primaryKey])));
            setSelectedRows(new Set());
        };

        const pasteRows = (rowIndex, rowsData) => {
            setTableData((p) => {
                const newRows = rowsData.map((r) => ({ ...r, [primaryKey]: genUid() }));
                p.splice(rowIndex, 0, ...newRows);
                return [...p];
            });
        };

        return {
            copyRows,
            cutRows,
            pasteRows,
            setClipboard,
            setFilterData,
            setSortData,
            setEditingRow,
            setIsLoading,
            setContextMenu,
            setColumnsWidth,
            setPageSize,
            setTableData,
            setSelectedRows,
            setCurrentPage,
            setTotalPages,
            toggleSelect,
            toggleSelectAll,
            updateRow,
            sortTableData,
        };
    }, [primaryKey]);

    return {
        editingRow,
        isCustom,
        isLoading,
        rowIds,
        pageSize,
        primaryKey,
        tableData,
        pageData,
        selectedRows,
        currentPage,
        totalPages: isCustom ? Math.ceil(formattedTableData.length / pageSize) || 1 : totalPages,
        tableMethods,
        features,
        columnsWidth,
        contextMenu,
        sortData,
        filterData,
        clipboard,
    };
}

/*
    const tableInfo = useTable({
        primaryKey = 'rowId',
        pageSize = 10,
        tableData: initialTableData = [],
        tableMessage = {
            emptyData: 'No Data Available',
            loading: 'Loading Data...',
            addRow: 'Add Row',
        },
        tableFeatures = {
            enableFilter: false,
            enableSort: false,
            enableSelect: false,
            enableEdit: false,
            enableDnd: false,
            enableAdd: false,
            enableInsert: false,
            enablePagination: true,
        },
    });
*/
