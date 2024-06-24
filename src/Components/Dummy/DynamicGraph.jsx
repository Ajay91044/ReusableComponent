import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const DynamicGraph = ({ graphData }) => {
  if (!graphData) return <div>Loading...</div>;
  if (graphData.length === 0) return <div>No data available</div>;

  return (
    <LineChart width={600} height={300} data={graphData}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default DynamicGraph;