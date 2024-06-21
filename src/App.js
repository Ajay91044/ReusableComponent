import React, { useEffect, useState } from 'react';
import DynamicTable from './Components/DynamicTable';
import ReusableTable from './Components/ReusableTable';
import DataGridTable from './Components/DataGridTable';
import DynamicForm from './Components/DynamicForm';
import axios from 'axios';
// import other components as needed

function App() {

let [formData,setFormdata]=useState([]);

  const postApi1 = "http://localhost:4000/api/tabledatas/addTableData";
  const getApi1 = "http://localhost:4000/api/tabledatas/getTableData";

  const postApi2 = "http://localhost:4000/api/tabledatas/addDummyData";
  const getApi12 = "http://localhost:4000/api/tabledatas/getDummyData";

  const postApi3 = "http://localhost:4000/api/tabledatas/addFormStructre";
  const getApi3 = "http://localhost:4000/api/tabledatas/getFormStructre";

  const postApi4= "http://localhost:4000/api/tabledatas/addFormData";
  const getApi4 = "http://localhost:4000/api/tabledatas/getFormData";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(getApi3);
        setFormdata(data.data[0].formStructure);
        console.log(data.data[0].formStructure);

       

        
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);//  console.log("original data",data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(getApi1);
        setFormdata(data.data);
        console.log(data);
   
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);//  console.log("original data",data)



  return (
    <div className="App">

      <DynamicTable   postApi1={postApi1} getApi1={getApi1}/>

      {/* <ReusableTable postApi={postApi1} getApi={getApi1}/> */}

      {/* <DynamicTable  postApi={postApi2} getApi={getApi12}/> */}
      {/* <DataGridTable/> */}

      {/* <ReusableTable data={tableData} setData={setTableData} getApi={getApi}/> */}
      <DynamicForm  formData={formData} setFormData={setFormdata} postApi3={postApi3} postApi4={postApi1} getApi1={getApi1} getApi4={getApi4}/>
    </div>
  );
}

export default App;




      {/* <Counter/>
     <Counter1/> */}
      {/* <DarkModeToggle/> */}

      {/* <LifecycleExample /> */}
