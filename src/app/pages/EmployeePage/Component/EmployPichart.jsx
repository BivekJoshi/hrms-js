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
        : employeeCountPerEmpType[".part-time"],
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
        : employeeCountPerEmpType,
      nameOfTask: employeeCountPerDepartment ? "Technical" : "testsxsxdsgdsg",
    },
  ];

  const COLORS = ["#F65E3C", "#A1E000", "#9137B8", "#D93084"];

  // const series = employeeCountPerDepartment?.map(([key, value]) => {
  //   key;
  // });
  // const labels = employeeCountPerDepartment?.map(([key, value]) => {
  //   value;
  // });

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
    <ReactApexChart options={options} series={series} type="pie" height={250} />
  );
};
