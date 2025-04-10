import React, { useState, useMemo, JSX } from 'react';
import { Input, Typography, Checkbox, IconButton } from '@material-tailwind/react';
import { MagnifyingGlassIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface Column {
    label: string;
    key: string;
    icon?: JSX.Element;
}

interface Action {
    key: string;
    icon: JSX.Element;
    // Function that takes a row and returns true if the action is visible for that row
    visible?: (row: any) => boolean;
}

interface TableProps {
    data: any[];
    columns: Column[];
    searchable?: boolean;
    selectable?: boolean;
    actions?: Action[];
    onAction?: (action: string, row: any) => void;
}

export default function Table({
    data,
    columns,
    searchable = false,
    selectable = false,
    actions,
    onAction,
}: TableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

    // Helper to get a unique key for each row (assuming row.id exists, otherwise using index)
    const getRowKey = (row: any, index: number) => row.id || index;

    // Filter data based on the search query
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        return data.filter(row =>
            columns.some(col =>
                String(row[col.key]).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, data, columns]);

    // Sort the filtered data if a sort column is selected
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => {
            let aVal = a[sortColumn];
            let bVal = b[sortColumn];
            // Check if both values are numbers
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
            }
            // Compare as strings otherwise
            aVal = String(aVal);
            bVal = String(bVal);
            return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });
    }, [filteredData, sortColumn, sortDirection]);

    // Handler for column sorting when clicking on a header
    const handleSort = (colKey: string) => {
        if (sortColumn === colKey) {
            // Toggle sort direction
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(colKey);
            setSortDirection("asc");
        }
    };

    const handleAction = (actionKey: string, row: any) => {
        if (onAction) {
            onAction(actionKey, row);
        }
    };

    // Determine if all rows in current view are selected
    const allSelected = sortedData?.length > 0 && sortedData.every((row, index) =>
        selectedRows.has(getRowKey(row, index))
    );

    // Handle select all / unselect all checkbox
    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedRows(new Set());
        } else {
            const newSelected = new Set<string | number>();
            sortedData.forEach((row, index) => {
                newSelected.add(getRowKey(row, index));
            });
            setSelectedRows(newSelected);
        }
    };

    // Handle individual row selection
    const handleSelectRow = (row: any, index: number) => {
        const rowKey = getRowKey(row, index);
        const newSelected = new Set(selectedRows);
        if (selectedRows.has(rowKey)) {
            newSelected.delete(rowKey);
        } else {
            newSelected.add(rowKey);
        }
        setSelectedRows(newSelected);
    };

    if (!sortedData?.length) {
        return <div className='p-4 bg-white'>No records found</div>
    } else {
        return (
            <div className="overflow-hidden max-h-full h-full bg-red-400">
                <div className="flex flex-col h-full p-2 bg-white">
                    {searchable && (
                        <div className="w-full md:w-96 px-4 my-2">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={(e: any) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex-1 max-h-full border-2 border-gray-200 overflow-y-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead className="sticky top-0 bg-white z-10">
                                <tr>
                                    {selectable && (
                                        <th className="border-b border-gray-300 p-2">
                                            <Checkbox
                                                className="bg-gray-50 border-2 border-gray-300"
                                                checked={allSelected}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                    )}
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className="border-b border-gray-300 p-2 cursor-pointer select-none"
                                            onClick={() => handleSort(col.key)}
                                        >
                                            <div className="flex items-center gap-1">
                                                {col.icon}
                                                <Typography
                                                    color="blue-gray"
                                                    variant="small"
                                                    className="!font-bold"
                                                >
                                                    {col.label}
                                                </Typography>
                                                {sortColumn === col.key && (
                                                    sortDirection === 'asc' ? <ArrowUpIcon strokeWidth={3} className='h-4' /> : <ArrowDownIcon strokeWidth={3} className='h-4' />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    {actions && actions.length > 0 && (
                                        <th className="border-b border-gray-300 p-2">
                                            <Typography
                                                color="blue-gray"
                                                variant="small"
                                                className="!font-bold"
                                            >
                                                Actions
                                            </Typography>
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {sortedData.map((row, index) => {
                                    const isLast = index === sortedData.length - 1;
                                    const classes = isLast
                                        ? 'px-2'
                                        : 'px-2 border-b border-gray-300';

                                    return (
                                        <tr key={getRowKey(row, index)}>
                                            {selectable && (
                                                <td className={classes}>
                                                    <Checkbox
                                                        className="bg-gray-50 border-2 border-gray-300"
                                                        checked={selectedRows.has(getRowKey(row, index))}
                                                        onChange={() => handleSelectRow(row, index)}
                                                    />
                                                </td>
                                            )}
                                            {columns.map((col) => (
                                                <td key={col.key} className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        {row[col.key]}
                                                    </Typography>
                                                </td>
                                            ))}
                                            {actions && actions.length > 0 && (
                                                <td className={classes}>
                                                    <div className="flex items-center gap-2">
                                                        {actions.map((action) => {
                                                            const isVisible = action.visible ? action.visible(row) : true;
                                                            return isVisible ? (
                                                                <IconButton
                                                                    key={action.key}
                                                                    variant="text"
                                                                    size="sm"
                                                                    onClick={() => handleAction(action.key, row)}
                                                                >
                                                                    {action.icon}
                                                                </IconButton>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
