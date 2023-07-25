import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale } from "chart.js";
import { BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { Box, Card } from "@mui/material";
import "./Style/Style.css";

// ChartJS.register(ArcElement, Tooltip, Legend);

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
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Bar Chart",
      },
    },
  };

  const labels = [
    "All Employees",
    "New Employees",
    "Male Employees",
    "Female Employees",
    "All Projects",
  ];

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          `${data?.allEmployees}`,
          `${data?.newEmployees}`,
          `${data?.maleEmployees}`,
          `${data?.femaleEmployees}`,
          `${data?.allProjects}`,
        ],
        backgroundColor: [
          "#F65E3C",
          "#A1E000",
          "#9137B8",
          "#D93084",
          "#B6D0D9",
        ],
      },
    ],
  };
 
  return (
    <Box alignSelf="self-start" marginTop="-1rem">
      <Card>
        <Bar options={barChartOptions} data={barChartData} />
      </Card>
    </Box>
  );
};
