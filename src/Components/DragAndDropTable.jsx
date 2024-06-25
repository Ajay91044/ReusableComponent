import React, { useEffect, useState } from 'react';
import ReusableTableDataGrid from './ReusableTableDataGrid';
import axios from 'axios';
import NewTable from './NewTable';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

function DragAndDropTable({ postApi, getApi, postApi2, getApi2 }) {
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [newTableData, setNewTableData] = useState([]);

    // Fetch data from both APIs when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([axios.get(getApi), axios.get(getApi2)]);
              
                let table1Data=response1.data.data;
                let table2Data=response2.data.data;
    
                let objectsToAdd = table1Data.filter(obj1 =>
                    !table2Data.some(obj2 => obj2._id === obj1._id)
                  );
                  
                  // Step 2: Update table1 with objectsToAdd
                  objectsToAdd.forEach(obj => table1Data.push(obj));

                  setTableData(objectsToAdd);
                  setNewTableData(response2.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getApi, getApi2]);

    const originalToNew = () => {
        const updatedData = tableData.filter((ele) => !selectedRow.some((selected) => selected._id === ele._id));
        setTableData(updatedData);
        setNewTableData((prevData) => {
            const filteredSelectedRows = selectedRow.filter((selected) => !prevData.some((existing) => existing._id === selected._id));
            return [...prevData, ...filteredSelectedRows];
        });
        setSelectedRow([]);
    };

    const newToriginal = () => {
        const updatedNewTableData = newTableData.filter((ele) => !selectedRow.some((selected) => selected._id === ele._id));
        setNewTableData(updatedNewTableData);
        const updatedTableData = [...tableData, ...selectedRow.filter((selected) => !tableData.some((existing) => existing._id === selected._id))];
        setTableData(updatedTableData);
        setSelectedRow([]);
    };

    const handleOnSave = async () => {
        try {
            await Promise.all([
                axios.post(postApi2, newTableData)
            ]);
            // Optionally, fetch new data after successful update
            const [response1, response2] = await Promise.all([axios.get(getApi), axios.get(getApi2)]);

           

            setTableData(tableData);
            
            setNewTableData(response2.data.data);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleOnCancel = async () => {
        try {
            const [response1, response2] = await Promise.all([axios.get(getApi), axios.get(getApi2)]);
            setTableData(response1.data.data);
            setNewTableData(response2.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <ReusableTableDataGrid  tableData={tableData} setSelectedRow={setSelectedRow} newTableData={newTableData} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <button style={{ borderRadius: '3px', color: 'black', border: 'none', margin: "3px", fontSize: '10px' }} onClick={originalToNew}><KeyboardArrowRightIcon /></button>
                    <button style={{ borderRadius: '3px', color: 'black', border: 'none', margin: '3px' }} onClick={newToriginal}><KeyboardArrowLeftSharpIcon /></button>
                </div>
                <NewTable setSelectedRow={setSelectedRow} setNewTableData={setNewTableData} newTableData={newTableData} tableData={tableData} selectedRow={selectedRow} />
            </div>
            <div className="save-button">
                <button onClick={handleOnSave}>Save</button>
                <button onClick={handleOnCancel}>Cancel</button>
            </div>
        </>
    );
}

export default DragAndDropTable;
