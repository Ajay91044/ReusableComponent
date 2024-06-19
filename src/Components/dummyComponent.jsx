
import React, { useEffect, useState } from 'react';

function ReusableTable({getApi,setTableData,selectedRows,setSelectedRows,handleSelectRow,tableData
}) 
{

    
    const [searchQuery, setSearchQuery] = useState('');
    const [filterColumn, setFilterColumn] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
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

    useEffect(() => {
        const filterData = () => {
            if (searchQuery === '' || filterColumn === '') {
                setFilteredData(tableData);
                return;
            }

            const filtered = tableData.filter(row => {
                const cellValue = row[filterColumn];
                return cellValue && cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilteredData(filtered);
        };
        filterData();
    }, [searchQuery, filterColumn, tableData]);

    const handleCheckboxChange = () => {
        setAllSelected(!allSelected);
        const newSelectedRows = {};
        tableData.forEach(row => {
            newSelectedRows[row._id] = { selected: !allSelected };
        });
        setSelectedRows(newSelectedRows);
    };

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

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select onChange={(e) => setFilterColumn(e.target.value)}>
                    <option value="">Select Column</option>
                    {Object.keys(tableData[0] || {}).filter(key => key !== '_id').map((key, index) => (
                        <option key={index} value={key}>{key}</option>
                    ))}
                </select>
            </div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" checked={allSelected} onChange={handleCheckboxChange} />
                        </th>
                        {Object.keys(tableData[0] || {}).filter(key => key !== '_id').map((key, index) => (
                            <th key={index} onClick={() => handleSort(key)}>
                                {key} {sortBy === key ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 && filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!selectedRows[row._id]?.selected}
                                    onChange={() => handleSelectRow(row)}
                                />
                            </td>
                            {Object.keys(row || {}).filter(key => key !== '_id').map((key, index) => (
                                <td key={index}>
                                    <input
                                        type="text"
                                        value={row[key]}
                                        onChange={(e) => {
                                            const newData = [...tableData];
                                            newData[rowIndex][key] = e.target.value;
                                            setTableData(newData);
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReusableTable;






















// import React, { useEffect, useState } from 'react';
// import './DynamicTable.css';
// import axios from 'axios';

// const DynamicTable = ({ data, setData,postApi,getApi}) => {
//   const [sortBy, setSortBy] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [tableData, setTableData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [allSelected, setAllSelected] = useState(false);


//   // console.log("data",data);
//   useEffect(() => {
//     setTableData(data);
//   }, [data]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch table data
//         const tableResponse = await fetch(getApi);
//         // console.log("response",tableResponse)
//         const tableJsonData = await tableResponse.json();
//         setTableData(tableJsonData.data);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);



//   const handleInsert = () => {
//     const newRow = {};
//     Object.keys(tableData[0]).forEach(key => {
//       newRow[key] = '';
//     });
//     setTableData([...tableData, newRow]);
//   };
  
//   const handleInsertBefore = () => {
//     const selectedRowsIndexes = getSelectedRows();
//     if (selectedRowsIndexes.length === 0) {
//       alert("Please select a row.");
//       return;
//     }
  
//     const newData = [];
//     tableData.forEach((row, index) => {
//       if (selectedRowsIndexes.includes(index)) {
//         const newRow = {};
//         Object.keys(row).forEach(key => {
//           newRow[key] = '';
//         });
//         newData.push(newRow);
//       }
//       newData.push(row);
//     });
  
//     setTableData(newData);
//   };
  
//   const handleInsertAfter = () => {
//     const selectedRowsIndexes = getSelectedRows();
//     if (selectedRowsIndexes.length === 0) {
//       alert("Please select a row.");
//       return;
//     }
  
//     const newData = [];
//     tableData.forEach((row, index) => {
//       newData.push(row);
//       if (selectedRowsIndexes.includes(index)) {
//         const newRow = {};
//         Object.keys(row).forEach(key => {
//           newRow[key] = '';
//         });
//         newData.push(newRow);  
//       }
//     });
  
//     setTableData(newData);
//   };
  
//   const handleRemove = () => {
//     const selectedRowsIndexes = getSelectedRows();
//     if (selectedRowsIndexes.length === 0) {
//       alert("Please select a row.");
//       return;
//     }
//     // Create a new table data by filtering out the selected rows
//     const newData = tableData.filter((row, index) => !selectedRowsIndexes.includes(index));
    
//     // Create a new selected rows state based on the new data
//     const newSelectedRows = {};
//     newData.forEach((row) => {
//       if (selectedRows[row._id]) {
//         newSelectedRows[row._id] = { selected: selectedRows[row._id].selected };
//       }
//     });

//     setTableData(newData);
//     setSelectedRows(newSelectedRows);
//   };

//   const handleRemoveAll = () => {
//     setTableData([]);
//     setSelectedRows({});
//   };
//   const handleSave = async () => {
//     console.log("Saved:", tableData);
  
//     // Create a new array of objects excluding the `_id` field
//     const dataToSave = tableData.map(({ _id, ...rest }) => rest);
  
//     // setData(dataToSave)

//     let {data}=await axios.post(postApi, dataToSave);

//     console.log(data)



// // if(dataToSave.length>0)
// //   {

// //     alert(data.message);
// //   }
//   };
 

//   const handleCancel = () => {
//     console.log("Canceled:", tableData);
//   };

//   const handleCheckboxChange = () => {
//     setAllSelected(!allSelected); 
//     const newSelectedRows = {};
//     tableData.forEach(row => {
//       newSelectedRows[row._id] = { selected: !allSelected };
//     });
//     setSelectedRows(newSelectedRows);
//   };

//   const handleSelectRow = (row) => {
//     setSelectedRows(prevState => ({
//       ...prevState,
//       [row._id]: { selected: !prevState[row._id]?.selected }
//     }));
//   };

//   const getSelectedRows = () => {
//     const selectedRowsIndexes = [];
//     tableData.forEach((row, index) => {
//       if (selectedRows[row._id]?.selected) {
//         selectedRowsIndexes.push(index);
//       }
//     });
//     return selectedRowsIndexes;
//   };

//   return (
//     <div className="table-container">
//       <div className="table-controls">
//         <button onClick={handleInsert}>Insert</button>
//         <button onClick={handleInsertBefore}>Insert Before</button>
//         <button onClick={handleInsertAfter}>Insert After</button>
//         <button onClick={handleRemove}>Remove</button>
//         <button onClick={handleRemoveAll}>Remove All</button>
//       </div>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>
//               <input type="checkbox" checked={allSelected} onChange={handleCheckboxChange} />
//             </th>
//             {Object.keys(tableData[0] || {}).filter(key => key !== '_id').map((key, index) => (
//   <th key={index}>{key}</th>
// ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.length>0 && tableData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={!!selectedRows[row._id]?.selected}
//                   onChange={() => handleSelectRow(row)}
//                 />
//               </td>
//               {Object.keys(row || {}).filter(key => key !== '_id').map((key, index) => (
//   <td key={index}>
//     <input
//       type="text"
//       value={row[key]}
//       onChange={(e) => {
//         const newData = [...tableData];
//         newData[rowIndex][key] = e.target.value;
//         setTableData(newData);
//       }}
//     />
//   </td>
// ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="save-button">
//         <button onClick={handleSave}>Save</button>
//         <button onClick={handleCancel}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default DynamicTable;






































// import React, { useEffect, useState } from 'react';

// const DynamicTable = ({ data }) => {
//   const [sortBy, setSortBy] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [tableData, setDataForTable] = useState([]);


  
//   useEffect(() => {
//     setDataForTable(data);
//   }, [data]);

  
//   const handleSort = (columnName) => {
//     if (sortBy === columnName) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(columnName);
//       setSortDirection('asc');
//     }
//   };

//   if (!tableData || tableData.length === 0) return <div>No data available</div>;

//   const columns = Object.keys(tableData[0]);

//   const sortedData = sortBy
//     ? [...tableData].sort((a, b) => {
//         const valueA = a[sortBy];
//         const valueB = b[sortBy];
//         if (valueA < valueB) {
//           return sortDirection === 'asc' ? -1 : 1;
//         }
//         if (valueA > valueB) {
//           return sortDirection === 'asc' ? 1 : -1;
//         }
//         return 0;
//       })
//     : tableData;

//   return (
//     <div style={containerStyle}>
//       <table style={tableStyle} rules="all" border="1px">
//         <thead>
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index} style={thStyle} onClick={() => handleSort(col)}>
//                 {col}
//                 {sortBy === col && (
//                   <span>{sortDirection === 'asc' ? ' 🔼' : ' 🔽'}</span>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((row, rowIndex) => (
//             <tr key={rowIndex} style={trStyle}>
//               {columns.map((col, colIndex) => (
//                 <td key={colIndex} style={tdStyle}>{row[col]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DynamicTable;

// const containerStyle = {
//   padding: '20px',
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginBottom: '20px',
// };

// const thStyle = {
//   padding: '12px',
//   textAlign: 'left',
//   backgroundColor: '#f2f2f2',
//   borderBottom: '2px solid #ddd',
//   cursor: 'pointer',
//   fontWeight: 'bold',
//   whiteSpace: 'nowrap',
// };

// const tdStyle = {
//   padding: '12px',
//   textAlign: 'left',
//   borderBottom: '1px solid #ddd',
//   whiteSpace: 'nowrap',
  
// };

// const trStyle = {
//   ':hover': {
//     backgroundColor: '#f5f5f5',
//   },
// };
