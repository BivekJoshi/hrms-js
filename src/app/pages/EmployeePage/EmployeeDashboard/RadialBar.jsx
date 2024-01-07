import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const RadialBar = ({ averageWork, data }) => {
  const { mode } = useContext(ThemeModeContext);
  const [work, setWork] = useState(averageWork);

  useEffect(() => {
    // If you want to update the state based on some condition, you can do it here
    // For example, update the state when averageWork changes
    setWork(averageWork);
  }, [averageWork]);

  const options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [averageWork === 0 ? 0 : averageWork],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Average"],
  };
  return (
    <Box
      boxShadow={7}
      borderRadius="10px"
      bgcolor={mode === "light" ? "" : "#3f413f"}
      padding="2rem"
    >
      <ReactApexChart
        options={options}
        series={options.series}
        type="radialBar"
        height={280}
      />

      {/* Additional Information */}
      <Stack flexDirection="row" justifyContent="space-evenly">
        <Typography>1 Hour</Typography>
        <Typography>{data !== "NaN" ? data : "0"} Hour</Typography>
        <Typography>9 hour</Typography>
      </Stack>
    </Box>
  );
};

export default RadialBar;
