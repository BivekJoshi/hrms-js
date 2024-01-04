import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const BarChatDiagram = ({ data }) => {
  const { mode, palette } = useContext(ThemeModeContext);
  const names = [
    "All Employees",
    "New Employees",
    "Male Employees",
    "Female Employees",
  ];
  const Data = [
    `${data?.employeeInfo?.allEmployee}`,
    `${data?.employeeInfo?.newEmployee}`,
    `${data?.employeeInfo?.maleEmployee}`,
    `${data?.employeeInfo?.femaleEmployee}`,
  ];
  const barColors = ["#F65E3C", "#A1E000", "#9137B8", "#D93084"];

  const chartOptions = {
    chart: {
      type: "bar",
      height: 390,
    },
    plotOptions: {
      bar: {
        horizontal: false, // Swap to false to make it vertical
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: barColors,
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
          ],
        },
      },
    },
    yaxis: {
      categories: names,
      labels: {
        // formatter: function (value) {
        //   return value + "%";
        // },
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
        name: "Total ", // Array of names
        data: Data,
        colors: barColors,
      },
    ],
    options: chartOptions,
  };
  return (
    <Box
      borderRadius={"6px"}
      color={"white"}
      bgcolor={mode === "light" ? "white" : "#3f413f"}
      id="chart"
      marginBottom="2rem"
      boxShadow="0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)"
    >
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </Box>
  );
};

export default BarChatDiagram;
