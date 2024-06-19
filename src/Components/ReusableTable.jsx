import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function ReusableTable({ getApi, setTableData, selectedRows, setSelectedRows, handleSelectRow, tableData }) {
    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tableResponse = await fetch(getApi);
                const tableJsonData = await tableResponse.json();
                setTableData(tableJsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getApi, setTableData]);

    const handleCheckboxChange = () => {
        setAllSelected(!allSelected);
        const newSelectedRows = {};
        tableData.forEach(row => {
            newSelectedRows[row._id] = { selected: !allSelected };
        });
        setSelectedRows(newSelectedRows);
    };

    const columns = Object.keys(tableData[0] || {}).filter(key => key !== '_id').map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
        sortable: true,
        editable: true,
    }));

    const rows = tableData.map((row) => ({ ...row, id: row._id }));

    const getRowHeight = () => 30; // Adjust the row height as needed
    return (
        <div style={{ height: 320, width: '100%' }}>
            <DataGrid
            columnHeaderHeight={30}
                rows={rows}
                columns={columns}
                checkboxSelection
                getRowHeight={getRowHeight}
                // onCellEditStart={(params) => setSelectedRows(selectedRows)}
                // onCellEditStop={(params) => setSelectedRows(selectedRows)}

                onSelectionModelChange={(newSelection) => {
                    const newSelectedRows = {};
                    newSelection.forEach(id => {
                        newSelectedRows[id] = { selected: true };
                        const selectedRow = tableData.find(row => row._id === id);
                        handleSelectRow(selectedRow);
                    });
                    setSelectedRows(newSelectedRows);
                }}
                onCellEditCommit={(params) => {
                    const { id, field, value } = params;
                    const newData = [...tableData];
                    const index = newData.findIndex(row => row._id === id);
                    if (index !== -1) {
                        newData[index][field] = value;
                        setTableData(newData);
                    }
                }}
                pageSize={5} // Set your desired page size
            />
        </div>
    );
}

export default ReusableTable;
