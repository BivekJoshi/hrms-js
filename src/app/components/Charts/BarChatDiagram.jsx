import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js';
import { BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import { Box, Card } from '@mui/material';
import './Style/Style.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const BarChatDiagram = ({ data }) => {
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Employee Statistics',
      },
    },
  };

  const labels = [
    'All Employees',
    'New Employees',
    'Male Employees',
    'Female Employees',
    'Total Projects',
  ];

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Employee Count',
        data: [
          `${data?.allEmployees}`,
          `${data?.newEmployees}`,
          `${data?.maleEmployees}`,
          `${data?.femaleEmployees}`,
          `${data?.allProjects}`,
        ],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#9E9E9E',
          '#FFC107',
          '#FF5722',
        ],
        color: 'white',
      },
    ],
  };

  return (
    <div style={{ width: '50%' }}>
      <Card>
        <Bar
          options={barChartOptions}
          data={barChartData}
          style={{ color: 'white', display: 'inline-block' }}
        />
      </Card>
    </div>
  );
};
