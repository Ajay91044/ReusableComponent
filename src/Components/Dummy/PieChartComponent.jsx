import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'; // Import Cell component
import DataConverter from '../DataConvertor';

const PieChartComponent = ({ data }) => {
  if (!data) return <div>Loading...</div>;
  if (data.length === 0) return <div>No data available</div>;

  return (
    <>
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    <DataConverter data={data}/>

    </>
  );
};

export default PieChartComponent;
