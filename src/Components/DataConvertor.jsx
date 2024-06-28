import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DataConverter = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  

  return (
    <div className='table-controls'>
      <button  onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default DataConverter;
