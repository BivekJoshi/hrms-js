import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { Box, Grid } from "@mui/material";
import "./Style/Style.css";
import ThemeModeContext from "../../../theme/ThemeModeContext";

export const PieChartDiagram = ({ dashboardData }) => {
  const { mode } = useContext(ThemeModeContext);

  const piedata = [
    {
      name: "All Employees",
      data: dashboardData?.allEmployees,
    },
    {
      name: "New Employees",
      data: dashboardData?.newEmployees,
    },
    {
      name: "Female Employees",
      data: dashboardData?.femaleEmployees,
    },
    {
      name: "Male Employees",
      data: dashboardData?.maleEmployees,
    },
    {
      name: "All Projects",
      data: dashboardData?.allProjects,
    },
  ];

  const COLORS = ["#F65E3C", "#A1E000", "#9137B8", "#D93084", "#B6D0D9"];

  const options = {
    chart: {
      width: 380,
      type: "donut",
      background: "transparent",
    },
    labels: piedata.map((entry) => entry.name),
    colors: COLORS,
    legend: {
      position: "right",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    theme: {
      mode: mode === "light" ? "light" : "dark",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "10%", // Set the size to 0% for a full pie chart
        },
      },
    },
  };

  const series = piedata.map((entry) => entry.data);

  return (
    <Grid
      borderRadius={"6px"}
      style={{ width: "100%", position: "relative", paddingTop: "10px" }}
      bgcolor={mode === "light" ? "white" : "#3f413f"}
      boxShadow="0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)"
    >
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={250}
      />
    </Grid>
  );
};
