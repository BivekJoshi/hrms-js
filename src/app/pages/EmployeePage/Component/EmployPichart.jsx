import React from "react";
import ReactApexChart from "react-apexcharts";

export const EmployPichart = ({ data }) => {
  const COLORS = ["#399F4D", "#F9C143", "#C2514B", "#875923"];

  const series = data
    ? Object.entries(data).map(([key, value]) => (value ? value : "nana"))
    : [];
  const labels = data
    ? Object.entries(data).map(([key, value]) => (key ? key : "0"))
    : [];

    console.log(series);
  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: labels,
    colors: COLORS,
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
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={250}
    />
  );
};
