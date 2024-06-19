import React, { useState } from 'react';
import DynamicTable from './Components/DynamicTable';
import ReusableTable from './Components/ReusableTable';
import DataGridTable from './Components/DataGridTable';
// import other components as needed

function App() {


  const postApi1 = "http://localhost:4000/api/tabledatas/addTableData";
  const getApi1 = "http://localhost:4000/api/tabledatas/getTableData";

  const postApi2 = "http://localhost:4000/api/tabledatas/addDummyData";
  const getApi12 = "http://localhost:4000/api/tabledatas/getDummyData";



  return (
    <div className="App">

      <DynamicTable  postApi={postApi1} getApi={getApi1}/>

      {/* <ReusableTable postApi={postApi1} getApi={getApi1}/> */}

      {/* <DynamicTable  postApi={postApi2} getApi={getApi12}/> */}
      {/* <DataGridTable/> */}

      {/* <ReusableTable data={tableData} setData={setTableData} getApi={getApi}/> */}
    </div>
  );
}

export default App;




      {/* <Counter/>
     <Counter1/> */}
      {/* <DarkModeToggle/> */}

      {/* <LifecycleExample /> */}
