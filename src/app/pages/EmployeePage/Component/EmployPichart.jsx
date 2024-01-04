import React from "react";
import ReactApexChart from "react-apexcharts";

export const EmployPichart = () => {
  const task = [
    {
      numberOfTask: 1,
      nameOfTask: "Task 1",
    },
    {
      numberOfTask: 1,
      nameOfTask: "Task 2",
    },
    {
      numberOfTask: 1,
      nameOfTask: "Task 3",
    },
  ];

  const COLORS = ["#F65E3C", "#A1E000", "#9137B8", "#D93084"];

  const series = task.map((entry) => entry.numberOfTask);
  const labels = task.map((entry) => entry.nameOfTask);

  const options = {
    chart: {
      width: 380,
      type: "pie",
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
            position: "top",
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      height={250}
    />
  );
};
