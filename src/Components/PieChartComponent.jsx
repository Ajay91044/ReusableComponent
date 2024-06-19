import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'; // Import Cell component

const PieChartComponent = ({ pieData }) => {
  if (!pieData) return <div>Loading...</div>;
  if (pieData.length === 0) return <div>No data available</div>;

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
