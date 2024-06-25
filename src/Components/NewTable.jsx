import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function NewTable({ newTableData, setSelectedRow, tableData }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    if (newTableData.length > 0) {
      const keys = Object.keys(newTableData[0]);
      const columnsData = keys.map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
        editable: true,
      }));
      setColumns(columnsData);
      setRows(newTableData);
    } else if (tableData.length > 0) {
      const keys = Object.keys(tableData[0]);
      const columnsData = keys.map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
        editable: true,
      }));
      setColumns(columnsData);
      setRows([]);
    } else {
      setColumns([]);
      setRows([]);
    }
  }, [newTableData, tableData]);

  const handleProcessRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row._id === newRow._id ? { ...row, ...newRow } : row))
    );
    return newRow;
  };

  const handleSelectionChange = (newSelectionModel) => {
    setRowSelectionModel(newSelectionModel);
    const selectedData = newSelectionModel.map((id) => rows.find((row) => row._id === id));
    setSelectedRow(selectedData);
  };

  return (
    <div style={{ height: 400, width: '40%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id} // Ensure the grid uses _id for row identification
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={handleProcessRowUpdate}
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={rowSelectionModel}
        rowHeight={40}
        columnHeaderHeight={40}
       
      />
    </div>
  );
}

export default NewTable;
