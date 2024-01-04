import React from "react";
import ReactApexChart from "react-apexcharts";

export const EmployPichart = ({
  employeeCountPerDepartment,
  employeeCountPerEmpType,
}) => {
  const task = [
    {
      numberOfTask: employeeCountPerDepartment
        ? employeeCountPerDepartment.Account
        : employeeCountPerEmpType["part-time"],
      nameOfTask: employeeCountPerDepartment ? "Account" : "Part Time",
    },
    {
      numberOfTask: employeeCountPerDepartment
        ? employeeCountPerDepartment.Management
        : employeeCountPerEmpType?.deded,
      nameOfTask: employeeCountPerDepartment ? "Management" : "Deded ",
    },
    {
      numberOfTask: employeeCountPerDepartment
        ? employeeCountPerDepartment.Technical
        : employeeCountPerEmpType.testsxsxdsgdsg,
      nameOfTask: employeeCountPerDepartment ? "Technical" : "testsxsxdsgdsg",
    },
  ];

  const COLORS = ["#399F4D", "#F9C143", "#C2514B", "#875923"];

//   const series = employeeCountPerDepartment
//   ? Object.entries(employeeCountPerDepartment).map(([key, value]) => key)
//   : [];
// const labels = employeeCountPerDepartment
// ? Object.entries(employeeCountPerDepartment).map(([key, value]) => value)
// : [];

  const series = task.map((entry) => entry.numberOfTask)
  const labels = task.map((entry) => entry.nameOfTask);

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
      type="donut"
      height={250}
    />
  );
};
