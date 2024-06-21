import React, { useEffect, useState } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

function ReusableTable({ getApi1, setTableData, selectedRows, setSelectedRows, handleSelectRow, tableData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableResponse = await fetch(getApi1);
        const tableJsonData = await tableResponse.json();
        setTableData(tableJsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [getApi1, setTableData]);

  useEffect(() => {
    const filterData = () => {
      if (searchQuery === '' || filterColumn === '') {
        setFilteredData(tableData);
        return;
      }

      const filtered = tableData.filter((row) => {
        const cellValue = row[filterColumn];
        return cellValue && cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [searchQuery, filterColumn, tableData]);

  const handleSort = (key) => {
    const direction = sortBy === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(key);
    setSortDirection(direction);

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleCheckboxChange = () => {
    setAllSelected(!allSelected);
    const newSelectedRows = {};
    tableData.forEach((row) => {
      newSelectedRows[row._id] = { selected: !allSelected };
    });
    setSelectedRows(newSelectedRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellEdit = (rowIndex, key, value) => {
    const newData = [...tableData];
    newData[rowIndex][key] = value;
    setTableData(newData);
  };

  return (
    <Paper style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allSelected}
                  onChange={handleCheckboxChange}
                  inputProps={{ 'aria-label': 'select all' }}
                />
              </TableCell>
              {Object.keys(tableData[0] || {})
                .filter((key) => key !== '_id')
                .map((key, index) => (
                  <TableCell key={index} style={{ padding: '4px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{key}</span>
                      <IconButton onClick={() => handleSort(key)} size="small">
                        {sortBy === key ? (
                          sortDirection === 'asc' ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          )
                        ) : (
                          <ArrowUpward fontSize="small" style={{ opacity: 0.5 }} />
                        )}
                      </IconButton>
                    </div>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={!!selectedRows[row._id]?.selected}
                    onChange={() => handleSelectRow(row)}
                    inputProps={{ 'aria-label': `select row ${rowIndex}` }}
                  />
                </TableCell>
                {Object.keys(row || {})
                  .filter((key) => key !== '_id')
                  .map((key, index) => (
                    <TableCell
                      key={index}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleCellEdit(rowIndex, key, e.target.innerText)}
                      style={{ padding: '4px 8px', cursor: 'text' }}
                    >
                      {typeof row[key] === 'boolean' ? row[key].toString() : row[key]}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ padding: '4px 8px' }}
      />
    </Paper>
  );
}

export default ReusableTable;
