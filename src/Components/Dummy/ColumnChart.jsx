import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DataConverter from '../DataConvertor';

const ColumnChart = ({ data }) => {
  if (!data) return <div>Loading...</div>;
  if (data.length === 0) return <div>No data available</div>;
   
  return (
    <>
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
   <DataConverter data={data}/>
    </>
  );
};

export default ColumnChart;
