import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import DataConverter from '../DataConvertor';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const data = [
  {
    "_id": 1,
    "site": "RITS",
    "resourceId": "Resource-001",
    "createdDateTime": { "$date": "2024-02-01T09:47:54.082Z" },
    "quality": 85,
    "availability": 90,
    "performance": 95,
    "oee": 84.645
  },
  {
    "_id": 1094404973,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T11:36:17.992Z" },
    "quality": 80,
    "availability": 93,
    "performance": 0,
    "oee": 0
  },
  {
    "_id": 1094404974,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T11:46:17.992Z" },
    "quality": 88,
    "availability": 94,
    "performance": 97,
    "oee": 85.656
  },
  {
    "_id": 1094404975,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T11:56:17.992Z" },
    "quality": 90,
    "availability": 95,
    "performance": 98,
    "oee": 86.747
  },
  {
    "_id": 1094404976,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T12:06:17.992Z" },
    "quality": 92,
    "availability": 96,
    "performance": 99,
    "oee": 87.838
  },
  {
    "_id": 1094404977,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T12:16:17.992Z" },
    "quality": 93,
    "availability": 97,
    "performance": 100,
    "oee": 88.929
  },
  {
    "_id": 1094404978,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T12:26:17.992Z" },
    "quality": 95,
    "availability": 98,
    "performance": 101,
    "oee": 90.02
  },
  {
    "_id": 1094404979,
    "site": "RITS",
    "resourceId": "ResourceBO:RITS,DEFAULT",
    "createdDateTime": { "$date": "2024-03-11T12:36:17.992Z" },
    "quality": 96,
    "availability": 99,
    "performance": 102,
    "oee": 91.111
  }
];

const parseData = () => {
  const dates = [];
  const availability = [];
  const performance = [];
  const quality = [];
  const oee = [];

  data.forEach(entry => {
    const date = new Date(entry.createdDateTime.$date);
    dates.push(date.toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
    availability.push(entry.availability || 0);
    performance.push(entry.performance || 0);
    quality.push(entry.quality || 0);
    oee.push(entry.oee || 0);
  });

  return { dates, availability, performance, quality, oee };
};

const NewLineGraph = () => {
  const { dates, availability, performance, quality, oee } = parseData();

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Availability',
        data: availability,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Performance',
        data: performance,
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Quality',
        data: quality,
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'OEE',
        data: oee,
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'KPI Trends Over Time'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Percentage'
        },
        beginAtZero: true
      }
    }
  };

  return (
   <>
    <div>
      <h2>KPI Trends Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
    <DataConverter data={data}/>
    </>
  );
};

export default NewLineGraph;
