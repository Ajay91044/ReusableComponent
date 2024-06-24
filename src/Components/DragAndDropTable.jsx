import React, { useEffect, useState } from 'react';
import ReusableTableDataGrid from './ReusableTableDataGrid';
import axios from 'axios';
import NewTable from './NewTable';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

function DragAndDropTable({ postApi, getApi }) {
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [newTableData, setNewTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(getApi);
                setTableData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getApi]);

    const originalToNew = () => {
        const updatedData = tableData.filter((ele) => !selectedRow.some((selected) => selected._id === ele._id));
        setTableData(updatedData);
        setNewTableData((prevData) => {
            const filteredSelectedRows = selectedRow.filter((selected) => !prevData.some((existing) => existing._id === selected._id));
            return [...prevData, ...filteredSelectedRows];
        });
        setSelectedRow([]);
        const postUpdatedData = async () => {
            try {
                await axios.post(postApi, updatedData);
                // Optionally, fetch new data after successful update
                const { data } = await axios.get(getApi);
                setTableData(data.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        };
    
        postUpdatedData();
    
    };
 
    const newToriginal = () => {
        const updatedNewTableData = newTableData.filter((ele) => !selectedRow.some((selected) => selected._id === ele._id));
        setNewTableData(updatedNewTableData);
        const updatedTableData = [...tableData, ...selectedRow.filter((selected) => !tableData.some((existing) => existing._id === selected._id))];
        setTableData(updatedTableData);
        setSelectedRow([]);
        const postUpdatedData = async () => {
            try {
                await axios.post(postApi, updatedTableData);
                // Optionally, fetch new data after successful update
                const { data } = await axios.get(getApi);
                setTableData(data.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        };
    
        postUpdatedData();
    };

    return (
        <>
        <div style={{ display: 'flex' }}>
            <ReusableTableDataGrid tableData={tableData} setSelectedRow={setSelectedRow} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <button style={{ borderRadius: '3px', color: 'black', border: 'none', margin: "3px", fontSize: '10px' }} onClick={originalToNew}><KeyboardArrowRightIcon /></button>
                <button style={{ borderRadius: '3px', color: 'black', border: 'none', margin: '3px' }} onClick={newToriginal}><KeyboardArrowLeftSharpIcon /></button>
            </div>
            <NewTable setSelectedRow={setSelectedRow} setNewTableData={setNewTableData} newTableData={newTableData} selectedRow={selectedRow} />
        </div>
        </>
    );
}

export default DragAndDropTable;
