import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const BarChatDiagram = ({ dashboardData }) => {
  const { mode } = useContext(ThemeModeContext);
  console.log(dashboardData);

  const names = [
    "All Employees",
    "New Employees",
    "Male Employees",
    "Female Employees",
    "All Projects",
  ];
  const Data = [
    `${dashboardData?.allEmployees}`,
    `${dashboardData?.newEmployees}`,
    `${dashboardData?.maleEmployees}`,
    `${dashboardData?.femaleEmployees}`,
    `${dashboardData?.allProjects}`,
  ];
  
  const chartOptions = {
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: false, // Swap to false to make it vertical
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: names,
      labels: {
        style: {
          colors: [
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
            mode === "dark" ? "white" : "black",
          ],
        },
      },
    },
    yaxis: {
      categories: names, // Swap with xaxis
      labels: {
        style: {
          colors: [mode === "dark" ? "white" : "black"],
        },
      },
    },
    legend: {
      labels: {
        colors: [
          mode === "dark" ? "white" : "black",
          mode === "dark" ? "white" : "black",
        ],
      },
    },
  };
  const chartData = {
    series: [
      {
        name: names, // Array of names
        data: Data.map(value => parseFloat(value)),
      },
    ],
    options: chartOptions,
  };
  return (
    <Box
      padding={2}
      borderRadius={"6px"}
      color={"white"}
      // bgcolor={theme.palette.background.alt}
      id="chart"
    >
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={250}
      />
      hi
    </Box>
  );
};

export default BarChatDiagram;
