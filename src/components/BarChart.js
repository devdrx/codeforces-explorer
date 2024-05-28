// BarChartComponent.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data }) => {
  // Transform the data from Map to an array of objects
  let chartData = Array.from(data.entries()).map(([key, value]) => ({
    key: key,
    value: value
  }));
  //sort chartdata according to ke

  return (
    <BarChart
      width={1000}
      height={600}
      data={chartData.sort((a, b) => a.key - b.key)}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
