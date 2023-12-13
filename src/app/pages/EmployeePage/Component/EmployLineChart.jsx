import React, { useContext } from "react";
import Chart from "react-apexcharts";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const EmployLineChart = ({ attendanceData }) => {
  const { mode } = useContext(ThemeModeContext);

  const chartOptions = {
    chart: {
      id: "employee-attendance-chart",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: attendanceData?.map((item) => item.monthBS),
      labels: {
        style: {
          colors: Array(12).fill(mode === "light" ? "black" : "white"),
        },
      },
    },
    yaxis: {},
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 3,
      strokeWidth: 0,
    },
  };

  const series = [
    {
      name: "Present Days",
      data: attendanceData?.map((item) => item.attendanceCountRes.presentDays),
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={series}
      type="area"
      height="90%"
      width="100%"
    />
  );
};
