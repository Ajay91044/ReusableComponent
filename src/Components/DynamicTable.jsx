import React, { useEffect, useState } from 'react';
import './DynamicTable.css';
import axios from 'axios';
import ReusableTable from './ReusableTable';

const DynamicTable = ({postApi1,getApi1}) => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  

  // console.log("data",data);

  const handleInsert = () => {
    const newRow = {};
    Object.keys(tableData[0]).forEach(key => {
      newRow[key] = '';
    });
    setTableData([...tableData, newRow]);
  };
  
  const handleInsertBefore = () => {
    const selectedRowsIndexes = getSelectedRows();
    if (selectedRowsIndexes.length === 0) {
      alert("Please select a row.");
      return;
    }
  
    
    const newData = [];
    tableData.forEach((row, index) => {
      if (selectedRowsIndexes.includes(index)) {
        const newRow = {};
        Object.keys(row).forEach(key => {
          newRow[key] = '';
        });
        newData.push(newRow);
      }
      newData.push(row);
    });
  
    setTableData(newData);
  };
  
  const handleInsertAfter = () => {
    const selectedRowsIndexes = getSelectedRows();
    if (selectedRowsIndexes.length === 0) {
      alert("Please select a row.");
      return;
    }
  
    const newData = [];
    tableData.forEach((row, index) => {
      newData.push(row);
      if (selectedRowsIndexes.includes(index)) {
        const newRow = {};
        Object.keys(row).forEach(key => {
          newRow[key] = '';
        });
        newData.push(newRow);  
      }
    });
  
    setTableData(newData);
  };
  
  const handleRemove = () => {
    const selectedRowsIndexes = getSelectedRows();
    if (selectedRowsIndexes.length === 0) {
      alert("Please select a row.");
      return;
    }
    // Create a new table data by filtering out the selected rows
    const newData = tableData.filter((row, index) => !selectedRowsIndexes.includes(index));
    
    // Create a new selected rows state based on the new data
    const newSelectedRows = {};
    newData.forEach((row) => {
      if (selectedRows[row._id]) {
        newSelectedRows[row._id] = { selected: selectedRows[row._id].selected };
      }
    });

    setTableData(newData);
    setSelectedRows(newSelectedRows);
  };
  

// Output: [{name: "", city: "", country: ""}]

  const handleRemoveAll = () => {
    setTableData([{name: "", city: "", country: "",date:""}]);
    
    //here i have to dynamiccaly add the columns name,so that 
    //even after the removing all the data ,the column should be there
    setSelectedRows({});

  };
  const handleSave = async () => {
    console.log("Saved:", tableData);
  
    // Create a new array of objects excluding the `_id` field
    const dataToSave = tableData.map(({ _id, ...rest }) => rest);
  
    // setData(dataToSave)

    let {data}=await axios.post(postApi1, dataToSave);

    console.log(data)



// if(dataToSave.length>0)
//   {

//     alert(data.message);
//   }
  };
 

  const handleCancel = () => {
    console.log("Canceled:", tableData);
  };

  

  const handleSelectRow = (row) => {
    setSelectedRows(prevState => ({
      ...prevState,
      [row._id]: { selected: !prevState[row._id]?.selected }
    }));
  };

  const getSelectedRows = () => {
    const selectedRowsIndexes = [];
    tableData.forEach((row, index) => {
      if (selectedRows[row._id]?.selected) {
        selectedRowsIndexes.push(index);
      }
    });
    return selectedRowsIndexes;
  };

  return (
    <div className="table-container">
      <div className="table-controls">
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleInsertBefore}>Insert Before</button>
        <button onClick={handleInsertAfter}>Insert After</button>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={handleRemoveAll}>Remove All</button>
      </div>
       
       <ReusableTable  
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        tableData={tableData}
        setTableData={setTableData}
        handleSelectRow={handleSelectRow}
        getSelectedRows={getSelectedRows}
        postApi1={postApi1} getApi1={getApi1}
        />

     

      <div className="save-button">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      {/* <ReusableTable  
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        allSelected={allSelected}
        setAllSelected={setAllSelected}
        tableData={tableData}
        setTableData={setTableData}
        
        handleSelectRow={handleSelectRow}
        getSelectedRows={getSelectedRows}
        getApi={getApi}
        /> */}
    </div>
  );
};

export default DynamicTable;

// const keys = Object.keys(tableData[0] || {}).filter(key => key !== '_id');
// const emptyObject = keys.reduce((obj, key) => {
//     obj[key] = "";
//     return obj;
// }, {});
// const renderData = [emptyObject];

// console.log(keys);
