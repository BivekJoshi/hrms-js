import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const EmployPichart = ({ data }) => {
  const COLORS = [
    "#399F4D",
    "#F9C143",
    "#C2514B",
    "#875923",
    "#146DA7",
    "#E05F2E",
    "#5E2750",
    "#3A9AD9",
    "#F7941E",
    "#F07F13",
    "#0078A8",
    "#8B48B8",
  ];
  const { mode } = useContext(ThemeModeContext);

  const series = data
    ? Object.entries(data).map(([key, value]) => (value ? value : "nana"))
    : [];
  const labels = data
    ? Object.entries(data).map(([key, value]) =>
        key ? key.toUpperCase() : "0"
      )
    : [];

  const options = {
    plotOptions: {
      pie: {
        // customScale: 1,
        // startAngle: 0,

        donut: {
          size: "60%",
          labels: {
            show: true,
          },
        },
      },
    },
    chart: {
      width: 380,
      type: "donut",
    },
    labels: labels,
    colors: COLORS,
    legend: {
      
      labels: {
        colors: labels.map(() => (mode === "dark" ? "white" : "black")),
      },
    },
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
    <div className="apex-chart-container">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={250}
      />
      <style>
        {`
        .apex-chart-container .apexcharts-legend {
          width: 16rem;
          overflow-wrap: break-word;
          word-break: break-all;
        }
        `}
      </style>
    </div>
  );
};
