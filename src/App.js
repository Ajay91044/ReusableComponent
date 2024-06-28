import React, { useEffect, useState } from 'react';
import DynamicTable from './Components/DynamicTable';
import ReusableTable from './Components/ReusableTable';
import DynamicForm from './Components/DynamicForm';
import axios from 'axios';
import DragAndDropTable from './Components/DragAndDropTable';
// import DragDropGrid from './Components/Dragndropfeature/DragnDropGrid';
import DragDropTable from './Components/Dragndropfeature/DragnDropGrid';
import DynamicHeader from './Components/Dummy/DynamicHeader';
import Footer from './Components/Dummy/Footer';
import ColumnChart from './Components/Dummy/ColumnChart';
// import other components as needed
import DynamicGraph from './Components/Dummy/DynamicGraph';
import PieChartComponent from './Components/Dummy/PieChartComponent';
import ChartComponent from './Components/Dummy/NewLineGraph';
import DataConverter from './Components/DataConvertor';
import PrintAsPdf from './Components/PrintAsPdf';

function App() {

let [formData,setFormdata]=useState([]);

let [columnChartData,setColumnChartData]=useState([])
let [pieData,setPieData]=useState([])
let [graphData,setGraphData]=useState([])

  const postApi1 = "http://localhost:4000/api/tabledatas/addTableData";
  const getApi1 = "http://localhost:4000/api/tabledatas/getTableData";

  const postApi2 = "http://localhost:4000/api/tabledatas/addDummyData";
  const getApi2 = "http://localhost:4000/api/tabledatas/getDummyData";

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

  useEffect(()=>
  {
    let FetchColumnChartData=async()=>
      {
        let {data}=await axios.get(getApi3)

        setColumnChartData(data.colummnChart)
        setGraphData(data.graphData)
        setPieData(data.pieData)
      }
      FetchColumnChartData();
  },[])


  return (
    <div className="App">

      <DynamicTable   postApi1={postApi1} getApi1={getApi1}/>

      {/* <ReusableTable postApi={postApi1} getApi={getApi1}/> */}

      {/* <DynamicTable  postApi={postApi2} getApi={getApi2}/> */}

      {/* <ReusableTable data={tableData} setData={setTableData} getApi={getApi}/> */}
     
     <DynamicForm  formData={formData} setFormData={setFormdata} postApi3={postApi3} postApi4={postApi1} getApi1={getApi1} getApi4={getApi4}/>
    
     <DragAndDropTable postApi={postApi1} getApi={getApi1} postApi2={postApi2} getApi2={getApi2}/>
     {/* <DragDropTable/> */}

     {/* <DynamicHeader getApi3={getApi3}/> */}

     {/* <Footer/> */}
{/* 
     <ColumnChart data={columnChartData}/>
     <DynamicGraph data={graphData}/>
     <PieChartComponent data={pieData}/>
     <PieChartComponent data={graphData}/> */}
     {/* <ChartComponent/> */}
     {/* <DataConverter/> */}
     <PrintAsPdf/>

    </div>
  );
}

export default App;




      {/* <Counter/>
     <Counter1/> */}
      {/* <DarkModeToggle/> */}

      {/* <LifecycleExample /> */}
